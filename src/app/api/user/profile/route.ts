import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { getFirestore } from 'firebase-admin/firestore';

const db = getFirestore();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userDoc = await db.collection('users').doc(session.user.id).get();
    const userData = userDoc.data();

    if (!userData) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Get achievements and activities from subcollections
    const achievementsSnapshot = await db
      .collection('users')
      .doc(session.user.id)
      .collection('achievements')
      .orderBy('earnedAt', 'desc')
      .limit(10)
      .get();

    const activitiesSnapshot = await db
      .collection('users')
      .doc(session.user.id)
      .collection('activityLog')
      .orderBy('timestamp', 'desc')
      .limit(10)
      .get();

    const achievements = achievementsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const activities = activitiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      achievements,
      activities
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 