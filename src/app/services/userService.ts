import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  premium: boolean;
  joinedAt: Timestamp;
  coursesEnrolled: string[];
  progress: { [key: string]: string[] };
}

export class UserService {
  private static readonly COLLECTION = 'users';

  // Get user by ID
  static async getUserById(uid: string): Promise<User | null> {
    try {
      const userRef = doc(db, this.COLLECTION, uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        return null;
      }

      return userDoc.data() as User;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Create new user
  static async createUser(userData: Partial<User>): Promise<User> {
    try {
      const { uid, email } = userData;

      if (!uid || !email) {
        throw new Error('Missing required fields: uid and email');
      }

      const newUser: User = {
        uid,
        name: userData.name || '',
        email,
        photoURL: userData.photoURL || '',
        premium: false,
        joinedAt: Timestamp.now(),
        coursesEnrolled: [],
        progress: {},
      };

      await setDoc(doc(db, this.COLLECTION, uid), newUser);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Update user
  static async updateUser(uid: string, updateData: Partial<User>): Promise<void> {
    try {
      const userRef = doc(db, this.COLLECTION, uid);
      await updateDoc(userRef, updateData);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user
  static async deleteUser(uid: string): Promise<void> {
    try {
      const userRef = doc(db, this.COLLECTION, uid);
      await deleteDoc(userRef);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Enroll in course
  static async enrollInCourse(uid: string, courseId: string): Promise<void> {
    try {
      const userRef = doc(db, this.COLLECTION, uid);
      await updateDoc(userRef, {
        coursesEnrolled: arrayUnion(courseId),
        [`progress.${courseId}`]: [],
      });
    } catch (error) {
      console.error('Error enrolling in course:', error);
      throw error;
    }
  }

  // Unenroll from course
  static async unenrollFromCourse(uid: string, courseId: string): Promise<void> {
    try {
      const userRef = doc(db, this.COLLECTION, uid);
      await updateDoc(userRef, {
        coursesEnrolled: arrayRemove(courseId),
      });
    } catch (error) {
      console.error('Error unenrolling from course:', error);
      throw error;
    }
  }

  // Update course progress
  static async updateCourseProgress(
    uid: string,
    courseId: string,
    lessonId: string
  ): Promise<void> {
    try {
      const userRef = doc(db, this.COLLECTION, uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        throw new Error('User not found');
      }

      const userData = userDoc.data() as User;
      const currentProgress = userData.progress[courseId] || [];

      if (!currentProgress.includes(lessonId)) {
        await updateDoc(userRef, {
          [`progress.${courseId}`]: [...currentProgress, lessonId],
        });
      }
    } catch (error) {
      console.error('Error updating course progress:', error);
      throw error;
    }
  }

  // Get user's enrolled courses
  static async getEnrolledCourses(uid: string): Promise<string[]> {
    try {
      const user = await this.getUserById(uid);
      return user?.coursesEnrolled || [];
    } catch (error) {
      console.error('Error getting enrolled courses:', error);
      throw error;
    }
  }

  // Get user's course progress
  static async getCourseProgress(uid: string, courseId: string): Promise<string[]> {
    try {
      const user = await this.getUserById(uid);
      return user?.progress[courseId] || [];
    } catch (error) {
      console.error('Error getting course progress:', error);
      throw error;
    }
  }
}
