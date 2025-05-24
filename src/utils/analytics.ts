import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '', {
  debug: process.env.NODE_ENV === 'development',
  track_pageview: true,
  persistence: 'localStorage',
});

// Event names enum for type safety
export enum AnalyticsEvent {
  // User Events
  USER_SIGNUP = 'User Signup',
  USER_LOGIN = 'User Login',
  USER_LOGOUT = 'User Logout',

  // Course Events
  COURSE_VIEW = 'Course View',
  COURSE_START = 'Course Start',
  COURSE_COMPLETE = 'Course Complete',
  LESSON_VIEW = 'Lesson View',
  LESSON_COMPLETE = 'Lesson Complete',

  // Code Editor Events
  CODE_EDIT = 'Code Edit',
  CODE_RUN = 'Code Run',
  CODE_SUBMIT = 'Code Submit',

  // Navigation Events
  PAGE_VIEW = 'Page View',
  NAVIGATION = 'Navigation',

  // Search Events
  SEARCH = 'Search',

  // Error Events
  ERROR = 'Error',
}

// Type for event properties
interface EventProperties {
  [key: string]: any;
}

// Analytics service class
class Analytics {
  // Track a custom event
  static track(event: AnalyticsEvent, properties?: EventProperties) {
    try {
      console.log(event, 'Analytics');
      mixpanel.track(event, properties);
    } catch (error) {
      console.error('Analytics Error:', error);
    }
  }

  // Identify a user
  static identify(userId: string, userProperties?: EventProperties) {
    try {
      mixpanel.identify(userId);
      if (userProperties) {
        mixpanel.people.set(userProperties);
      }
    } catch (error) {
      console.error('Analytics Error:', error);
    }
  }

  // Reset user identity
  static reset() {
    try {
      mixpanel.reset();
    } catch (error) {
      console.error('Analytics Error:', error);
    }
  }

  // Set user properties
  static setUserProperties(properties: EventProperties) {
    try {
      mixpanel.people.set(properties);
    } catch (error) {
      console.error('Analytics Error:', error);
    }
  }
}

export default Analytics;
