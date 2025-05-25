import React, { useCallback } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  PricingSection as StyledPricingSection,
  SectionHeader,
  SectionTitle,
  PricingGrid,
  PricingCard,
  PricingBadge,
  PricingTitle,
  PricingPrice,
  CurrentPrice,
  OriginalPrice,
  DiscountBadge,
  PricingFeatures,
  PricingFeature,
  PricingCTA,
  PricingNote,
} from '../StyledComponents';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsEvent } from '@/utils/analytics';
import { HOME_ANALYTICS } from '@/analytics/constants';

const ThreeColumnFeatures = styled(PricingFeatures)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const pricingFeatures = [
  'Access to all current courses',
  'Access to all future courses',
  'Lifetime community access',
  'Priority support',
  'Certificate of completion',
  'Project-based learning',
  'Interview preparation',
  'Career guidance',
  '100+ Machine Coding Problems',
  '150+ JavaScript Problems',
  '50+ System Design Problems',
  '500+ Practice Quizzes',
  'Real-world Project Scenarios',
  'Weekly Coding Challenges',
  'Mock Interview Sessions',
  'Code Review Sessions',
  'Resume Building Workshops',
  'Salary Negotiation Guide',
];

const PricingFeatureComponent: React.FC<{ feature: string }> = React.memo(({ feature }) => (
  <PricingFeature>{feature}</PricingFeature>
));

PricingFeatureComponent.displayName = 'PricingFeatureComponent';

const PricingSection: React.FC = () => {
  const { trackEvent } = useAnalytics();

  const handleGetStartedClick = useCallback(() => {
    trackEvent(AnalyticsEvent.NAVIGATION, {
      action: HOME_ANALYTICS.EVENTS.GET_STARTED_CLICK,
      location: HOME_ANALYTICS.LOCATIONS.HERO_SECTION,
      timestamp: new Date().toISOString(),
    });
  }, [trackEvent]);

  return (
    <StyledPricingSection id="pricing" aria-labelledby="pricing-title">
      <SectionHeader>
        <SectionTitle id="pricing-title">Get Full Access</SectionTitle>
      </SectionHeader>
      <PricingGrid>
        <PricingCard>
          <PricingBadge>Limited Time Offer</PricingBadge>
          <PricingTitle>Lifetime Access</PricingTitle>
          <PricingPrice>
            <CurrentPrice>₹499</CurrentPrice>
            <OriginalPrice>₹8,000</OriginalPrice>
            <DiscountBadge>94% OFF</DiscountBadge>
          </PricingPrice>
          <ThreeColumnFeatures>
            {pricingFeatures.map((feature, index) => (
              <PricingFeatureComponent key={index} feature={feature} />
            ))}
          </ThreeColumnFeatures>
          <Link href="/signup" passHref>
            <PricingCTA onClick={handleGetStartedClick}>Get Lifetime Access</PricingCTA>
          </Link>
          <PricingNote>One-time payment. No hidden fees. 7-day money-back guarantee.</PricingNote>
        </PricingCard>
      </PricingGrid>
    </StyledPricingSection>
  );
};

export default React.memo(PricingSection); 