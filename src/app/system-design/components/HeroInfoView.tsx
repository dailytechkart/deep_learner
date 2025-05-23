import React from 'react';
import styled from 'styled-components';
import { FaBook, FaServer, FaUsers } from 'react-icons/fa';

const Header = styled.div`
  text-align: left;
  margin-bottom: 4rem;
  padding: 0;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
    margin-bottom: 1rem;
  }
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 800px;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.md};
  }
`;

const StatsBar = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
    margin: 1.5rem 0;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.xs};
  }
`;

const StatIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.25rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProblemsCTA = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: 2rem;
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1.25rem;
    gap: 1rem;
    margin-top: 2rem;
  }
`;

const ProblemsCTAText = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const ProblemsCTAIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProblemsCTAContent = styled.div`
  flex: 1;
`;

const ProblemsCTAHeading = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.lg};
  }
`;

const ProblemsCTADesc = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.md};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

interface HeroInfoViewProps {
  title: string;
  description: string;
}

export const HeroInfoView: React.FC<HeroInfoViewProps> = ({ title, description }) => {
  return (
    <Header>
      <Title>{title}</Title>
      <Description>{description}</Description>

      <StatsBar>
        <StatItem>
          <StatIcon>
            <FaBook />
          </StatIcon>
          <span>100+ Design Patterns</span>
        </StatItem>
        <StatItem>
          <StatIcon>
            <FaServer />
          </StatIcon>
          <span>50+ Case Studies</span>
        </StatItem>
        <StatItem>
          <StatIcon>
            <FaUsers />
          </StatIcon>
          <span>5k+ Success Stories</span>
        </StatItem>
      </StatsBar>

      <ProblemsCTA>
        <ProblemsCTAText>
          <ProblemsCTAIcon>
            <FaBook />
          </ProblemsCTAIcon>
          <ProblemsCTAContent>
            <ProblemsCTAHeading>Practice System Design Problems</ProblemsCTAHeading>
            <ProblemsCTADesc>
              Ready to apply your knowledge? Jump into real-world system design problems and
              sharpen your skills with hands-on practice.
            </ProblemsCTADesc>
          </ProblemsCTAContent>
        </ProblemsCTAText>
      </ProblemsCTA>
    </Header>
  );
}; 