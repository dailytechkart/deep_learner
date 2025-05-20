export interface Topic {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  role: 'SDE1' | 'SDE2' | 'SDE3' | 'Frontend Specialist' | 'Frontend Architect' | 'UI/UX Developer' | 'Frontend Performance Engineer';
}

export const learningTopics: Topic[] = [
  // SDE1 Frontend Topics
  {
    id: 'sde1-html-css',
    title: 'HTML5 & CSS3 Fundamentals',
    description: 'Master modern HTML5 semantics, CSS3 layouts, and responsive design principles. Essential for SDE1 frontend role.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'Frontend',
    difficulty: 'Beginner',
    estimatedTime: '4 hours',
    role: 'SDE1'
  },
  {
    id: 'sde1-js-basics',
    title: 'JavaScript Essentials',
    description: 'Learn core JavaScript concepts, DOM manipulation, and basic event handling for frontend development.',
    progress: 0,
    totalLessons: 15,
    completedLessons: 0,
    category: 'JavaScript',
    difficulty: 'Beginner',
    estimatedTime: '5 hours',
    role: 'SDE1'
  },
  {
    id: 'sde1-react-basics',
    title: 'React Fundamentals',
    description: 'Master React basics including components, props, state, and hooks for building interactive UIs.',
    progress: 0,
    totalLessons: 14,
    completedLessons: 0,
    category: 'React',
    difficulty: 'Beginner',
    estimatedTime: '6 hours',
    role: 'SDE1'
  },
  {
    id: 'sde1-git-basics',
    title: 'Version Control & Collaboration',
    description: 'Learn Git fundamentals, branching strategies, and collaboration workflows for frontend teams.',
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    category: 'DevOps',
    difficulty: 'Beginner',
    estimatedTime: '3 hours',
    role: 'SDE1'
  },

  // SDE2 Frontend Topics
  {
    id: 'sde2-advanced-react',
    title: 'Advanced React Patterns',
    description: 'Deep dive into React hooks, context, performance optimization, and advanced component patterns.',
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    category: 'React',
    difficulty: 'Intermediate',
    estimatedTime: '7 hours',
    role: 'SDE2'
  },
  {
    id: 'sde2-state-management',
    title: 'State Management Solutions',
    description: 'Master Redux, Context API, and other state management solutions for complex applications.',
    progress: 0,
    totalLessons: 14,
    completedLessons: 0,
    category: 'Frontend',
    difficulty: 'Intermediate',
    estimatedTime: '6 hours',
    role: 'SDE2'
  },
  {
    id: 'sde2-testing',
    title: 'Frontend Testing',
    description: 'Learn unit testing, integration testing, and E2E testing for React applications using Jest and Cypress.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'Testing',
    difficulty: 'Intermediate',
    estimatedTime: '5 hours',
    role: 'SDE2'
  },
  {
    id: 'sde2-performance',
    title: 'Frontend Performance',
    description: 'Master performance optimization techniques, code splitting, and bundle optimization.',
    progress: 0,
    totalLessons: 15,
    completedLessons: 0,
    category: 'Performance',
    difficulty: 'Intermediate',
    estimatedTime: '6 hours',
    role: 'SDE2'
  },

  // SDE3 Frontend Topics
  {
    id: 'sde3-architecture',
    title: 'Frontend Architecture',
    description: 'Design scalable frontend architectures, micro-frontends, and advanced design patterns.',
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    category: 'Architecture',
    difficulty: 'Advanced',
    estimatedTime: '8 hours',
    role: 'SDE3'
  },
  {
    id: 'sde3-system-design',
    title: 'Frontend System Design',
    description: 'Master frontend system design principles, scalability, and distributed frontend systems.',
    progress: 0,
    totalLessons: 14,
    completedLessons: 0,
    category: 'System Design',
    difficulty: 'Advanced',
    estimatedTime: '7 hours',
    role: 'SDE3'
  },
  {
    id: 'sde3-leadership',
    title: 'Technical Leadership',
    description: 'Learn frontend team leadership, mentoring, and technical decision making.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'Leadership',
    difficulty: 'Advanced',
    estimatedTime: '6 hours',
    role: 'SDE3'
  },

  // Frontend Specialist Topics
  {
    id: 'specialist-advanced-css',
    title: 'Advanced CSS & Animations',
    description: 'Master advanced CSS techniques, animations, and modern layout systems.',
    progress: 0,
    totalLessons: 15,
    completedLessons: 0,
    category: 'Frontend',
    difficulty: 'Advanced',
    estimatedTime: '7 hours',
    role: 'Frontend Specialist'
  },
  {
    id: 'specialist-accessibility',
    title: 'Web Accessibility',
    description: 'Learn WCAG guidelines, ARIA, and creating accessible web applications.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'Frontend',
    difficulty: 'Advanced',
    estimatedTime: '6 hours',
    role: 'Frontend Specialist'
  },

  // Frontend Architect Topics
  {
    id: 'architect-micro-frontends',
    title: 'Micro-Frontends Architecture',
    description: 'Design and implement micro-frontends architecture for large-scale applications.',
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    category: 'Architecture',
    difficulty: 'Advanced',
    estimatedTime: '8 hours',
    role: 'Frontend Architect'
  },
  {
    id: 'architect-design-systems',
    title: 'Design Systems Architecture',
    description: 'Create and maintain scalable design systems and component libraries.',
    progress: 0,
    totalLessons: 14,
    completedLessons: 0,
    category: 'Architecture',
    difficulty: 'Advanced',
    estimatedTime: '7 hours',
    role: 'Frontend Architect'
  },

  // UI/UX Developer Topics
  {
    id: 'uiux-motion-design',
    title: 'Motion Design & Animation',
    description: 'Master advanced motion design principles and animation techniques for web applications.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'UI/UX',
    difficulty: 'Advanced',
    estimatedTime: '6 hours',
    role: 'UI/UX Developer'
  },
  {
    id: 'uiux-interaction-design',
    title: 'Advanced Interaction Design',
    description: 'Learn advanced interaction design patterns and user experience optimization.',
    progress: 0,
    totalLessons: 14,
    completedLessons: 0,
    category: 'UI/UX',
    difficulty: 'Advanced',
    estimatedTime: '7 hours',
    role: 'UI/UX Developer'
  },

  // Frontend Performance Engineer Topics
  {
    id: 'performance-optimization',
    title: 'Advanced Performance Optimization',
    description: 'Master advanced performance optimization techniques and tools for web applications.',
    progress: 0,
    totalLessons: 15,
    completedLessons: 0,
    category: 'Performance',
    difficulty: 'Advanced',
    estimatedTime: '7 hours',
    role: 'Frontend Performance Engineer'
  },
  {
    id: 'performance-monitoring',
    title: 'Performance Monitoring & Analytics',
    description: 'Learn advanced performance monitoring, metrics collection, and optimization strategies.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'Performance',
    difficulty: 'Advanced',
    estimatedTime: '6 hours',
    role: 'Frontend Performance Engineer'
  }
]; 