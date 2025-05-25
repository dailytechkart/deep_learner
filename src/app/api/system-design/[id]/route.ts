import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';

interface SystemDesignPattern {
  id: string;
  title: string;
  description: string;
  content: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  created_by: string;
  updated_by: string;
  [key: string]: any;
}

async function requireAuth(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Authentication failed: ${error.message}`);
    }
    throw new Error('Authentication failed: Unknown error');
  }
}

async function getPatternById(patternId: string): Promise<SystemDesignPattern> {
  const patternDoc = await getDoc(doc(db, 'system_design_patterns', patternId));

  if (!patternDoc.exists()) {
    throw new Error('Pattern not found');
  }

  return {
    id: patternDoc.id,
    ...patternDoc.data(),
  } as SystemDesignPattern;
}

async function handler(request: NextRequest) {
  const patternId = request.url.split('/').pop();

  if (!patternId) {
    throw new Error('Pattern ID is required');
  }

  return getPatternById(patternId);
}

export async function GET(request: NextRequest) {
  try {
    await requireAuth(request);
    const pattern = await handler(request);
    return NextResponse.json(pattern);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unauthorized';
    const status = error instanceof Error && error.message === 'Pattern not found' ? 404 : 401;
    return NextResponse.json({ error: errorMessage }, { status });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const decodedToken = await requireAuth(request);
    const patternId = request.url.split('/').pop();
    const body = await request.json();

    if (!patternId) {
      throw new Error('Pattern ID is required');
    }

    const patternRef = doc(db, 'system_design_patterns', patternId);
    const updateData = {
      ...body,
      updated_at: Timestamp.now(),
      updated_by: decodedToken.uid,
    };

    await updateDoc(patternRef, updateData);
    const updatedPattern = await getPatternById(patternId);

    return NextResponse.json(updatedPattern);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const status = error instanceof Error && error.message === 'Pattern not found' ? 404 : 500;
    return NextResponse.json({ error: errorMessage }, { status });
  }
}
