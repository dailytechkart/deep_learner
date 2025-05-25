'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { MainLayout } from '@/components/MainLayout';
import HeroSection from './components/landing/HeroSection';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuth } from './hooks/useAuth';

const SectionContainer = styled.div`
  /* min-height: 100vh; */
  scroll-behavior: smooth;
  overflow-x: hidden;
`;

const SectionWrapper = styled.div`
  /* min-height: 100vh; */
  display: flex;
  flex-direction: column;
`;

// Dynamically import components that are below the fold
const RoadmapSection = dynamic(() => import('./components/landing/RoadmapSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true,
});

const TestimonialsSection = dynamic(() => import('./components/landing/TestimonialsSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true,
});

const PricingSection = dynamic(() => import('./components/landing/PricingSection'), {
  loading: () => <LoadingSpinner />,
  ssr: true,
});

const CTASection = dynamic(() => import('./components/landing/CTASection'), {
  loading: () => <LoadingSpinner />,
  ssr: true,
});

export default function Home() {
  const { user, isPremium } = useAuth();
  console.log(user, isPremium, 'user, isPremium');

  return (
    <MainLayout fullWidth>
      <SectionContainer>
        <SectionWrapper>
          <HeroSection />
        </SectionWrapper>
        <SectionWrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <RoadmapSection />
          </Suspense>
        </SectionWrapper>
        {/* <SectionWrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <TestimonialsSection />
          </Suspense>
        </SectionWrapper> */}
        {/* <SectionWrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <PricingSection />
          </Suspense>
        </SectionWrapper> */}
        <SectionWrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <CTASection />
          </Suspense>
        </SectionWrapper>
      </SectionContainer>
    </MainLayout>
  );
}
