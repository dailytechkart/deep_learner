export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'backend' | 'fullstack';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  lessons: Lesson[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: number; // in minutes
  order: number;
  videoUrl?: string;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'code';
  url: string;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[]; // Array of lesson IDs
  currentLesson: string; // Current lesson ID
  progress: number; // Percentage complete
  lastAccessed: Date;
  startedAt: Date;
  completedAt?: Date;
}

export interface UserCourse {
  userId: string;
  courseId: string;
  enrolledAt: Date;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
}
