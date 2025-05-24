import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthenticatedUser {
  uid: string;
  email: string | null | undefined;
  role?: string;
}

async function requireAuth(request: NextRequest): Promise<AuthenticatedUser> {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    const userDoc = await getDoc(doc(db, 'users', decodedToken.uid));

    if (!userDoc.exists()) {
      throw new Error('User profile not found');
    }

    const userData = userDoc.data();
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: userData.role,
    };
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
}

async function handler(request: NextRequest, user: AuthenticatedUser) {
  // Your protected API logic here
  const data = {
    message: 'This is a protected API route',
    user: {
      uid: user.uid,
      email: user.email,
      role: user.role,
    },
  };

  return NextResponse.json(data);
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    return handler(request, user);
  } catch (error) {
    console.error('Error in protected GET:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();

    // Your protected API logic here
    const data = {
      message: 'Data processed successfully',
      userId: user.uid,
      receivedData: body,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in protected POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
