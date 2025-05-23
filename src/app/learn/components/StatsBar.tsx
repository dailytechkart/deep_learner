import React from 'react';
import styled from 'styled-components';
import { FaStar, FaClock, FaUsers } from 'react-icons/fa';

const StatsBarContainer = styled.section`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: ${props => props.theme.spacing.md};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const StatItem = styled.article`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const StatIcon = styled.div`
  color: ${props => props.theme.colors.primary};
`;

export const StatsBar: React.FC = () => {
  return (
    <StatsBarContainer aria-label="Course statistics">
      <StatItem>
        <StatIcon aria-hidden="true">
          <FaStar />
        </StatIcon>
        <span>4.8 Average Rating</span>
      </StatItem>
      <StatItem>
        <StatIcon aria-hidden="true">
          <FaClock />
        </StatIcon>
        <span>50+ Hours of Content</span>
      </StatItem>
      <StatItem>
        <StatIcon aria-hidden="true">
          <FaUsers />
        </StatIcon>
        <span>10k+ Active Learners</span>
      </StatItem>
    </StatsBarContainer>
  );
};
