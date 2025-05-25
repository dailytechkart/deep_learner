import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAnalytics } from '../hooks/useAnalytics';
import { AnalyticsEvent } from '../utils/analytics';
import { COMMON_ANALYTICS } from '../analytics/constants';

export const withAnalytics = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return function WithAnalyticsComponent(props: P) {
    const router = useRouter();
    const { trackEvent } = useAnalytics();

    useEffect(() => {
      // Track initial page view
      trackEvent(AnalyticsEvent.PAGE_VIEW, {
        action: COMMON_ANALYTICS.EVENTS.PAGE_VIEW,
        timestamp: new Date().toISOString(),
      });

      // Track subsequent page views
      const handleRouteChange = (url: string) => {
        trackEvent(AnalyticsEvent.PAGE_VIEW, {
          action: COMMON_ANALYTICS.EVENTS.PAGE_VIEW,
          timestamp: new Date().toISOString(),
        });
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [router, trackEvent]);

    return <WrappedComponent {...props} />;
  };
};
