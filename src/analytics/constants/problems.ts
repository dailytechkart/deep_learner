export const PROBLEMS_ANALYTICS = {
  EVENTS: {
    PROBLEM_VIEW: 'problem_view',
    PROBLEM_SOLVE: 'problem_solve',
    PROBLEM_SUBMIT: 'problem_submit',
    PROBLEM_FILTER: 'problem_filter',
    PROBLEM_SEARCH: 'problem_search',
    PROBLEM_BOOKMARK: 'problem_bookmark',
  },
  FILTERS: {
    DIFFICULTY: 'difficulty',
    TOPIC: 'topic',
    COMPANY: 'company',
    TAG: 'tag',
    STATUS: 'status',
  },
  DIFFICULTY: {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
  },
  STATUS: {
    SOLVED: 'solved',
    ATTEMPTED: 'attempted',
    BOOKMARKED: 'bookmarked',
    NOT_STARTED: 'not_started',
  },
  LOCATIONS: {
    PROBLEM_LIST: 'problem_list',
    PROBLEM_DETAIL: 'problem_detail',
    PROBLEM_EDITOR: 'problem_editor',
  },
} as const;
