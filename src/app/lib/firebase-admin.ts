import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Validate environment variables
const requiredEnvVars = {
  FIREBASE_ADMIN_PROJECT_ID:
    process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  FIREBASE_ADMIN_CLIENT_EMAIL: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PRIVATE_KEY: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
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
    privateKey: requiredEnvVars.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

// Initialize Firebase Admin
const adminApp = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

export { adminApp };
export const adminAuth = getAuth(adminApp);
