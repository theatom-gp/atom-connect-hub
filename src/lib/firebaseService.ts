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
  arrayUnion 
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

export const createStripePaymentIntent = async (amount: number, registrationId: string) => {
  try {
    // Call your Firebase Function that creates real Stripe payment intent
    const response = await fetch(`${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/createStripePaymentIntent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        registrationId,
        currency: 'usd',
        metadata: {
          registrationId,
          conferenceId: 'conference-id', // You'll need to pass this
          userId: 'user-id' // You'll need to pass this
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      // Store payment intent in Firestore for tracking
      const paymentIntent = {
        id: result.paymentIntent.id,
        amount,
        currency: 'usd',
        status: result.paymentIntent.status,
        client_secret: result.paymentIntent.client_secret,
        registrationId,
        createdAt: serverTimestamp()
      };
      
      await addDoc(collection(db, 'paymentIntents'), paymentIntent);
      
      return {
        success: true,
        paymentIntent: result.paymentIntent
      };
    } else {
      throw new Error(result.error || 'Failed to create payment intent');
    }
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    throw error;
  }
};

export const createPayPalOrder = async (amount: number, registrationId: string) => {
  try {
    // Call your Firebase Function that creates real PayPal order
    const response = await fetch(`${import.meta.env.VITE_FIREBASE_FUNCTIONS_URL}/createPayPalOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        registrationId,
        currency: 'USD',
        intent: 'CAPTURE',
        metadata: {
          registrationId,
          conferenceId: 'conference-id', // You'll need to pass this
          userId: 'user-id' // You'll need to pass this
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      // Store PayPal order in Firestore for tracking
      const paypalOrder = {
        id: result.order.id,
        status: result.order.status,
        intent: result.order.intent,
        amount: {
          currency_code: 'USD',
          value: amount.toString()
        },
        registrationId,
        createdAt: serverTimestamp()
      };
      
      await addDoc(collection(db, 'paypalOrders'), paypalOrder);
      
      return {
        success: true,
        paypalOrder: result.order
      };
    } else {
      throw new Error(result.error || 'Failed to create PayPal order');
    }
  } catch (error) {
    console.error('Error creating PayPal order:', error);
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
