import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let adminAuth: ReturnType<typeof getAuth> | null = null;

export function getAdminAuth() {
  if (adminAuth) return adminAuth;

  const apps = getApps();

  if (!apps.length) {
    if (
      !process.env.FIREBASE_PROJECT_ID ||
      !process.env.FIREBASE_CLIENT_EMAIL ||
      !process.env.FIREBASE_PRIVATE_KEY
    ) {
      throw new Error('Missing required Firebase Admin environment variables');
    }

    try {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    } catch (error) {
      throw new Error(
        `Failed to initialize Firebase Admin: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  adminAuth = getAuth();
  return adminAuth;
}
