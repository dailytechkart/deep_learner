import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import { Course, UserCourse, UserProgress } from '../types/course';

const COURSES_COLLECTION = 'courses';
const USER_COURSES_COLLECTION = 'userCourses';
const USER_PROGRESS_COLLECTION = 'userProgress';

export const courseService = {
  // Get all courses
  async getAllCourses(): Promise<Course[]> {
    const coursesRef = collection(db, COURSES_COLLECTION);
    const snapshot = await getDocs(coursesRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Course[];
  },

  // Get a single course
  async getCourse(courseId: string): Promise<Course | null> {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    const courseDoc = await getDoc(courseRef);

    if (!courseDoc.exists()) return null;

    return {
      id: courseDoc.id,
      ...courseDoc.data(),
      createdAt: courseDoc.data().createdAt.toDate(),
      updatedAt: courseDoc.data().updatedAt.toDate(),
    } as Course;
  },

  // Get user's enrolled courses
  async getUserCourses(userId: string): Promise<UserCourse[]> {
    const userCoursesRef = collection(db, USER_COURSES_COLLECTION);
    const q = query(userCoursesRef, where('userId', '==', userId), orderBy('enrolledAt', 'desc'));

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      enrolledAt: doc.data().enrolledAt.toDate(),
    })) as UserCourse[];
  },

  // Enroll user in a course
  async enrollUserInCourse(userId: string, courseId: string): Promise<void> {
    const userCourseRef = doc(db, USER_COURSES_COLLECTION, `${userId}_${courseId}`);
    const userProgressRef = doc(db, USER_PROGRESS_COLLECTION, `${userId}_${courseId}`);

    const now = Timestamp.now();

    // Create user course document
    await setDoc(userCourseRef, {
      userId,
      courseId,
      enrolledAt: now,
      status: 'not_started',
    });

    // Create initial progress document
    await setDoc(userProgressRef, {
      userId,
      courseId,
      completedLessons: [],
      currentLesson: '',
      progress: 0,
      lastAccessed: now,
      startedAt: now,
    });
  },

  // Update user's course progress
  async updateUserProgress(
    userId: string,
    courseId: string,
    lessonId: string,
    isCompleted: boolean
  ): Promise<void> {
    const progressRef = doc(db, USER_PROGRESS_COLLECTION, `${userId}_${courseId}`);
    const userCourseRef = doc(db, USER_COURSES_COLLECTION, `${userId}_${courseId}`);

    const progressDoc = await getDoc(progressRef);
    if (!progressDoc.exists()) return;

    const progress = progressDoc.data() as UserProgress;
    const course = await this.getCourse(courseId);
    if (!course) return;

    const updatedCompletedLessons = isCompleted
      ? [...new Set([...progress.completedLessons, lessonId])]
      : progress.completedLessons.filter(id => id !== lessonId);

    const totalLessons = course.lessons.length;
    const newProgress = Math.round((updatedCompletedLessons.length / totalLessons) * 100);

    // Update progress document
    await updateDoc(progressRef, {
      completedLessons: updatedCompletedLessons,
      currentLesson: lessonId,
      progress: newProgress,
      lastAccessed: Timestamp.now(),
    });

    // Update user course status
    let status = 'in_progress';
    if (newProgress === 100) {
      status = 'completed';
      await updateDoc(progressRef, {
        completedAt: Timestamp.now(),
      });
    }

    await updateDoc(userCourseRef, {
      status,
      progress: newProgress,
    });
  },

  // Get user's progress for a specific course
  async getUserCourseProgress(userId: string, courseId: string): Promise<UserProgress | null> {
    const progressRef = doc(db, USER_PROGRESS_COLLECTION, `${userId}_${courseId}`);
    const progressDoc = await getDoc(progressRef);

    if (!progressDoc.exists()) return null;

    return {
      ...progressDoc.data(),
      lastAccessed: progressDoc.data().lastAccessed.toDate(),
      startedAt: progressDoc.data().startedAt.toDate(),
      completedAt: progressDoc.data().completedAt?.toDate(),
    } as UserProgress;
  },
};
