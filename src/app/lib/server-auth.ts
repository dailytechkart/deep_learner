import { cookies } from 'next/headers';
import { auth as adminAuth } from './firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export interface ServerSession {
  uid: string;
  email: string;
  emailVerified: boolean;
  role?: string;
}

export async function getServerSession(): Promise<ServerSession | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return null;
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return {
      uid: decodedClaims.uid,
      email: decodedClaims.email || '',
      emailVerified: decodedClaims.email_verified || false,
      role: decodedClaims.role as string | undefined,
    };
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
}

export async function createSessionCookie(idToken: string): Promise<string> {
  try {
    // Create session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    // Set cookie
    cookies().set('session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return sessionCookie;
  } catch (error) {
    console.error('Error creating session cookie:', error);
    throw error;
  }
}

export async function revokeSessionCookie(): Promise<void> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (sessionCookie) {
      await adminAuth.verifySessionCookie(sessionCookie);
      await adminAuth.revokeRefreshTokens(sessionCookie);
    }

    // Clear the session cookie
    cookieStore.delete('session');
  } catch (error) {
    console.error('Error revoking session:', error);
    throw error;
  }
}

export async function requireAuth(request: NextRequest): Promise<ServerSession> {
  const session = await getServerSession();
  
  if (!session) {
    throw new Error('Authentication required');
  }
  
  return session;
}

export async function withAuth(handler: (session: ServerSession) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    try {
      const session = await requireAuth(request);
      return await handler(session);
    } catch (error) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  };
} 