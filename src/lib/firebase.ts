import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection references
export const earlyAccessUsersCollection = collection(db, 'earlyAccessUsers');

// Check if email already exists
export const isEmailExists = async (email: string): Promise<boolean> => {
  const q = query(earlyAccessUsersCollection, where('email', '==', email.toLowerCase()));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

// Check if phone already exists
export const isPhoneExists = async (phone: string): Promise<boolean> => {
  const q = query(earlyAccessUsersCollection, where('phone', '==', phone));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

// Helper function to add early access user
export const addEarlyAccessUser = async (userData: {
  email: string;
  phone: string;
  occupation: string;
  interests: string[];
  experience: string;
  goals: string;
  createdAt: Date;
}) => {
  try {
    // Check for existing email
    const emailExists = await isEmailExists(userData.email);
    if (emailExists) {
      throw new Error('EMAIL_EXISTS');
    }

    // Check for existing phone
    const phoneExists = await isPhoneExists(userData.phone);
    if (phoneExists) {
      throw new Error('PHONE_EXISTS');
    }

    // Add user with normalized email (lowercase)
    const docRef = await addDoc(earlyAccessUsersCollection, {
      ...userData,
      email: userData.email.toLowerCase(),
    });

    return { id: docRef.id, ...userData };
  } catch (error) {
    console.error('Error adding early access user:', error);
    throw error;
  }
};
