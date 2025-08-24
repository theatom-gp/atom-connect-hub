import { 
  collection, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  arrayUnion,
  limit 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage, functions } from './firebase';

// ===== TYPES =====

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
}

export interface User {
  id?: string;
  email: string;
  personalInfo: PersonalInfo;
  registrations: string[]; // Array of registration IDs
  abstracts: string[]; // Array of abstract IDs
  createdAt?: any;
  updatedAt?: any;
}

export interface RegistrationData {
  userId: string; // Reference to user document
  conferenceId: string;
  registrationType: string;
  personalInfo: PersonalInfo;
  paymentInfo?: any;
  documents?: string[];
  status: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface AbstractData {
  userId: string; // Reference to user document
  conferenceId: string;
  authorInfo: PersonalInfo;
  abstractTitle: string;
  abstractText: string;
  keywords: string[];
  documentFile?: string;
  status: string;
  submittedAt?: any;
  updatedAt?: any;
}

export interface DocumentData {
  userId: string;
  documentType: string;
  fileName: string;
  filePath: string;
  uploadedAt?: any;
}

// ===== USER SERVICES =====

export const createUser = async (personalInfo: PersonalInfo) => {
  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(personalInfo.email);
    if (existingUser.success) {
      return existingUser; // User already exists, return existing user
    }

    const userData: User = {
      email: personalInfo.email,
      personalInfo,
      registrations: [],
      abstracts: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'users'), userData);
    return { 
      success: true, 
      userId: docRef.id,
      user: { ...userData, id: docRef.id }
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const q = query(
      collection(db, 'users'),
      where('email', '==', email)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { 
        success: true, 
        userId: userDoc.id,
        user: { id: userDoc.id, ...userDoc.data() }
      };
    } else {
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUser = async (userId: string, updateData: Partial<User>) => {
  try {
    const docRef = doc(db, 'users', userId);
    const data = {
      ...updateData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(docRef, data);
    return { success: true, message: 'User updated successfully' };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const linkRegistrationToUser = async (userId: string, registrationId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      registrations: arrayUnion(registrationId),
      updatedAt: serverTimestamp()
    });
    return { success: true, message: 'Registration linked to user' };
  } catch (error) {
    console.error('Error linking registration to user:', error);
    throw error;
  }
};

export const linkAbstractToUser = async (userId: string, abstractId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      abstracts: arrayUnion(abstractId),
      updatedAt: serverTimestamp()
    });
    return { success: true, message: 'Abstract linked to user' };
  } catch (error) {
    console.error('Error linking abstract to user:', error);
    throw error;
  }
};

export const getUserCompleteData = async (email: string) => {
  try {
    // Get user by email
    const userResult = await getUserByEmail(email);
    if (!userResult.success) {
      return { success: false, message: 'User not found' };
    }
    
    const user = userResult.user as User;
    
    // Get all registrations for this user
    const registrationsData = [];
    for (const registrationId of user.registrations) {
      try {
        const regResult = await getRegistration(registrationId);
        if (regResult.success) {
          registrationsData.push(regResult.registration);
        }
      } catch (error) {
        console.error(`Error fetching registration ${registrationId}:`, error);
      }
    }
    
    // Get all abstracts for this user
    const abstractsData = [];
    for (const abstractId of user.abstracts) {
      try {
        const abstractResult = await getAbstract(abstractId);
        if (abstractResult.success) {
          abstractsData.push(abstractResult.abstract);
        }
      } catch (error) {
        console.error(`Error fetching abstract ${abstractId}:`, error);
      }
    }
    
    return {
      success: true,
      user,
      registrations: registrationsData,
      abstracts: abstractsData
    };
  } catch (error) {
    console.error('Error getting user complete data:', error);
    throw error;
  }
};

// ===== REGISTRATION SERVICES =====

export const createRegistration = async (registrationData: RegistrationData) => {
  try {
    // First, ensure user exists or create one
    let userResult = await getUserByEmail(registrationData.personalInfo.email);
    
    if (!userResult.success) {
      // Create new user if doesn't exist
      userResult = await createUser(registrationData.personalInfo);
    }
    
    if (!userResult.success) {
      throw new Error('Failed to create or find user');
    }
    
    const userId = userResult.userId!;
    
    // Create registration with user ID
    const data = {
      ...registrationData,
      userId, // Link to user
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'registrations'), data);
    
    // Link registration to user
    await linkRegistrationToUser(userId, docRef.id);
    
    return { success: true, registrationId: docRef.id, userId };
  } catch (error) {
    console.error('Error creating registration:', error);
    throw error;
  }
};

export const getRegistration = async (registrationId: string) => {
  try {
    const docRef = doc(db, 'registrations', registrationId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, registration: { id: docSnap.id, ...docSnap.data() } };
    } else {
      throw new Error('Registration not found');
    }
  } catch (error) {
    console.error('Error fetching registration:', error);
    throw error;
  }
};

export const updateRegistration = async (registrationId: string, updateData: Partial<RegistrationData>) => {
  try {
    const docRef = doc(db, 'registrations', registrationId);
    const data = {
      ...updateData,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(docRef, data);
    return { success: true, message: 'Registration updated successfully' };
  } catch (error) {
    console.error('Error updating registration:', error);
    throw error;
  }
};

export const getRegistrationsByConference = async (conferenceId: string) => {
  try {
    const q = query(
      collection(db, 'registrations'),
      where('conferenceId', '==', conferenceId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const registrations = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, registrations };
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw error;
  }
};

// ===== CONFERENCE SERVICES =====

export const getConferences = async () => {
  try {
    const q = query(
      collection(db, 'conferences'),
      where('isActive', '==', true),
      orderBy('startDate', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const conferences = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, conferences };
  } catch (error) {
    console.error('Error fetching conferences:', error);
    throw error;
  }
};

// ===== DOCUMENT SERVICES =====

export const uploadDocument = async (
  file: File, 
  userId: string, 
  documentType: string
): Promise<string> => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `userDocuments/${userId}/${fileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Save document metadata to Firestore
    const documentData: DocumentData = {
      userId,
      documentType,
      fileName,
      filePath: `userDocuments/${userId}/${fileName}`,
      uploadedAt: serverTimestamp()
    };
    
    await addDoc(collection(db, 'userDocuments'), documentData);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const deleteDocument = async (filePath: string) => {
  try {
    const storageRef = ref(storage, filePath);
    await deleteObject(storageRef);
    return { success: true, message: 'Document deleted successfully' };
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// ===== ABSTRACT SERVICES =====

export const submitAbstract = async (abstractData: AbstractData) => {
  try {
    // First, ensure user exists or create one
    let userResult = await getUserByEmail(abstractData.authorInfo.email);
    
    if (!userResult.success) {
      // Create new user if doesn't exist
      userResult = await createUser(abstractData.authorInfo);
    }
    
    if (!userResult.success) {
      throw new Error('Failed to create or find user');
    }
    
    const userId = userResult.userId!;
    
    // Create abstract with user ID
    const data = {
      ...abstractData,
      userId, // Link to user
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, 'abstracts'), data);
    
    // Link abstract to user
    await linkAbstractToUser(userId, docRef.id);
    
    return { success: true, abstractId: docRef.id, userId };
  } catch (error) {
    console.error('Error submitting abstract:', error);
    throw error;
  }
};

export const getAbstract = async (abstractId: string) => {
  try {
    const docRef = doc(db, 'abstracts', abstractId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, abstract: { id: docSnap.id, ...docSnap.data() } };
    } else {
      throw new Error('Abstract not found');
    }
  } catch (error) {
    console.error('Error fetching abstract:', error);
    throw error;
  }
};

export const getAbstractsByConference = async (conferenceId: string) => {
  try {
    const q = query(
      collection(db, 'abstracts'),
      where('conferenceId', '==', conferenceId),
      orderBy('submittedAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const abstracts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, abstracts };
  } catch (error) {
    console.error('Error fetching abstracts:', error);
    throw error;
  }
};

// ===== PAYMENT SERVICES =====

// ===== DUPLICATE PAYMENT PREVENTION =====

// Generate unique idempotency key for payment requests
export const generateIdempotencyKey = (userId: string, registrationId: string, amount: number): string => {
  const timestamp = Date.now();
  const hash = btoa(`${userId}_${registrationId}_${amount}_${timestamp}`).replace(/[^a-zA-Z0-9]/g, '');
  return `payment_${hash}`;
};

// Check if payment already exists for a registration
export const checkExistingPayment = async (registrationId: string): Promise<{
  exists: boolean;
  payment?: any;
  error?: string;
}> => {
  try {
    // Check if registration already has a payment
    const registrationDoc = await getDoc(doc(db, 'registrations', registrationId));
    if (!registrationDoc.exists()) {
      return { exists: false, error: 'Registration not found' };
    }

    const registrationData = registrationDoc.data();
    
    // If registration already has a paymentId, check if payment exists
    if (registrationData.paymentId) {
      const paymentDoc = await getDoc(doc(db, 'payments', registrationData.paymentId));
      if (paymentDoc.exists()) {
        const paymentData = paymentDoc.data();
        
        // Check payment status
        if (paymentData.status === 'succeeded') {
          return { 
            exists: true, 
            payment: { id: paymentDoc.id, ...paymentData },
            error: 'Payment already completed successfully'
          };
        } else if (paymentData.status === 'pending') {
          return { 
            exists: true, 
            payment: { id: paymentDoc.id, ...paymentData },
            error: 'Payment already in progress'
          };
        } else if (paymentData.status === 'failed') {
          // Allow retry for failed payments
          return { exists: false, payment: { id: paymentDoc.id, ...paymentData } };
        }
      }
    }

    // Check for any existing payments for this registration
    const paymentsQuery = query(
      collection(db, 'payments'),
      where('registrationId', '==', registrationId),
      orderBy('createdAt', 'desc'),
      limit(1)
    );
    
    const paymentsSnapshot = await getDocs(paymentsQuery);
    if (!paymentsSnapshot.empty) {
      const latestPayment = paymentsSnapshot.docs[0];
      const paymentData = latestPayment.data();
      
      // If latest payment is recent (within 5 minutes) and pending, prevent duplicate
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      if (paymentData.createdAt && paymentData.createdAt.toDate() > fiveMinutesAgo && paymentData.status === 'pending') {
        return { 
          exists: true, 
          payment: { id: latestPayment.id, ...paymentData },
          error: 'Recent payment already in progress'
        };
      }
    }

    return { exists: false };
  } catch (error) {
    console.error('Error checking existing payment:', error);
    return { exists: false, error: 'Error checking payment status' };
  }
};

// Enhanced payment creation with duplicate prevention
export const createStripePaymentIntentSafe = async (
  amount: number, 
  registrationId: string, 
  userId: string, 
  conferenceId: string,
  idempotencyKey?: string
) => {
  try {
    // Generate idempotency key if not provided
    const paymentKey = idempotencyKey || generateIdempotencyKey(userId, registrationId, amount);
    
    // Check for existing payments
    const existingPayment = await checkExistingPayment(registrationId);
    if (existingPayment.exists) {
      if (existingPayment.payment?.status === 'succeeded') {
        throw new Error('Payment already completed successfully');
      } else if (existingPayment.payment?.status === 'pending') {
        // Return existing payment intent if it's still pending
        return {
          success: true,
          paymentIntent: {
            id: existingPayment.payment.id,
            client_secret: existingPayment.payment.client_secret,
            status: existingPayment.payment.status
          },
          paymentId: existingPayment.payment.id,
          isExisting: true
        };
      }
    }

    // Check if user already has a pending payment for this conference
    const userPendingPaymentsQuery = query(
      collection(db, 'payments'),
      where('userId', '==', userId),
      where('conferenceId', '==', conferenceId),
      where('status', '==', 'pending'),
      where('paymentType', '==', 'conference_registration')
    );
    
    const userPendingSnapshot = await getDocs(userPendingPaymentsQuery);
    if (!userPendingSnapshot.empty) {
      const pendingPayment = userPendingSnapshot.docs[0];
      const paymentData = pendingPayment.data();
      
      // If there's a recent pending payment, return it instead of creating new
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      if (paymentData.createdAt && paymentData.createdAt.toDate() > fiveMinutesAgo) {
        return {
          success: true,
          paymentIntent: {
            id: paymentData.id,
            client_secret: paymentData.client_secret,
            status: paymentData.status
          },
          paymentId: pendingPayment.id,
          isExisting: true
        };
      }
    }

    // Create new payment intent
    const response = await fetch(`${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/createStripePaymentIntent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': paymentKey
      },
      body: JSON.stringify({
        amount,
        registrationId,
        userId,
        conferenceId,
        currency: 'usd',
        idempotencyKey: paymentKey,
        metadata: {
          registrationId,
          conferenceId,
          userId,
          paymentType: 'conference_registration',
          idempotencyKey: paymentKey
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      // Store comprehensive payment intent in Firestore for tracking
      const paymentIntent = {
        id: result.paymentIntent.id,
        amount,
        currency: 'usd',
        status: result.paymentIntent.status,
        client_secret: result.paymentIntent.client_secret,
        registrationId,
        userId,
        conferenceId,
        paymentType: 'conference_registration',
        paymentMethod: 'stripe',
        idempotencyKey: paymentKey,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const paymentRef = await addDoc(collection(db, 'payments'), paymentIntent);
      
      // Update registration with payment reference
      await updateDoc(doc(db, 'registrations', registrationId), {
        paymentId: paymentRef.id,
        paymentStatus: 'pending',
        idempotencyKey: paymentKey,
        updatedAt: serverTimestamp()
      });
      
      // Update user's payment history
      await updateDoc(doc(db, 'users', userId), {
        [`payments.${paymentRef.id}`]: {
          type: 'conference_registration',
          amount,
          currency: 'usd',
          status: 'pending',
          registrationId,
          conferenceId,
          paymentMethod: 'stripe',
          idempotencyKey: paymentKey,
          createdAt: serverTimestamp()
        },
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true,
        paymentIntent: result.paymentIntent,
        paymentId: paymentRef.id,
        idempotencyKey: paymentKey,
        isExisting: false
      };
    } else {
      throw new Error(result.error || 'Failed to create payment intent');
    }
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    throw error;
  }
};

export const createPayPalOrderSafe = async (
  amount: number, 
  registrationId: string, 
  userId: string, 
  conferenceId: string,
  idempotencyKey?: string
) => {
  try {
    // Generate idempotency key if not provided
    const paymentKey = idempotencyKey || generateIdempotencyKey(userId, registrationId, amount);
    
    // Check for existing payments
    const existingPayment = await checkExistingPayment(registrationId);
    if (existingPayment.exists) {
      if (existingPayment.payment?.status === 'succeeded') {
        throw new Error('Payment already completed successfully');
      } else if (existingPayment.payment?.status === 'pending') {
        // Return existing PayPal order if it's still pending
        return {
          success: true,
          paypalOrder: {
            id: existingPayment.payment.id,
            status: existingPayment.payment.status,
            intent: existingPayment.payment.intent
          },
          paymentId: existingPayment.payment.id,
          isExisting: true
        };
      }
    }

    // Check if user already has a pending payment for this conference
    const userPendingPaymentsQuery = query(
      collection(db, 'payments'),
      where('userId', '==', userId),
      where('conferenceId', '==', conferenceId),
      where('status', '==', 'pending'),
      where('paymentType', '==', 'conference_registration')
    );
    
    const userPendingSnapshot = await getDocs(userPendingPaymentsQuery);
    if (!userPendingSnapshot.empty) {
      const pendingPayment = userPendingSnapshot.docs[0];
      const paymentData = pendingPayment.data();
      
      // If there's a recent pending payment, return it instead of creating new
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      if (paymentData.createdAt && paymentData.createdAt.toDate() > fiveMinutesAgo) {
        return {
          success: true,
          paypalOrder: {
            id: paymentData.id,
            status: paymentData.status,
            intent: paymentData.intent
          },
          paymentId: pendingPayment.id,
          isExisting: true
        };
      }
    }

    // Create new PayPal order
    const response = await fetch(`${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/createPayPalOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': paymentKey
      },
      body: JSON.stringify({
        amount,
        registrationId,
        userId,
        conferenceId,
        currency: 'USD',
        intent: 'CAPTURE',
        idempotencyKey: paymentKey,
        metadata: {
          registrationId,
          conferenceId,
          userId,
          paymentType: 'conference_registration',
          idempotencyKey: paymentKey
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      // Store comprehensive PayPal order in Firestore for tracking
      const paypalOrder = {
        id: result.order.id,
        status: result.order.status,
        intent: result.order.intent,
        amount: {
          currency_code: 'USD',
          value: amount.toString()
        },
        registrationId,
        userId,
        conferenceId,
        paymentType: 'conference_registration',
        paymentMethod: 'paypal',
        idempotencyKey: paymentKey,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const paymentRef = await addDoc(collection(db, 'payments'), paypalOrder);
      
      // Update registration with payment reference
      await updateDoc(doc(db, 'registrations', registrationId), {
        paymentId: paymentRef.id,
        paymentStatus: 'pending',
        idempotencyKey: paymentKey,
        updatedAt: serverTimestamp()
      });
      
      // Update user's payment history
      await updateDoc(doc(db, 'users', userId), {
        [`payments.${paymentRef.id}`]: {
          type: 'conference_registration',
          amount,
          currency: 'USD',
          status: 'pending',
          registrationId,
          conferenceId,
          paymentMethod: 'paypal',
          idempotencyKey: paymentKey,
          createdAt: serverTimestamp()
        },
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true,
        paypalOrder: result.order,
        paymentId: paymentRef.id,
        idempotencyKey: paymentKey,
        isExisting: false
      };
    } else {
      throw new Error(result.error || 'Failed to create PayPal order');
    }
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    throw error;
  }
};

// ===== PAYMENT TRACKING SERVICES =====

export const getPaymentById = async (paymentId: string) => {
  try {
    const paymentDoc = await getDoc(doc(db, 'payments', paymentId));
    if (paymentDoc.exists()) {
      return { id: paymentDoc.id, ...paymentDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting payment:', error);
    throw error;
  }
};

export const getPaymentsByUserId = async (userId: string) => {
  try {
    const paymentsQuery = query(
      collection(db, 'payments'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(paymentsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user payments:', error);
    throw error;
  }
};

export const getPaymentsByRegistrationId = async (registrationId: string) => {
  try {
    const paymentsQuery = query(
      collection(db, 'payments'),
      where('registrationId', '==', registrationId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(paymentsQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting registration payments:', error);
    throw error;
  }
};

export const getUserCompletePaymentHistory = async (email: string) => {
  try {
    // Get user by email
    const userResult = await getUserByEmail(email);
    if (!userResult.success) {
      throw new Error('User not found');
    }

    const userId = userResult.userId!;

    // Get all user's payments
    const payments = await getPaymentsByUserId(userId);
    
    // Get all user's registrations
    const registrations = [];
    for (const payment of payments) {
      if ((payment as any).registrationId) {
        try {
          const regResult = await getRegistration((payment as any).registrationId);
          if (regResult.success) {
            registrations.push(regResult.registration);
          }
        } catch (error) {
          console.error(`Error fetching registration ${(payment as any).registrationId}:`, error);
        }
      }
    }
    
    // Get all user's abstracts
    const abstracts = [];
    for (const payment of payments) {
      if ((payment as any).abstractId) {
        try {
          const abstractResult = await getAbstract((payment as any).abstractId);
          if (abstractResult.success) {
            abstracts.push(abstractResult.abstract);
          }
        } catch (error) {
          console.error(`Error fetching abstract ${(payment as any).abstractId}:`, error);
        }
      }
    }
    
    // Create comprehensive user profile with all linked data
    const userProfile = {
      ...userResult.user,
      payments: payments.map(payment => ({
        ...payment,
        // Link to registration details
        registration: registrations.find(reg => reg.id === (payment as any).registrationId),
        // Link to conference details (you'll need to implement this)
        conference: null // TODO: Implement conference lookup
      })),
      registrations: registrations.map(registration => ({
        ...registration,
        // Link to payment details
        payment: payments.find(pay => (pay as any).registrationId === registration.id),
        // Link to conference details
        conference: null // TODO: Implement conference lookup
      })),
      abstracts: abstracts.map(abstract => ({
        ...abstract,
        // Link to conference details
        conference: null // TODO: Implement conference lookup
      }))
    };
    
    return {
      success: true,
      user: userProfile
    };
  } catch (error) {
    console.error('Error getting user complete payment history:', error);
    throw error;
  }
};

// ===== UTILITY SERVICES =====

export const healthCheck = async () => {
  try {
    // Test Firestore connection by trying to read from a collection
    const testQuery = await getDocs(collection(db, 'test'));
    
    return {
      success: true,
      message: 'Firebase connection successful',
      timestamp: new Date().toISOString(),
      firestoreStatus: 'connected'
    };
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};
