'use client';

import { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';
import { Course, UserCourse, UserProgress } from '../types/course';
import { useAuth } from '../context/AuthContext';

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
      await courseService.enrollInCourse(user.uid, courseId);
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
  const updateProgress = async (courseId: string, lessonId: string, isCompleted: boolean) => {
    if (!user) {
      setError('You must be logged in to update progress');
      return;
    }

    try {
      setLoading(true);
      // Get current progress
      const currentProgress = await courseService.getCourseProgress(user.uid, courseId);
      if (!currentProgress) {
        throw new Error('Course progress not found');
      }

      // Update completed lessons
      const completedLessons = isCompleted
        ? [...currentProgress.completedLessons, lessonId]
        : currentProgress.completedLessons.filter(id => id !== lessonId);

      // Get course to calculate total lessons
      const course = courses.find(c => c.id === courseId);
      if (!course) {
        throw new Error('Course not found');
      }

      // Calculate progress percentage
      const progress = Math.round((completedLessons.length / course.lessons.length) * 100);
      const completed = progress === 100;

      await courseService.updateCourseProgress(user.uid, courseId, progress, completed);
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
      return await courseService.getCourseProgress(user.uid, courseId);
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
    refreshUserCourses: fetchUserCourses,
  };
};
