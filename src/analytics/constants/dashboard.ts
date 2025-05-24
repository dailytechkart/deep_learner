export const DASHBOARD_ANALYTICS = {
  EVENTS: {
    TAB_CHANGE: 'tab_change',
    PROBLEM_CLICK: 'problem_click',
    COURSE_CLICK: 'course_click',
    VIEW_ALL_CLICK: 'view_all_click',
    STATS_VIEW: 'stats_view',
    ACTIVITY_VIEW: 'activity_view',
  },
  SECTIONS: {
    RECENT_PROBLEMS: 'recent_problems',
    YOUR_COURSES: 'your_courses',
    RECENT_ACTIVITY: 'recent_activity',
    STATS: 'stats',
  },
  TABS: {
    PROBLEMS: 'problems',
    COURSES: 'courses',
    ACTIVITY: 'activity',
  },
  DIFFICULTY: {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
  },
} as const;
