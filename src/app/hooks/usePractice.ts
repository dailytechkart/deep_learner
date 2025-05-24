'use client';

import { useState, useEffect, useCallback } from 'react';
import { practiceService } from '../services/practiceService';
import {
  PracticeQuestion,
  UserPracticeStats,
  UserPracticeProgress,
  QuestionCategory,
} from '../types/practice';
import { useAuth } from '../context/AuthContext';

export const usePractice = () => {
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [userStats, setUserStats] = useState<UserPracticeStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch all questions
  const fetchQuestions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await practiceService.getAllQuestions();
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch questions');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch questions by category
  const fetchQuestionsByCategory = useCallback(async (category: QuestionCategory) => {
    try {
      setLoading(true);
      const data = await practiceService.getQuestionsByCategory(category);
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch questions');
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new question
  const createQuestion = useCallback(
    async (question: Omit<PracticeQuestion, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setLoading(true);
        const questionId = await practiceService.createQuestion(question);
        await fetchQuestions(); // Refresh questions
        setError(null);
        return questionId;
      } catch (err) {
        setError('Failed to create question');
        console.error('Error creating question:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchQuestions]
  );

  // Submit an answer
  const submitAnswer = useCallback(
    async (questionId: string, selectedOption: number, timeSpent: number) => {
      if (!user) {
        setError('You must be logged in to submit answers');
        return null;
      }

      try {
        setLoading(true);
        const result = await practiceService.submitAnswer(
          user.uid,
          questionId,
          selectedOption,
          timeSpent
        );
        await fetchUserStats(); // Refresh user stats
        setError(null);
        return result;
      } catch (err) {
        setError('Failed to submit answer');
        console.error('Error submitting answer:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // Fetch user stats
  const fetchUserStats = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await practiceService.getUserStats(user.uid);
      setUserStats(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch user stats');
      console.error('Error fetching user stats:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Get user's progress for a specific question
  const getUserQuestionProgress = useCallback(
    async (questionId: string): Promise<UserPracticeProgress | null> => {
      if (!user) return null;

      try {
        return await practiceService.getUserQuestionProgress(user.uid, questionId);
      } catch (err) {
        console.error('Error getting question progress:', err);
        return null;
      }
    },
    [user]
  );

  // Initialize data
  useEffect(() => {
    let mounted = true;

    const initializeData = async () => {
      if (mounted) {
        await fetchQuestions();
        if (user) {
          await fetchUserStats();
        }
      }
    };

    initializeData();

    return () => {
      mounted = false;
    };
  }, [user, fetchQuestions, fetchUserStats]);

  return {
    questions,
    userStats,
    loading,
    error,
    fetchQuestions,
    fetchQuestionsByCategory,
    createQuestion,
    submitAnswer,
    fetchUserStats,
    getUserQuestionProgress,
  };
};
