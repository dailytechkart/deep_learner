import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    let userCredential;

    if (action === 'signup') {
      userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } else {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    }

    const idToken = await userCredential.user.getIdToken();

    // Set the auth token in a secure HTTP-only cookie
    const response = NextResponse.json(
      { success: true, user: userCredential.user },
      { status: 200 }
    );

    response.cookies.set('auth-token', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: 401 });
  }
}

export async function DELETE() {
  try {
    // Clear the auth token cookie
    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.delete('auth-token');
    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: error.message || 'Logout failed' }, { status: 500 });
  }
}
