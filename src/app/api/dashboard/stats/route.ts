import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import type { NextRequest } from 'next/server';

interface UserCourse {
  user_id: string;
  course_id: string;
  completed: boolean;
  progress: number;
  duration: number;
  enrolled_at: Timestamp;
  completed_at?: Timestamp;
  [key: string]: any;
}

interface DashboardStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHours: number;
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

async function getUserCourses(userId: string): Promise<UserCourse[]> {
  const userCoursesQuery = query(collection(db, 'user_courses'), where('user_id', '==', userId));
  const userCoursesSnapshot = await getDocs(userCoursesQuery);

  return userCoursesSnapshot.docs.map(doc => ({
    ...doc.data(),
  })) as UserCourse[];
}

function calculateStats(userCourses: UserCourse[]): DashboardStats {
  const totalCourses = userCourses.length;
  const completedCourses = userCourses.filter(course => course.completed).length;
  const inProgressCourses = userCourses.filter(
    course => !course.completed && course.progress > 0
  ).length;
  const totalHours = userCourses.reduce((total, course) => total + (course.duration || 0), 0);

  return {
    totalCourses,
    completedCourses,
    inProgressCourses,
    totalHours,
  };
}

export async function GET(request: NextRequest) {
  try {
    const decodedToken = await requireAuth(request);
    const userCourses = await getUserCourses(decodedToken.uid);
    const stats = calculateStats(userCourses);

    return NextResponse.json(stats);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch dashboard stats';
    const status =
      error instanceof Error && error.message.includes('Authentication failed') ? 401 : 500;
    return NextResponse.json({ error: errorMessage }, { status });
  }
}
