import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
console.log(process.env, 'process.env');
// Initialize Firebase Admin
const apps = getApps();

if (!apps.length) {
  // Debug logging
  console.log('Firebase Admin initialization:');
  console.log('Project ID exists:', !!process.env.FIREBASE_PROJECT_ID);
  console.log('Client Email exists:', !!process.env.FIREBASE_CLIENT_EMAIL);
  console.log('Private Key exists:', !!process.env.FIREBASE_PRIVATE_KEY);

  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error;
  }
}

export const adminAuth = getAuth();
