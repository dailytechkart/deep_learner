import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/firebase-admin';
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
    const adminAuth = getAdminAuth();
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
    if (error instanceof Error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
    throw new Error('Authentication failed: Unknown error');
  }
}

async function handler(request: NextRequest, user: AuthenticatedUser) {
  return NextResponse.json({
    message: 'This is a protected API route',
    user: {
      uid: user.uid,
      email: user.email,
      role: user.role,
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(token);

    return NextResponse.json({
      message: 'Protected route accessed successfully',
      user: decodedToken,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request);
    const body = await request.json();

    return NextResponse.json({
      message: 'Data processed successfully',
      userId: user.uid,
      receivedData: body,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
