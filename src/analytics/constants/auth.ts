export const AUTH_ANALYTICS = {
  EVENTS: {
    SIGNUP: 'signup',
    LOGIN: 'login',
    LOGOUT: 'logout',
    PROFILE_UPDATE: 'profile_update',
    AUTH_ERROR: 'auth_error',
  },
  PROVIDERS: {
    GITHUB: 'github',
    GOOGLE: 'google',
    EMAIL: 'email',
  },
  LOCATIONS: {
    LOGIN_PAGE: 'login_page',
    SIGNUP_PAGE: 'signup_page',
    PROFILE_PAGE: 'profile_page',
  },
  ERROR_TYPES: {
    INVALID_CREDENTIALS: 'invalid_credentials',
    NETWORK_ERROR: 'network_error',
    PROVIDER_ERROR: 'provider_error',
    UNKNOWN_ERROR: 'unknown_error',
  },
} as const;
