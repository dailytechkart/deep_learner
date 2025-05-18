import { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';
import { Course, UserCourse, UserProgress } from '../types/course';
import { useAuth } from './useAuth'; // Assuming you have an auth hook

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAllCourses();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's enrolled courses
  const fetchUserCourses = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await courseService.getUserCourses(user.uid);
      setUserCourses(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch user courses');
      console.error('Error fetching user courses:', err);
    } finally {
      setLoading(false);
    }
  };

  // Enroll in a course
  const enrollInCourse = async (courseId: string) => {
    if (!user) {
      setError('You must be logged in to enroll in a course');
      return;
    }

    try {
      setLoading(true);
      await courseService.enrollUserInCourse(user.uid, courseId);
      await fetchUserCourses(); // Refresh user courses
      setError(null);
    } catch (err) {
      setError('Failed to enroll in course');
      console.error('Error enrolling in course:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update course progress
  const updateProgress = async (
    courseId: string,
    lessonId: string,
    isCompleted: boolean
  ) => {
    if (!user) {
      setError('You must be logged in to update progress');
      return;
    }

    try {
      setLoading(true);
      await courseService.updateUserProgress(user.uid, courseId, lessonId, isCompleted);
      await fetchUserCourses(); // Refresh user courses
      setError(null);
    } catch (err) {
      setError('Failed to update progress');
      console.error('Error updating progress:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get course progress
  const getCourseProgress = async (courseId: string): Promise<UserProgress | null> => {
    if (!user) return null;

    try {
      return await courseService.getUserCourseProgress(user.uid, courseId);
    } catch (err) {
      console.error('Error getting course progress:', err);
      return null;
    }
  };

  // Initialize data
  useEffect(() => {
    fetchCourses();
    if (user) {
      fetchUserCourses();
    }
  }, [user]);

  return {
    courses,
    userCourses,
    loading,
    error,
    enrollInCourse,
    updateProgress,
    getCourseProgress,
    refreshCourses: fetchCourses,
    refreshUserCourses: fetchUserCourses
  };
}; 