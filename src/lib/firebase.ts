import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'local-dev-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'localhost',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'local-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'localhost',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'local-app-id'
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  // Fallback for local development
  const fallbackConfig = {
    apiKey: 'local-dev-key',
    authDomain: 'localhost',
    projectId: 'local-project',
    storageBucket: 'localhost',
    messagingSenderId: '123456789',
    appId: 'local-app-id'
  };
  app = initializeApp(fallbackConfig);
  console.log('🔄 Using fallback Firebase config for local development');
}

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'us-central1');

// Connect to emulators in development
if (import.meta.env.DEV) {
  try {
    console.log('Attempting to connect to Firebase emulators...');
    console.log('Firestore: localhost:8081');
    console.log('Storage: localhost:9199');
    console.log('Functions: localhost:5001');
    
    connectFirestoreEmulator(db, 'localhost', 8081);
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFunctionsEmulator(functions, 'localhost', 5001);
    
    console.log('✅ Successfully connected to Firebase emulators');
  } catch (error) {
    console.error('❌ Error connecting to Firebase emulators:', error);
  }
} else {
  // Production mode - using real Firebase services
  console.log('🚀 Using production Firebase services');
}

export default app;
