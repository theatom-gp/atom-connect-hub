import { db, storage, functions } from './firebase';

// ===== TYPES =====

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  designation: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
  // yearsOfExperience: string;
}

export interface User {
  id?: string;
  email: string;
  personalInfo: PersonalInfo;
  registrations?: Registration[];
  abstracts?: Abstract[];
  payments?: Payment[];
  totalSpent?: number;
  totalRegistrations?: number;
  totalAbstracts?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Registration {
  id: string;
  conferenceId: string;
  registrationType: string;
  personalInfo: PersonalInfo;
  paymentInfo?: PaymentInfo;
  // documents?: string[];
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Abstract {
  id: string;
  conferenceId: string;
  title: string;
  authors: string[];
  documentUrl?: string;
  status: 'submitted' | 'under_review' | 'accepted' | 'rejected';
  submittedAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  type: 'conference_registration' | 'abstract_submission';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'stripe' | 'paypal';
  paymentIntentId?: string;
  orderId?: string;
  idempotencyKey: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentInfo {
  amount: number;
  processingFee: number;
  totalAmount: number;
  accommodation?: {
    type: string;
    occupancy: string;
    nights: string;
    price: number;
  };
}

export interface FirebaseRegistrationData {
  conferenceId: string;
  registrationType: string;
  personalInfo: PersonalInfo;
  paymentInfo?: PaymentInfo;
  // documents?: string[];
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AbstractData {
  userId: string;
  conferenceId: string;
  authorInfo: PersonalInfo;
  abstractTitle: string;
  documentFile?: string;
  status: string;
  submittedAt?: Date;
  updatedAt?: Date;
}

// ===== CONSTANTS =====

const FIREBASE_FUNCTIONS_BASE_URL = 'https://us-central1-the-atom-conferences-41cda.cloudfunctions.net';

// ===== UTILITY FUNCTIONS =====

/**
 * Validates email format
 */
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Makes HTTP request to Firebase Functions with proper error handling
 */
export const makeFirebaseRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${FIREBASE_FUNCTIONS_BASE_URL}/${endpoint}`;
  
  console.log('🌐 Making request to:', url);
  console.log('🌐 Request options:', options);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  console.log('🌐 Response status:', response.status);
  console.log('🌐 Response ok:', response.ok);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    console.error('🌐 Error response:', error);
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  console.log('🌐 Success response:', result);
  return result;
};

// ===== USER SERVICES =====

/**
 * Creates a new user or updates existing user
 */
export const createUser = async (personalInfo: PersonalInfo): Promise<{
  success: boolean;
  userId: string;
  user: User;
}> => {
  try {
    if (!validateEmail(personalInfo.email)) {
      throw new Error('Invalid email format');
    }
    const result = await makeFirebaseRequest<{
      userId: string;
      user: User;
    }>('createOrUpdateUser', {
      method: 'POST',
      body: JSON.stringify({
        email: personalInfo.email,
        personalInfo
      })
    });

    return { 
      success: true, 
      userId: personalInfo.email,
      user: { id: personalInfo.email, email: personalInfo.email, personalInfo }
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Retrieves user data by email
 */
export const getUserByEmail = async (email: string): Promise<{
  success: boolean;
  userId?: string;
  user?: User;
  error?: string;
}> => {
  try {
    if (!validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    const endpoint = `getUserData/${email}`;
    const result = await makeFirebaseRequest<{ user: User }>(endpoint, {
      method: 'GET'
    });

    return { 
      success: true, 
      userId: email,
      user: result.user
    };
  } catch (error) {
    if (error instanceof Error && (error.message.includes('404') || error.message.includes('User not found'))) {
      return { success: false, error: 'User not found' };
    }
    console.error('Error fetching user:', error);
    throw error;
  }
};

// ===== REGISTRATION SERVICES =====

/**
 * Creates a new registration
 */
export const createRegistration = async (registrationData: FirebaseRegistrationData): Promise<{
  success: boolean;
  registrationId: string;
  userId: string;
}> => {
  try {
    // Validate required fields
    if (!registrationData.personalInfo.email || !registrationData.conferenceId) {
      throw new Error('Email and conference ID are required');
    }

    if (!validateEmail(registrationData.personalInfo.email)) {
      throw new Error('Invalid email format');
    }

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
    
    // Create registration using optimized Firebase Function
    const result = await makeFirebaseRequest<{ userId: string }>('createOrUpdateUser', {
      method: 'POST',
      body: JSON.stringify({
        email: registrationData.personalInfo.email,
        personalInfo: registrationData.personalInfo,
        registrationData: {
          conferenceId: registrationData.conferenceId,
          registrationType: registrationData.registrationType,
          status: registrationData.status,
          paymentInfo: registrationData.paymentInfo,
          // documents: registrationData.documents || []
        }
      })
    });

    const registrationId = `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return { success: true, registrationId, userId };
  } catch (error) {
    console.error('Error creating registration:', error);
    throw error;
  }
};

// ===== ABSTRACT SERVICES =====

/**
 * Submits an abstract
 */
export const submitAbstract = async (abstractData: AbstractData): Promise<{
  success: boolean;
  abstractId: string;
  userId: string;
}> => {
  try {


    // Validate required fields
    if (!abstractData.authorInfo.email || !abstractData.conferenceId) {
      console.error('❌ Validation failed - missing required fields');
      throw new Error('Email, conference ID are required');
    }

    if (!validateEmail(abstractData.authorInfo.email)) {
      console.error('❌ Validation failed - invalid email format');
      throw new Error('Invalid email format');
    }

    // First, ensure user exists or create one
    let userResult = await getUserByEmail(abstractData.authorInfo.email);
    
    if (!userResult.success) {
      // Create new user if doesn't exist
      userResult = await createUser(abstractData.authorInfo);
    }
    
    if (!userResult.success) {
      console.error('❌ Failed to create or find user');
      throw new Error('Failed to create or find user');
    }
    
    const userId = userResult.userId!;
    
    // Prepare request data
    const requestData = {
      email: abstractData.authorInfo.email,
      conferenceId: abstractData.conferenceId,
      title: abstractData.abstractTitle,
      authors: [abstractData.authorInfo.firstName + ' ' + abstractData.authorInfo.lastName],
      documentUrl: abstractData.documentFile || ''
    };



    // Submit abstract using optimized Firebase Function
    const result = await makeFirebaseRequest<{ abstractId: string }>('submitAbstract', {
      method: 'POST',
      body: JSON.stringify(requestData)
    });

    return { success: true, abstractId: result.abstractId, userId };
  } catch (error) {
    console.error('Error submitting abstract:', error);
    throw error;
  }
};

// ===== DOCUMENT SERVICES =====

/**
 * Uploads a document to Firebase Storage
 */
export const uploadDocument = async (
  file: File, 
  userId: string, 
  documentType: string
): Promise<string> => {
  try {
    if (!file || !userId || !documentType) {
      throw new Error('File, userId, and documentType are required');
    }

    // Convert file to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:image/jpeg;base64, prefix
      };
      reader.onerror = error => reject(error);
    });

    // Call the optimized Firebase Function
    const result = await makeFirebaseRequest<{ fileUrl: string }>('uploadDocument', {
      method: 'POST',
      body: JSON.stringify({
        file: base64,
        fileName: file.name,
        userId: userId
      })
    });

    return result.fileUrl;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

// ===== PAYMENT SERVICES =====

/**
 * Creates a Stripe checkout session
 */
export const createStripeCheckoutSession = async (
  amount: number,
  registrationId: string,
  userId: string,
  conferenceId: string
): Promise<{
  success: boolean;
  sessionId?: string;
  url?: string;
}> => {
  try {
    if (!amount || !registrationId || !userId || !conferenceId) {
      throw new Error('Amount, registration ID, user ID, and conference ID are required');
    }

    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    const result = await makeFirebaseRequest<{
      sessionId: string;
      url: string;
    }>('createStripeCheckoutSession', {
      method: 'POST',
      body: JSON.stringify({
        amount: amount * 100, // Convert to cents
        registrationId,
        userId,
        conferenceId
      })
    });

    return { success: true, sessionId: result.sessionId, url: result.url };
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    throw error;
  }
};

/**
 * Creates a PayPal checkout session
 */
export const createPayPalCheckoutSession = async (
  amount: number,
  registrationId: string,
  userId: string,
  conferenceId: string
): Promise<{
  success: boolean;
  orderId?: string;
  url?: string;
}> => {
  try {
    if (!amount || !registrationId || !userId || !conferenceId) {
      throw new Error('Amount, registration ID, user ID, and conference ID are required');
    }

    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    const result = await makeFirebaseRequest<{
      orderId: string;
      url: string;
    }>('createPayPalOrder', {
      method: 'POST',
      body: JSON.stringify({
        amount: amount,
        registrationId,
        userId,
        conferenceId
      })
    });

    return { success: true, orderId: result.orderId, url: result.url };
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    throw error;
  }
};

// ===== CONFERENCE SERVICES =====

// Conference interface
interface Conference {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  isActive: boolean;
  registrationFee: number;
  currency: string;
  maxAttendees?: number;
  currentAttendees?: number;
  [key: string]: unknown; // Allow additional properties
}

/**
 * Retrieves all active conferences
 */
export const getConferences = async (): Promise<{
  success: boolean;
  conferences: Conference[];
}> => {
  try {
    const result = await makeFirebaseRequest<{ conferences: Conference[] }>('getConferences', {
      method: 'GET'
    });

    return { success: true, conferences: result.conferences };
  } catch (error) {
    console.error('Error fetching conferences:', error);
    throw error;
  }
};

// ===== UTILITY SERVICES =====

// Payment systems interface
interface PaymentSystems {
  stripe?: {
    configured: boolean;
    testMode: boolean;
  };
  paypal?: {
    configured: boolean;
    environment: string;
  };
}

/**
 * Health check for Firebase Functions
 */
export const healthCheck = async (): Promise<{
  success: boolean;
  status?: string;
  timestamp?: string;
  collections?: string[];
  paymentSystems?: PaymentSystems;
  error?: string;
}> => {
  try {
    const result = await makeFirebaseRequest<{
      status: string;
      timestamp: string;
      collections: string[];
      paymentSystems: PaymentSystems;
    }>('healthCheck', {
      method: 'GET'
    });

    return {
      success: true,
      status: result.status,
      timestamp: result.timestamp,
      collections: result.collections,
      paymentSystems: result.paymentSystems
    };
  } catch (error) {
    console.error('Error checking health:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Gets complete user payment history
 */
export const getUserCompletePaymentHistory = async (email: string): Promise<{
  success: boolean;
  user?: User;
  error?: string;
}> => {
  try {
    if (!validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    const userResult = await getUserByEmail(email);
    if (!userResult.success) {
      return { success: false, error: 'User not found' };
    }

    return {
      success: true,
      user: userResult.user
    };
  } catch (error) {
    console.error('Error getting user complete payment history:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};