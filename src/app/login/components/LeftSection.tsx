import React from 'react';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import AnimatedBackground from './AnimatedBackground';
import TestimonialSection from './TestimonialSection';
import PricingSection from './PricingSection';

const LeftSectionContainer = styled.div`
  flex: 0.6;
  background: #1a1a1a;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  transform: scale(0.9);
  z-index: 2;
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 2rem;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 0.25rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
  font-weight: 800;
  line-height: 1.2;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #e0e0e0;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;

const testimonials = [
  {
    quote:
      'FrontendPro Academy transformed my career. The hands-on projects and mentorship were invaluable.',
    author: 'Sarah Johnson',
    role: 'Senior Frontend Developer',
    company: 'TechCorp',
    avatar: 'SJ',
  },
  {
    quote:
      'The structured learning path and real-world projects helped me land my dream job in just 6 months.',
    author: 'Michael Chen',
    role: 'Frontend Engineer',
    company: 'InnovateX',
    avatar: 'MC',
  },
  {
    quote: 'Best investment in my career. The community and support are unmatched.',
    author: 'Emma Rodriguez',
    role: 'UI/UX Developer',
    company: 'DesignHub',
    avatar: 'ER',
  },
];

const pricingFeatures = [
  'Access to all courses and materials',
  '1-on-1 mentorship sessions',
  'Project reviews and feedback',
  'Certificate of completion',
];

const LeftSection: React.FC = () => {
  return (
    <LeftSectionContainer>
      <AnimatedBackground />
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <ContentWrapper>
        <HeroSection>
          <Title>Master Frontend Development</Title>
          <Description>
            Join our community of developers and transform your career with expert-led courses,
            hands-on projects, and personalized mentorship.
          </Description>
        </HeroSection>

        <TestimonialSection testimonials={testimonials} />

        <PricingSection
          title="Full Access Plan"
          subtitle="Get unlimited access to all courses and features"
          originalPrice="₹4,999"
          currentPrice="₹499"
          discount="90% OFF"
          features={pricingFeatures}
          ctaText="Get Started Now"
          ctaLink="/pricing"
        />
      </ContentWrapper>
    </LeftSectionContainer>
  );
};

export default LeftSection;
