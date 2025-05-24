import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';

async function requireAuth(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
}

async function handler(request: NextRequest) {
  const patternId = request.url.split('/').pop();

  if (!patternId) {
    return NextResponse.json({ error: 'Pattern ID is required' }, { status: 400 });
  }

  const patternDoc = await getDoc(doc(db, 'system_design_patterns', patternId));

  if (!patternDoc.exists()) {
    return NextResponse.json({ error: 'Pattern not found' }, { status: 404 });
  }

  const pattern = {
    id: patternDoc.id,
    ...patternDoc.data(),
  };

  return NextResponse.json(pattern);
}

export async function GET(request: NextRequest) {
  try {
    await requireAuth(request);
    return handler(request);
  } catch (error) {
    console.error('Error in system design GET:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const decodedToken = await requireAuth(request);
    const patternId = request.url.split('/').pop();
    const body = await request.json();

    if (!patternId) {
      return NextResponse.json({ error: 'Pattern ID is required' }, { status: 400 });
    }

    const patternRef = doc(db, 'system_design_patterns', patternId);
    const updateData = {
      ...body,
      updated_at: Timestamp.now(),
      updated_by: decodedToken.uid,
    };

    await updateDoc(patternRef, updateData);
    const updatedDoc = await getDoc(patternRef);

    if (!updatedDoc.exists()) {
      return NextResponse.json({ error: 'Pattern not found' }, { status: 404 });
    }

    const updatedPattern = {
      id: updatedDoc.id,
      ...updatedDoc.data(),
    };

    return NextResponse.json(updatedPattern);
  } catch (error) {
    console.error('Error updating pattern:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
