import { practiceService } from '../services/practiceService';
import { QuestionCategory } from '../types/practice';

const sampleQuestions = [
  {
    title: 'HTML Document Structure',
    description: 'Understanding the basic structure of an HTML document',
    category: 'html' as QuestionCategory,
    difficulty: 'beginner',
    points: 10,
    question: 'Which of the following is the correct HTML5 document structure?',
    options: [
      '<!DOCTYPE html><html><head><title>Page</title></head><body></body></html>',
      '<html><head><title>Page</title></head><body></body></html>',
      '<!DOCTYPE html><head><title>Page</title></head><body></body></html>',
      '<!DOCTYPE html><html><title>Page</title><body></body></html>'
    ],
    correctAnswer: 0,
    explanation: 'The correct HTML5 document structure requires the DOCTYPE declaration, followed by the html, head, and body tags in the proper order.'
  },
  {
    title: 'CSS Box Model',
    description: 'Understanding the CSS box model and its properties',
    category: 'css' as QuestionCategory,
    difficulty: 'intermediate',
    points: 15,
    question: 'Which CSS property affects the space between the content and the border?',
    options: [
      'margin',
      'padding',
      'border-spacing',
      'gap'
    ],
    correctAnswer: 1,
    explanation: 'The padding property creates space between the content and the border of an element, while margin creates space outside the border.'
  },
  {
    title: 'JavaScript Closures',
    description: 'Understanding JavaScript closures and scope',
    category: 'javascript' as QuestionCategory,
    difficulty: 'advanced',
    points: 20,
    question: 'What will be the output of the following code?\n\nfunction createCounter() {\n  let count = 0;\n  return function() {\n    return ++count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter());\nconsole.log(counter());',
    options: [
      '1, 1',
      '0, 1',
      '1, 2',
      'undefined, undefined'
    ],
    correctAnswer: 2,
    explanation: 'The closure maintains access to the count variable, incrementing it each time the returned function is called.'
  },
  {
    title: 'React Hooks',
    description: 'Understanding React Hooks and their usage',
    category: 'react' as QuestionCategory,
    difficulty: 'intermediate',
    points: 15,
    question: 'Which of the following is NOT a valid React Hook?',
    options: [
      'useState',
      'useEffect',
      'useComponent',
      'useContext'
    ],
    correctAnswer: 2,
    explanation: 'useComponent is not a valid React Hook. The other options are all built-in React Hooks.'
  },
  {
    title: 'HTML Semantic Elements',
    description: 'Understanding HTML5 semantic elements',
    category: 'html' as QuestionCategory,
    difficulty: 'intermediate',
    points: 15,
    question: 'Which HTML5 element is used to define a section of navigation links?',
    options: [
      '<div class="nav">',
      '<navigation>',
      '<nav>',
      '<menu>'
    ],
    correctAnswer: 2,
    explanation: 'The <nav> element is specifically designed for navigation links in HTML5.'
  },
  {
    title: 'CSS Flexbox',
    description: 'Understanding CSS Flexbox layout',
    category: 'css' as QuestionCategory,
    difficulty: 'intermediate',
    points: 15,
    question: 'Which CSS property is used to align flex items along the main axis?',
    options: [
      'align-items',
      'justify-content',
      'flex-direction',
      'flex-wrap'
    ],
    correctAnswer: 1,
    explanation: 'justify-content aligns flex items along the main axis, while align-items aligns them along the cross axis.'
  },
  {
    title: 'JavaScript Promises',
    description: 'Understanding JavaScript Promises and async/await',
    category: 'javascript' as QuestionCategory,
    difficulty: 'advanced',
    points: 20,
    question: 'What will be logged to the console?\n\nPromise.resolve(1)\n  .then(x => { throw x; })\n  .then(x => console.log(x))\n  .catch(err => console.log(err))',
    options: [
      '1',
      'undefined',
      'Error: 1',
      'Nothing is logged'
    ],
    correctAnswer: 0,
    explanation: 'The error is caught by the catch block, which logs the error value (1).'
  },
  {
    title: 'React State Management',
    description: 'Understanding React state management patterns',
    category: 'react' as QuestionCategory,
    difficulty: 'advanced',
    points: 20,
    question: 'Which of the following is NOT a recommended way to manage state in React?',
    options: [
      'useState Hook',
      'useReducer Hook',
      'Global variables',
      'Context API'
    ],
    correctAnswer: 2,
    explanation: 'Using global variables is not recommended for state management in React as it breaks the component lifecycle and can lead to unpredictable behavior.'
  }
];

const seedQuestions = async () => {
  try {
    console.log('Starting to seed questions...');
    
    for (const question of sampleQuestions) {
      const questionId = await practiceService.createQuestion(question);
      console.log(`Created question: ${question.title} (ID: ${questionId})`);
    }
    
    console.log('Successfully seeded all questions!');
  } catch (error) {
    console.error('Error seeding questions:', error);
  }
};

// Run the seeding function
seedQuestions(); 