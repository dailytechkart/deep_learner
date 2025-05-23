import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ error: 'No active session' }, { status: 401 });
    }

    try {
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
      return NextResponse.json({
        user: {
          uid: decodedClaims.uid,
          email: decodedClaims.email,
          emailVerified: decodedClaims.email_verified,
          role: decodedClaims.role,
        },
        message: 'Session is valid',
      });
    } catch (error: any) {
      if (error.code === 'auth/session-cookie-expired') {
        return NextResponse.json({ error: 'Session expired' }, { status: 401 });
      }
      throw error;
    }
  } catch (error: any) {
    console.error('Error getting session:', error);
    return NextResponse.json({ error: error.message || 'Failed to get session' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    // Create session cookie
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    // Set the session cookie
    cookies().set('session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (sessionCookie) {
      await adminAuth.verifySessionCookie(sessionCookie);
      await adminAuth.revokeRefreshTokens(sessionCookie);
    }

    // Clear the session cookie
    cookieStore.delete('session');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
