import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, doc, getDoc, Timestamp } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { getAuthToken } from '../lib/client-auth';
import { PracticeQuestion, UserPracticeProgress, UserPracticeStats, QuestionCategory, QuestionDifficulty } from '../types/practice';

async function handleFirebaseError<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error: any) {
    if (error.code === 'auth/id-token-expired') {
      // Token expired, try to refresh and retry
      await getAuthToken();
      return await operation();
    }
    throw error;
  }
}

export const practiceService = {
  async getAllQuestions(): Promise<PracticeQuestion[]> {
    return handleFirebaseError(async () => {
      const db = getFirestore(getApp());
      const questionsRef = collection(db, 'questions');
      const snapshot = await getDocs(questionsRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate()
      } as PracticeQuestion));
    });
  },

  async getQuestionsByCategory(category: QuestionCategory): Promise<PracticeQuestion[]> {
    return handleFirebaseError(async () => {
      const db = getFirestore(getApp());
      const questionsRef = collection(db, 'questions');
      const q = query(questionsRef, where('category', '==', category));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate()
      } as PracticeQuestion));
    });
  },

  async createQuestion(question: Omit<PracticeQuestion, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    return handleFirebaseError(async () => {
      const db = getFirestore(getApp());
      const questionsRef = collection(db, 'questions');
      const now = Timestamp.now();
      const docRef = await addDoc(questionsRef, {
        ...question,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    });
  },

  async submitAnswer(
    userId: string,
    questionId: string,
    selectedOption: number,
    timeSpent: number
  ): Promise<{ isCorrect: boolean; points: number }> {
    return handleFirebaseError(async () => {
      const db = getFirestore(getApp());
      const questionRef = doc(db, 'questions', questionId);
      const questionDoc = await getDoc(questionRef);
      
      if (!questionDoc.exists()) {
        throw new Error('Question not found');
      }

      const question = questionDoc.data() as PracticeQuestion;
      const isCorrect = selectedOption === question.correctAnswer;

      // Update user progress
      const progressRef = doc(db, 'users', userId, 'progress', questionId);
      const progressDoc = await getDoc(progressRef);

      const now = Timestamp.now();
      if (progressDoc.exists()) {
        const progress = progressDoc.data() as UserPracticeProgress;
        await updateDoc(progressRef, {
          isCorrect: isCorrect || progress.isCorrect,
          selectedOption,
          attemptedAt: now,
          timeSpent
        });
      } else {
        await addDoc(collection(db, 'users', userId, 'progress'), {
          userId,
          questionId,
          isCorrect,
          selectedOption,
          attemptedAt: now,
          timeSpent
        });
      }

      return {
        isCorrect,
        points: isCorrect ? question.points : 0
      };
    });
  },

  async getUserStats(userId: string): Promise<UserPracticeStats[]> {
    return handleFirebaseError(async () => {
      const db = getFirestore(getApp());
      const progressRef = collection(db, 'users', userId, 'progress');
      const snapshot = await getDocs(progressRef);
      
      const stats: { [key: string]: UserPracticeStats } = {};

      const docs = snapshot.docs;
      for (const docSnapshot of docs) {
        const progress = docSnapshot.data() as UserPracticeProgress;
        const questionRef = doc(db, 'questions', progress.questionId);
        const questionDoc = await getDoc(questionRef);
        
        if (questionDoc.exists()) {
          const question = questionDoc.data() as PracticeQuestion;
          const category = question.category;

          if (!stats[category]) {
            stats[category] = {
              userId,
              category,
              totalAttempted: 0,
              correctAnswers: 0,
              totalPoints: 0,
              lastAttempted: progress.attemptedAt
            };
          }

          stats[category].totalAttempted++;
          if (progress.isCorrect) {
            stats[category].correctAnswers++;
            stats[category].totalPoints += question.points;
          }
          stats[category].lastAttempted = progress.attemptedAt;
        }
      }

      return Object.values(stats);
    });
  },

  async getUserQuestionProgress(userId: string, questionId: string): Promise<UserPracticeProgress | null> {
    return handleFirebaseError(async () => {
      const db = getFirestore(getApp());
      const progressRef = doc(db, 'users', userId, 'progress', questionId);
      const progressDoc = await getDoc(progressRef);
      
      if (!progressDoc.exists()) {
        return null;
      }

      const data = progressDoc.data();
      return {
        ...data,
        attemptedAt: data.attemptedAt.toDate()
      } as UserPracticeProgress;
    });
  },
}; 