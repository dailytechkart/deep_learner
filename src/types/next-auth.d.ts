import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      progress?: {
        completedTopics: string[];
        quizScores: { [topicId: string]: number };
        timeSpent: { [topicId: string]: number };
        streak: number;
      };
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    progress?: {
      completedTopics: string[];
      quizScores: { [topicId: string]: number };
      timeSpent: { [topicId: string]: number };
      streak: number;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    progress?: {
      completedTopics: string[];
      quizScores: { [topicId: string]: number };
      timeSpent: { [topicId: string]: number };
      streak: number;
    };
  }
} 