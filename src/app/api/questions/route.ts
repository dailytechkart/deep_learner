import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
import type { NextRequest } from 'next/server';

interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  user_id: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  [key: string]: any;
}

interface CreateQuestionRequest {
  title: string;
  content: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
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

function validateQuestionData(data: any): asserts data is CreateQuestionRequest {
  if (!data.title || typeof data.title !== 'string') {
    throw new Error('Title is required and must be a string');
  }
  if (!data.content || typeof data.content !== 'string') {
    throw new Error('Content is required and must be a string');
  }
  if (!Array.isArray(data.tags)) {
    throw new Error('Tags must be an array');
  }
  if (!['Easy', 'Medium', 'Hard'].includes(data.difficulty)) {
    throw new Error('Difficulty must be one of: Easy, Medium, Hard');
  }
}

export async function POST(request: NextRequest) {
  try {
    const decodedToken = await requireAuth(request);
    const body = await request.json();

    validateQuestionData(body);

    const questionData = {
      ...body,
      user_id: decodedToken.uid,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'questions'), questionData);
    const question: Question = {
      id: docRef.id,
      ...questionData,
    };

    return NextResponse.json({ question });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create question';
    const status =
      error instanceof Error && error.message.includes('Authentication failed') ? 401 : 500;
    return NextResponse.json({ error: errorMessage }, { status });
  }
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

    const questionsQuery = query(collection(db, 'questions'), orderBy('created_at', 'desc'));
    const questionsSnapshot = await getDocs(questionsQuery);

    const questions: Question[] = questionsSnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Question
    );

    return NextResponse.json({ questions, userId: decodedToken.uid });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
