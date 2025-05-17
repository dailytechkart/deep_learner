'use client';

// Firebase client SDK config
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};


// const firebaseConfig = {
//   apiKey: "AIzaSyBZPk75Y7RCXFBS6Z9ZKlOJFYjNjK1Ybho",
//   authDomain: "deeplearner-607b2.firebaseapp.com",
//   projectId: "deeplearner-607b2",
//   storageBucket: "deeplearner-607b2.firebasestorage.app",
//   messagingSenderId: "1042706966981",
//   appId: "1:1042706966981:web:61ce6ec9fa4731d7ffc3ac",
//   measurementId: "G-KCEJ6ECNRE"
// };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only on the client side
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

export default app; 