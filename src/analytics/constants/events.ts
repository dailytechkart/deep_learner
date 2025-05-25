export const ANALYTICS_EVENTS = {
  // User Events
  USER: {
    SIGNUP: 'User Signup',
    LOGIN: 'User Login',
    LOGOUT: 'User Logout',
  },

  // Course Events
  COURSE: {
    VIEW: 'Course View',
    START: 'Course Start',
    COMPLETE: 'Course Complete',
    LESSON_VIEW: 'Lesson View',
    LESSON_COMPLETE: 'Lesson Complete',
  },

  // Code Editor Events
  CODE: {
    EDIT: 'Code Edit',
    RUN: 'Code Run',
    SUBMIT: 'Code Submit',
  },

  // Navigation Events
  NAVIGATION: {
    PAGE_VIEW: 'Page View',
    NAVIGATE: 'Navigation',
  },

  // Search Events
  SEARCH: {
    SEARCH: 'Search',
  },

  // Error Events
  ERROR: {
    ERROR: 'Error',
  },
} as const;
