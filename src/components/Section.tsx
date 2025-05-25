import React from 'react';
import styled from 'styled-components';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  'aria-labelledby'?: string;
}

const StyledSection = styled.section`
  padding: 4rem 0;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className, 
  style,
  id,
  'aria-labelledby': ariaLabelledBy 
}) => {
  return (
    <StyledSection 
      className={className} 
      style={style}
      id={id}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </StyledSection>
  );
};

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

export const SectionDescription = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto;
`;

export const SectionContent = styled.div`
  margin-top: 2rem;
`; 