import { cookies } from 'next/headers';
import { adminAuth } from '@/app/lib/firebase-admin';

export interface Session {
  user: {
    uid: string;
    email: string;
  };
}

export async function getServerSession(): Promise<Session | null> {
  try {
    const sessionCookie = cookies().get('session')?.value;
    if (!sessionCookie) {
      return null;
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie);
    return {
      user: {
        uid: decodedClaims.uid,
        email: decodedClaims.email || '',
      },
    };
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
}
