import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Validate environment variables
const requiredEnvVars = {
  FIREBASE_ADMIN_PROJECT_ID: process.env.FIREBASE_ADMIN_PROJECT_ID,
  FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}. ` +
    'Please check your .env.local file.'
  );
}

const firebaseAdminConfig = {
  credential: cert({
    projectId: requiredEnvVars.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: requiredEnvVars.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: requiredEnvVars.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')
  })
};

// Initialize Firebase Admin
let adminApp;
try {
  const apps = getApps();
  if (!apps.length) {
    adminApp = initializeApp(firebaseAdminConfig);
  } else {
    adminApp = apps[0];
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
  throw new Error('Failed to initialize Firebase Admin SDK. Please check your credentials.');
}

export const adminAuth = getAuth(adminApp); 