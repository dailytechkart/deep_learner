import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
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

    // Get user's enrolled courses
    const userCoursesQuery = query(collection(db, 'user_courses'), where('user_id', '==', userId));
    const userCoursesSnapshot = await getDocs(userCoursesQuery);
    const userCourses = userCoursesSnapshot.docs.map(doc => doc.data());

    // Calculate stats
    const totalCourses = userCourses.length;
    const completedCourses = userCourses.filter(course => course.completed).length;
    const inProgressCourses = userCourses.filter(
      course => !course.completed && course.progress > 0
    ).length;

    // Calculate total hours (assuming each course has a duration field in hours)
    const totalHours = userCourses.reduce((total, course) => {
      return total + (course.duration || 0);
    }, 0);

    const stats = {
      totalCourses,
      completedCourses,
      inProgressCourses,
      totalHours,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
