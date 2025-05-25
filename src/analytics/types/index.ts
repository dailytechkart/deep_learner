import {
  HOME_ANALYTICS,
  DASHBOARD_ANALYTICS,
  AUTH_ANALYTICS,
  PROBLEMS_ANALYTICS,
  COMMON_ANALYTICS,
} from '../constants';

// Base types for analytics events
export type BaseAnalyticsEvent = {
  timestamp: string;
  userId?: string;
  sessionId?: string;
};

// Home page analytics types
export type HomeAnalyticsEvent = BaseAnalyticsEvent & {
  action: (typeof HOME_ANALYTICS.EVENTS)[keyof typeof HOME_ANALYTICS.EVENTS];
  location: (typeof HOME_ANALYTICS.LOCATIONS)[keyof typeof HOME_ANALYTICS.LOCATIONS];
  feature?: (typeof HOME_ANALYTICS.FEATURES)[keyof typeof HOME_ANALYTICS.FEATURES];
};

// Dashboard analytics types
export type DashboardAnalyticsEvent = BaseAnalyticsEvent & {
  action: (typeof DASHBOARD_ANALYTICS.EVENTS)[keyof typeof DASHBOARD_ANALYTICS.EVENTS];
  section?: (typeof DASHBOARD_ANALYTICS.SECTIONS)[keyof typeof DASHBOARD_ANALYTICS.SECTIONS];
  tab?: (typeof DASHBOARD_ANALYTICS.TABS)[keyof typeof DASHBOARD_ANALYTICS.TABS];
  problemId?: string;
  problemTitle?: string;
  courseId?: string;
  courseTitle?: string;
  difficulty?: (typeof DASHBOARD_ANALYTICS.DIFFICULTY)[keyof typeof DASHBOARD_ANALYTICS.DIFFICULTY];
};

// Auth analytics types
export type AuthAnalyticsEvent = BaseAnalyticsEvent & {
  action: (typeof AUTH_ANALYTICS.EVENTS)[keyof typeof AUTH_ANALYTICS.EVENTS];
  provider?: (typeof AUTH_ANALYTICS.PROVIDERS)[keyof typeof AUTH_ANALYTICS.PROVIDERS];
  location: (typeof AUTH_ANALYTICS.LOCATIONS)[keyof typeof AUTH_ANALYTICS.LOCATIONS];
  errorType?: (typeof AUTH_ANALYTICS.ERROR_TYPES)[keyof typeof AUTH_ANALYTICS.ERROR_TYPES];
  errorMessage?: string;
};

// Problems analytics types
export type ProblemsAnalyticsEvent = BaseAnalyticsEvent & {
  action: (typeof PROBLEMS_ANALYTICS.EVENTS)[keyof typeof PROBLEMS_ANALYTICS.EVENTS];
  location: (typeof PROBLEMS_ANALYTICS.LOCATIONS)[keyof typeof PROBLEMS_ANALYTICS.LOCATIONS];
  problemId?: string;
  problemTitle?: string;
  difficulty?: (typeof PROBLEMS_ANALYTICS.DIFFICULTY)[keyof typeof PROBLEMS_ANALYTICS.DIFFICULTY];
  status?: (typeof PROBLEMS_ANALYTICS.STATUS)[keyof typeof PROBLEMS_ANALYTICS.STATUS];
  filter?: {
    type: (typeof PROBLEMS_ANALYTICS.FILTERS)[keyof typeof PROBLEMS_ANALYTICS.FILTERS];
    value: string;
  };
};

// Common analytics types
export type CommonAnalyticsEvent = BaseAnalyticsEvent & {
  action: (typeof COMMON_ANALYTICS.EVENTS)[keyof typeof COMMON_ANALYTICS.EVENTS];
  errorType?: (typeof COMMON_ANALYTICS.ERROR_TYPES)[keyof typeof COMMON_ANALYTICS.ERROR_TYPES];
  errorMessage?: string;
};

// Union type for all analytics events
export type AnalyticsEvent =
  | HomeAnalyticsEvent
  | DashboardAnalyticsEvent
  | AuthAnalyticsEvent
  | ProblemsAnalyticsEvent
  | CommonAnalyticsEvent;
