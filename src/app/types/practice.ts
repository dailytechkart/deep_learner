export enum QuestionCategory {
  ALGORITHMS = 'ALGORITHMS',
  DATA_STRUCTURES = 'DATA_STRUCTURES',
  SYSTEM_DESIGN = 'SYSTEM_DESIGN',
  DATABASE = 'DATABASE',
  NETWORKING = 'NETWORKING',
  SECURITY = 'SECURITY'
}

export enum QuestionDifficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  points: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface UserPracticeProgress {
  userId: string;
  questionId: string;
  isCorrect: boolean;
  selectedOption: number;
  attemptedAt: Date;
  timeSpent: number;
}

export interface UserPracticeStats {
  userId: string;
  category: QuestionCategory;
  totalAttempted: number;
  correctAnswers: number;
  totalPoints: number;
  lastAttempted: Date;
} 