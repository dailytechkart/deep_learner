export * from './home';
export * from './dashboard';
export * from './auth';
export * from './problems';

// Common analytics constants
export const COMMON_ANALYTICS = {
  EVENTS: {
    PAGE_VIEW: 'page_view',
    ERROR: 'error',
    NAVIGATION: 'navigation',
  },
  ERROR_TYPES: {
    NETWORK: 'network_error',
    VALIDATION: 'validation_error',
    UNKNOWN: 'unknown_error',
  },
} as const;
