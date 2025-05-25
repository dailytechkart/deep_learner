import React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ReactNode } from 'react';

declare global {
  interface Window {
    gtag: (command: string, action: string, params?: Record<string, any>) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const GoogleAnalyticsComponent = (): ReactNode => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID is not defined');
    return null;
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
};

// Custom event tracking function
export const trackEvent = (eventName: string, eventParams?: Record<string, any>): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};
