import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { SectionHeader, SectionTitle, SectionContent } from '../StyledComponents';

const GradientSection = styled.section`
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.secondary} 100%
  );
  padding: 4rem 0;
  text-align: center;
`;

const HeroDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: white;
`;

const StyledCTAButton = styled.button`
  background: white;
  color: ${props => props.theme.colors.primary};
  border: none;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
  }
`;

const CTAButton = styled.button`
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  border: 2px solid white;
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTASection: React.FC = () => {
  return (
    <GradientSection>
      <SectionHeader>
        <SectionTitle style={{ color: 'white' }}>Ready to Start Your Journey?</SectionTitle>
        <HeroDescription style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
          Join thousands of developers who have transformed their careers with DeepLearner.
        </HeroDescription>
      </SectionHeader>
      <SectionContent>
        <ButtonContainer>
          <Link href="/signup" passHref>
            <StyledCTAButton>Get Started Free</StyledCTAButton>
          </Link>
          <Link href="/learn" passHref>
            <CTAButton>Explore Courses</CTAButton>
          </Link>
        </ButtonContainer>
      </SectionContent>
    </GradientSection>
  );
};

export default React.memo(CTASection); 