import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import type { NextRequest } from 'next/server';

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
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
}

export async function GET(request: NextRequest) {
  try {
    const decodedToken = await requireAuth(request);
    const userId = decodedToken.uid;

    // Get user's enrolled courses
    const userCoursesQuery = query(
      collection(db, 'user_courses'),
      where('user_id', '==', userId),
      orderBy('last_accessed', 'desc'),
      limit(10)
    );

    const userCoursesSnapshot = await getDocs(userCoursesQuery);
    const userCourses = userCoursesSnapshot.docs.map(doc => doc.data());

    // Get course details for each enrolled course
    const courses = await Promise.all(
      userCourses.map(async userCourse => {
        const courseDoc = await getDocs(
          query(collection(db, 'courses'), where('id', '==', userCourse.course_id))
        );

        if (courseDoc.empty) return null;

        const courseData = courseDoc.docs[0].data();
        return {
          id: courseData.id,
          title: courseData.title,
          progress: userCourse.progress || 0,
          lastAccessed:
            userCourse.last_accessed?.toDate?.()?.toISOString() || new Date().toISOString(),
        };
      })
    );

    // Filter out any null values and return the courses
    const validCourses = courses.filter(course => course !== null);

    return NextResponse.json(validCourses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}
