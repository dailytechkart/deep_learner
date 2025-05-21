import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/app/lib/server-auth';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireAuth(request);
    const problemId = params.id;

    const problemDoc = await db.collection('systemDesignProblems').doc(problemId).get();

    if (!problemDoc.exists) {
      return NextResponse.json({ message: 'Problem not found' }, { status: 404 });
    }

    const problemData = problemDoc.data();

    // Get user's progress for this problem
    const progressDoc = await db
      .collection('users')
      .doc(session.uid)
      .collection('problemProgress')
      .doc(problemId)
      .get();

    const progressData = progressDoc.exists ? progressDoc.data() : null;

    return NextResponse.json({
      ...problemData,
      progress: progressData,
    });
  } catch (error) {
    console.error('Error fetching system design problem:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireAuth(request);
    const problemId = params.id;
    const body = await request.json();

    // Update user's progress for this problem
    await db
      .collection('users')
      .doc(session.uid)
      .collection('problemProgress')
      .doc(problemId)
      .set(
        {
          ...body,
          updatedAt: new Date(),
        },
        { merge: true }
      );

    return NextResponse.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Error updating problem progress:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
