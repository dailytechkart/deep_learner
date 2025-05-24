import { db } from '@/app/lib/firebase/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { Course, UserCourse, UserProgress } from '../types/course';

async function getAllCourses(): Promise<Course[]> {
  try {
    const coursesSnapshot = await getDocs(collection(db, 'courses'));
    return coursesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        description: data.description,
        category: data.category,
        level: data.level,
        duration: data.duration,
        lessons: data.lessons,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      } as Course;
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

async function getCourseById(id: string): Promise<Course | null> {
  try {
    const courseDoc = await getDoc(doc(db, 'courses', id));
    if (!courseDoc.exists()) {
      return null;
    }
    return {
      id: courseDoc.id,
      ...courseDoc.data(),
    } as Course;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

async function createCourse(
  course: Omit<Course, 'id' | 'created_at' | 'updated_at'>
): Promise<Course | null> {
  try {
    const now = Timestamp.now();
    const courseData = {
      ...course,
      created_at: now.toDate().toISOString(),
      updated_at: now.toDate().toISOString(),
    };
    const docRef = await addDoc(collection(db, 'courses'), courseData);
    const newCourseDoc = await getDoc(docRef);
    return {
      id: newCourseDoc.id,
      ...newCourseDoc.data(),
    } as Course;
  } catch (error) {
    console.error('Error creating course:', error);
    return null;
  }
}

async function updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
  try {
    const courseRef = doc(db, 'courses', id);
    const now = Timestamp.now();
    const updateData = {
      ...updates,
      updated_at: now.toDate().toISOString(),
    };
    await updateDoc(courseRef, updateData);
    const updatedCourseDoc = await getDoc(courseRef);
    return {
      id: updatedCourseDoc.id,
      ...updatedCourseDoc.data(),
    } as Course;
  } catch (error) {
    console.error('Error updating course:', error);
    return null;
  }
}

async function deleteCourse(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'courses', id));
    return true;
  } catch (error) {
    console.error('Error deleting course:', error);
    return false;
  }
}

async function getUserCourses(userId: string): Promise<UserCourse[]> {
  try {
    const userCoursesQuery = query(collection(db, 'user_courses'), where('user_id', '==', userId));
    const userCoursesSnapshot = await getDocs(userCoursesQuery);
    return userCoursesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        userId: data.user_id,
        courseId: data.course_id,
        enrolledAt: new Date(data.created_at),
        status: data.completed ? 'completed' : data.progress > 0 ? 'in_progress' : 'not_started',
        progress: data.progress,
      } as UserCourse;
    });
  } catch (error) {
    console.error('Error fetching user courses:', error);
    return [];
  }
}

async function enrollInCourse(userId: string, courseId: string): Promise<void> {
  try {
    const now = Timestamp.now();
    await addDoc(collection(db, 'user_courses'), {
      user_id: userId,
      course_id: courseId,
      progress: 0,
      completed: false,
      created_at: now.toDate().toISOString(),
      updated_at: now.toDate().toISOString(),
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
}

async function updateCourseProgress(
  userId: string,
  courseId: string,
  progress: number,
  completed: boolean
): Promise<void> {
  try {
    const userCoursesQuery = query(
      collection(db, 'user_courses'),
      where('user_id', '==', userId),
      where('course_id', '==', courseId)
    );
    const userCoursesSnapshot = await getDocs(userCoursesQuery);
    if (userCoursesSnapshot.empty) {
      throw new Error('User course not found');
    }
    const userCourseDoc = userCoursesSnapshot.docs[0];
    const currentData = userCourseDoc.data();

    await updateDoc(doc(db, 'user_courses', userCourseDoc.id), {
      progress,
      completed,
      completed_lessons: currentData.completed_lessons || [],
      current_lesson: currentData.current_lesson || '',
      updated_at: Timestamp.now().toDate().toISOString(),
    });
  } catch (error) {
    console.error('Error updating course progress:', error);
    throw error;
  }
}

async function getCourseProgress(userId: string, courseId: string): Promise<UserProgress | null> {
  try {
    const userCoursesQuery = query(
      collection(db, 'user_courses'),
      where('user_id', '==', userId),
      where('course_id', '==', courseId)
    );
    const userCoursesSnapshot = await getDocs(userCoursesQuery);
    if (userCoursesSnapshot.empty) {
      return null;
    }
    const data = userCoursesSnapshot.docs[0].data();
    return {
      userId: data.user_id,
      courseId: data.course_id,
      completedLessons: data.completed_lessons || [],
      currentLesson: data.current_lesson || '',
      progress: data.progress,
      lastAccessed: new Date(data.updated_at),
      startedAt: new Date(data.created_at),
      completedAt: data.completed ? new Date(data.updated_at) : undefined,
    } as UserProgress;
  } catch (error) {
    console.error('Error getting course progress:', error);
    return null;
  }
}

export const courseService = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getUserCourses,
  enrollInCourse,
  updateCourseProgress,
  getCourseProgress,
};
