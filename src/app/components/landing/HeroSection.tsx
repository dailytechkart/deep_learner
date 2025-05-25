import React, { useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  HeroSection as StyledHeroSection,
  HeroContent,
  HeroTextContent,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  ActionButton,
} from '../StyledComponents';
import HeroCarousel from '../HeroCarousel';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsEvent } from '@/utils/analytics';
import { HOME_ANALYTICS } from '@/analytics/constants';

const HeroSection: React.FC = () => {
  const { trackEvent } = useAnalytics();

  const handleGetStartedClick = useCallback(() => {
    trackEvent(AnalyticsEvent.NAVIGATION, {
      action: HOME_ANALYTICS.EVENTS.GET_STARTED_CLICK,
      location: HOME_ANALYTICS.LOCATIONS.HERO_SECTION,
      timestamp: new Date().toISOString(),
    });
  }, [trackEvent]);

  const handleLearnMoreClick = useCallback(() => {
    trackEvent(AnalyticsEvent.NAVIGATION, {
      action: HOME_ANALYTICS.EVENTS.LEARN_MORE_CLICK,
      location: HOME_ANALYTICS.LOCATIONS.HERO_SECTION,
      timestamp: new Date().toISOString(),
    });
  }, [trackEvent]);

  return (
    <StyledHeroSection>
      <HeroContent>
        <HeroTextContent>
          <HeroTitle>Master Frontend Development with Interactive Projects</HeroTitle>
          <HeroSubtitle>
            Learn modern frontend development through hands-on projects, real-world applications,
            and expert guidance. Master HTML, CSS, JavaScript, React, and more to build
            responsive, accessible, and performant web applications.
          </HeroSubtitle>
          <HeroActions>
            <Link href="/signup" passHref>
              <ActionButton primary onClick={handleGetStartedClick}>
                Get Started Free
              </ActionButton>
            </Link>
            <Link href="#features" passHref>
              <ActionButton onClick={handleLearnMoreClick}>Learn More</ActionButton>
            </Link>
          </HeroActions>
        </HeroTextContent>
        <HeroCarousel />
      </HeroContent>
    </StyledHeroSection>
  );
};

export default React.memo(HeroSection); 