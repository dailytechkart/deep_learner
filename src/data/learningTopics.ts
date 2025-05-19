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
}

export const learningTopics: Topic[] = [
  // JavaScript Topics
  {
    id: 'js-basics',
    title: 'JavaScript Fundamentals',
    description: 'Master the core concepts of JavaScript including variables, functions, and control flow.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'JavaScript',
    difficulty: 'Beginner',
    estimatedTime: '4 hours'
  },
  {
    id: 'js-advanced',
    title: 'Advanced JavaScript',
    description: 'Deep dive into advanced concepts like closures, prototypes, and async programming.',
    progress: 0,
    totalLessons: 15,
    completedLessons: 0,
    category: 'JavaScript',
    difficulty: 'Advanced',
    estimatedTime: '6 hours'
  },

  // CSS Topics
  {
    id: 'css-basics',
    title: 'CSS Fundamentals',
    description: 'Learn the basics of CSS including selectors, properties, and layout techniques.',
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'CSS',
    difficulty: 'Beginner',
    estimatedTime: '3 hours'
  },
  {
    id: 'css-advanced',
    title: 'Advanced CSS',
    description: 'Master advanced CSS concepts like animations, transforms, and responsive design.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'CSS',
    difficulty: 'Intermediate',
    estimatedTime: '5 hours'
  },

  // React Topics
  {
    id: 'react-basics',
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, props, and state management.',
    progress: 0,
    totalLessons: 14,
    completedLessons: 0,
    category: 'React',
    difficulty: 'Beginner',
    estimatedTime: '5 hours'
  },
  {
    id: 'react-advanced',
    title: 'Advanced React',
    description: 'Deep dive into advanced React concepts like hooks, context, and performance optimization.',
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    category: 'React',
    difficulty: 'Advanced',
    estimatedTime: '7 hours'
  },

  // CI/CD Topics
  {
    id: 'cicd-basics',
    title: 'CI/CD Fundamentals',
    description: 'Learn the basics of Continuous Integration and Continuous Deployment.',
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    category: 'CI/CD',
    difficulty: 'Intermediate',
    estimatedTime: '4 hours'
  },
  {
    id: 'cicd-advanced',
    title: 'Advanced CI/CD',
    description: 'Master advanced CI/CD concepts including pipeline optimization and deployment strategies.',
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'CI/CD',
    difficulty: 'Advanced',
    estimatedTime: '6 hours'
  },

  // Testing Topics
  {
    id: 'testing-basics',
    title: 'Testing Fundamentals',
    description: 'Learn the basics of software testing including unit, integration, and end-to-end testing.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'Testing',
    difficulty: 'Beginner',
    estimatedTime: '4 hours'
  },
  {
    id: 'testing-advanced',
    title: 'Advanced Testing',
    description: 'Master advanced testing concepts including test-driven development and automated testing.',
    progress: 0,
    totalLessons: 14,
    completedLessons: 0,
    category: 'Testing',
    difficulty: 'Advanced',
    estimatedTime: '6 hours'
  },

  // System Design Topics
  {
    id: 'system-design-basics',
    title: 'System Design Fundamentals',
    description: 'Learn the basics of system design including architecture patterns and scalability.',
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'System Design',
    difficulty: 'Intermediate',
    estimatedTime: '5 hours'
  },
  {
    id: 'system-design-advanced',
    title: 'Advanced System Design',
    description: 'Master advanced system design concepts including microservices and distributed systems.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'System Design',
    difficulty: 'Advanced',
    estimatedTime: '7 hours'
  },

  // Security Topics
  {
    id: 'security-basics',
    title: 'Web Security Fundamentals',
    description: 'Learn the basics of web security including authentication, authorization, and common vulnerabilities.',
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'Security',
    difficulty: 'Intermediate',
    estimatedTime: '4 hours'
  },
  {
    id: 'security-advanced',
    title: 'Advanced Security',
    description: 'Master advanced security concepts including encryption, secure coding practices, and threat modeling.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'Security',
    difficulty: 'Advanced',
    estimatedTime: '6 hours'
  },

  // SEO Topics
  {
    id: 'seo-basics',
    title: 'SEO Fundamentals',
    description: 'Learn the basics of Search Engine Optimization including keywords, meta tags, and content optimization.',
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    category: 'SEO',
    difficulty: 'Beginner',
    estimatedTime: '3 hours'
  },
  {
    id: 'seo-advanced',
    title: 'Advanced SEO',
    description: 'Master advanced SEO concepts including technical SEO, link building, and analytics.',
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'SEO',
    difficulty: 'Intermediate',
    estimatedTime: '5 hours'
  },

  // Performance Topics
  {
    id: 'performance-basics',
    title: 'Performance Optimization',
    description: 'Learn the basics of web performance optimization including loading speed and rendering optimization.',
    progress: 0,
    totalLessons: 10,
    completedLessons: 0,
    category: 'Performance',
    difficulty: 'Intermediate',
    estimatedTime: '4 hours'
  },
  {
    id: 'performance-advanced',
    title: 'Advanced Performance',
    description: 'Master advanced performance concepts including caching strategies and code optimization.',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    category: 'Performance',
    difficulty: 'Advanced',
    estimatedTime: '6 hours'
  }
]; 