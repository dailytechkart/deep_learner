import { db } from '@/app/lib/firebase/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  Timestamp,
  Query,
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';
import {
  PracticeQuestion,
  UserPracticeProgress,
  UserPracticeStats,
  QuestionCategory,
  QuestionDifficulty,
} from '../types/practice';

export interface Question {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  question_id: string;
  attempts: number;
  last_attempt: string;
  is_correct: boolean;
  created_at: string;
  updated_at: string;
}

const convertFirestoreQuestionToQuestion = (doc: DocumentSnapshot): Question => {
  const data = doc.data();
  if (!data) {
    throw new Error('Document data is undefined');
  }
  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    difficulty: data.difficulty,
    category: data.category,
    options: data.options || [],
    correct_answer: data.correct_answer,
    explanation: data.explanation,
    created_at: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
    updated_at: data.updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
  };
};

const convertFirestoreProgressToProgress = (doc: DocumentSnapshot): UserProgress => {
  const data = doc.data();
  if (!data) {
    throw new Error('Document data is undefined');
  }
  return {
    id: doc.id,
    user_id: data.user_id,
    question_id: data.question_id,
    attempts: data.attempts || 0,
    last_attempt: data.last_attempt?.toDate?.()?.toISOString() || new Date().toISOString(),
    is_correct: data.is_correct,
    created_at: data.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
    updated_at: data.updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
  };
};

export async function getQuestions(category?: string): Promise<Question[]> {
  try {
    let questionsQuery: CollectionReference<DocumentData> | Query<DocumentData> = collection(
      db,
      'questions'
    );
    if (category) {
      questionsQuery = query(questionsQuery, where('category', '==', category));
    }
    const questionsSnapshot = await getDocs(questionsQuery);
    return questionsSnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Question
    );
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

export async function getQuestionById(id: string): Promise<Question | null> {
  try {
    const questionDoc = await getDoc(doc(db, 'questions', id));
    if (!questionDoc.exists()) {
      return null;
    }
    return {
      id: questionDoc.id,
      ...questionDoc.data(),
    } as Question;
  } catch (error) {
    console.error('Error fetching question:', error);
    return null;
  }
}

export async function getUserProgress(
  userId: string,
  questionId: string
): Promise<UserProgress | null> {
  try {
    const progressQuery = query(
      collection(db, 'user_progress'),
      where('user_id', '==', userId),
      where('question_id', '==', questionId)
    );
    const progressSnapshot = await getDocs(progressQuery);

    if (progressSnapshot.empty) {
      return null;
    }

    const progressDoc = progressSnapshot.docs[0];
    return {
      id: progressDoc.id,
      ...progressDoc.data(),
    } as UserProgress;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return null;
  }
}

export async function updateUserProgress(
  userId: string,
  questionId: string,
  isCorrect: boolean
): Promise<boolean> {
  try {
    const progressQuery = query(
      collection(db, 'user_progress'),
      where('user_id', '==', userId),
      where('question_id', '==', questionId)
    );
    const progressSnapshot = await getDocs(progressQuery);

    const now = Timestamp.now();
    const nowISO = now.toDate().toISOString();

    if (progressSnapshot.empty) {
      // Create new progress record
      const progressData = {
        user_id: userId,
        question_id: questionId,
        attempts: 1,
        last_attempt: nowISO,
        is_correct: isCorrect,
        created_at: nowISO,
        updated_at: nowISO,
      };
      await addDoc(collection(db, 'user_progress'), progressData);
    } else {
      // Update existing progress record
      const progressDoc = progressSnapshot.docs[0];
      const currentData = progressDoc.data() as UserProgress;
      await updateDoc(doc(db, 'user_progress', progressDoc.id), {
        attempts: currentData.attempts + 1,
        last_attempt: nowISO,
        is_correct: isCorrect,
        updated_at: nowISO,
      });
    }
    return true;
  } catch (error) {
    console.error('Error updating user progress:', error);
    return false;
  }
}

export async function getUserProgressForCategory(
  userId: string,
  category: string
): Promise<UserProgress[]> {
  try {
    const progressQuery = query(collection(db, 'user_progress'), where('user_id', '==', userId));
    const progressSnapshot = await getDocs(progressQuery);

    const progress = progressSnapshot.docs.map(
      doc =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as UserProgress
    );

    // Filter progress by category
    const questionIds = progress.map(p => p.question_id);
    const questionsQuery = query(collection(db, 'questions'), where('category', '==', category));
    const questionsSnapshot = await getDocs(questionsQuery);
    const categoryQuestionIds = questionsSnapshot.docs.map(doc => doc.id);

    return progress.filter(p => categoryQuestionIds.includes(p.question_id));
  } catch (error) {
    console.error('Error fetching user progress for category:', error);
    return [];
  }
}

async function getAllQuestions(): Promise<PracticeQuestion[]> {
  try {
    const questionsSnapshot = await getDocs(collection(db, 'questions'));
    return questionsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        question: data.title,
        options: data.options,
        correctAnswer: data.correct_answer,
        explanation: data.explanation,
        category: data.category as QuestionCategory,
        difficulty: data.difficulty as QuestionDifficulty,
        points: data.points,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by,
      } as PracticeQuestion;
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
}

async function getQuestionsByCategory(category: QuestionCategory): Promise<PracticeQuestion[]> {
  try {
    const questionsQuery = query(collection(db, 'questions'), where('category', '==', category));
    const questionsSnapshot = await getDocs(questionsQuery);
    return questionsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        question: data.title,
        options: data.options,
        correctAnswer: data.correct_answer,
        explanation: data.explanation,
        category: data.category as QuestionCategory,
        difficulty: data.difficulty as QuestionDifficulty,
        points: data.points,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
        createdBy: data.created_by,
      } as PracticeQuestion;
    });
  } catch (error) {
    console.error('Error fetching questions by category:', error);
    return [];
  }
}

async function createQuestion(
  question: Omit<PracticeQuestion, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string | null> {
  try {
    const now = Timestamp.now();
    const questionData = {
      title: question.question,
      options: question.options,
      correct_answer: question.correctAnswer,
      explanation: question.explanation,
      category: question.category,
      difficulty: question.difficulty,
      points: question.points,
      created_by: question.createdBy,
      created_at: now.toDate().toISOString(),
      updated_at: now.toDate().toISOString(),
    };
    const docRef = await addDoc(collection(db, 'questions'), questionData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating question:', error);
    return null;
  }
}

async function submitAnswer(
  userId: string,
  questionId: string,
  selectedOption: number,
  timeSpent: number
): Promise<{ isCorrect: boolean; points: number } | null> {
  try {
    const questionDoc = await getDoc(doc(db, 'questions', questionId));
    if (!questionDoc.exists()) {
      throw new Error('Question not found');
    }

    const questionData = questionDoc.data();
    const isCorrect = selectedOption === questionData.correct_answer;
    const points = isCorrect ? questionData.points : 0;

    // Update user progress
    const progressQuery = query(
      collection(db, 'user_progress'),
      where('user_id', '==', userId),
      where('question_id', '==', questionId)
    );
    const progressSnapshot = await getDocs(progressQuery);

    const now = Timestamp.now();
    const nowISO = now.toDate().toISOString();

    if (progressSnapshot.empty) {
      // Create new progress record
      const progressData = {
        user_id: userId,
        question_id: questionId,
        selected_option: selectedOption,
        is_correct: isCorrect,
        time_spent: timeSpent,
        points_earned: points,
        created_at: nowISO,
        updated_at: nowISO,
      };
      await addDoc(collection(db, 'user_progress'), progressData);
    } else {
      // Update existing progress record
      const progressDoc = progressSnapshot.docs[0];
      await updateDoc(doc(db, 'user_progress', progressDoc.id), {
        selected_option: selectedOption,
        is_correct: isCorrect,
        time_spent: timeSpent,
        points_earned: points,
        updated_at: nowISO,
      });
    }

    // Update user stats
    const statsQuery = query(
      collection(db, 'user_stats'),
      where('user_id', '==', userId),
      where('category', '==', questionData.category)
    );
    const statsSnapshot = await getDocs(statsQuery);

    if (statsSnapshot.empty) {
      // Create new stats record
      const statsData = {
        user_id: userId,
        category: questionData.category,
        total_attempted: 1,
        correct_answers: isCorrect ? 1 : 0,
        total_points: points,
        last_attempted: nowISO,
        created_at: nowISO,
        updated_at: nowISO,
      };
      await addDoc(collection(db, 'user_stats'), statsData);
    } else {
      // Update existing stats record
      const statsDoc = statsSnapshot.docs[0];
      const currentStats = statsDoc.data();
      await updateDoc(doc(db, 'user_stats', statsDoc.id), {
        total_attempted: currentStats.total_attempted + 1,
        correct_answers: currentStats.correct_answers + (isCorrect ? 1 : 0),
        total_points: currentStats.total_points + points,
        last_attempted: nowISO,
        updated_at: nowISO,
      });
    }

    return { isCorrect, points };
  } catch (error) {
    console.error('Error submitting answer:', error);
    return null;
  }
}

async function getUserStats(userId: string): Promise<UserPracticeStats[]> {
  try {
    const statsQuery = query(collection(db, 'user_stats'), where('user_id', '==', userId));
    const statsSnapshot = await getDocs(statsQuery);
    return statsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        userId: data.user_id,
        category: data.category as QuestionCategory,
        totalAttempted: data.total_attempted,
        correctAnswers: data.correct_answers,
        totalPoints: data.total_points,
        lastAttempted: new Date(data.last_attempted),
      } as UserPracticeStats;
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return [];
  }
}

async function getUserQuestionProgress(
  userId: string,
  questionId: string
): Promise<UserPracticeProgress | null> {
  try {
    const progressQuery = query(
      collection(db, 'user_progress'),
      where('user_id', '==', userId),
      where('question_id', '==', questionId)
    );
    const progressSnapshot = await getDocs(progressQuery);

    if (progressSnapshot.empty) {
      return null;
    }

    const data = progressSnapshot.docs[0].data();
    return {
      userId: data.user_id,
      questionId: data.question_id,
      isCorrect: data.is_correct,
      selectedOption: data.selected_option,
      attemptedAt: new Date(data.created_at),
      timeSpent: data.time_spent,
    } as UserPracticeProgress;
  } catch (error) {
    console.error('Error fetching user question progress:', error);
    return null;
  }
}

export const practiceService = {
  getAllQuestions,
  getQuestionsByCategory,
  createQuestion,
  submitAnswer,
  getUserStats,
  getUserQuestionProgress,
};
