import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp, orderBy, limit } from 'firebase/firestore';
import type { NextRequest } from 'next/server';

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

export async function GET(request: NextRequest) {
  try {
    const decodedToken = await requireAuth(request);
    const userId = decodedToken.uid;

    // Get user's activity from the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const activityQuery = query(
      collection(db, 'user_activity'),
      where('user_id', '==', userId),
      where('timestamp', '>=', Timestamp.fromDate(sevenDaysAgo)),
      orderBy('timestamp', 'desc'),
      limit(7)
    );

    const activitySnapshot = await getDocs(activityQuery);
    const activity = activitySnapshot.docs.map(doc => {
      const data = doc.data();
      const date = data.timestamp.toDate();
      return {
        date: date.toISOString().split('T')[0],
        hours: data.hours || 0,
      };
    });

    // Fill in missing days with zero hours
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const filledActivity = last7Days.map(date => {
      const existingEntry = activity.find(entry => entry.date === date);
      return existingEntry || { date, hours: 0 };
    });

    return NextResponse.json(filledActivity);
  } catch (error) {
    console.error('Error fetching activity data:', error);
    return NextResponse.json({ error: 'Failed to fetch activity data' }, { status: 500 });
  }
}
