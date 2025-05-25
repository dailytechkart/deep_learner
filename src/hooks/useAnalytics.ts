import { useCallback } from 'react';
import mixpanel from 'mixpanel-browser';
import { AnalyticsEvent } from '@/analytics/types';

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, properties: AnalyticsEvent) => {
    try {
      mixpanel.track(eventName, properties);
    } catch (error) {
      console.error('Error tracking analytics event:', error);
    }
  }, []);

  const identify = useCallback((userId: string, userProperties?: Record<string, any>) => {
    try {
      mixpanel.identify(userId);
      if (userProperties) {
        mixpanel.people.set(userProperties);
      }
    } catch (error) {
      console.error('Error identifying user:', error);
    }
  }, []);

  const reset = useCallback(() => {
    try {
      mixpanel.reset();
    } catch (error) {
      console.error('Error resetting analytics:', error);
    }
  }, []);

  return {
    trackEvent,
    identify,
    reset,
  };
};
