import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface TopicCardProps {
  topic: {
    id: string;
    title: string;
    description: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    category: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: string;
  };
}

const Card = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.secondary}
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Title = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  line-height: 1.4;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props => {
    switch (props.difficulty) {
      case 'Beginner':
        return props.theme.colors.success;
      case 'Intermediate':
        return props.theme.colors.warning;
      case 'Advanced':
        return props.theme.colors.error;
      default:
        return props.theme.colors.backgroundAlt;
    }
  }};
  color: white;
  white-space: nowrap;
`;

const ProgressContainer = styled.div`
  margin: ${props => props.theme.spacing.md} 0;
  flex-grow: 1;
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ProgressLabel = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.textSecondary};
`;

const ProgressValue = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 6px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 3px;
  overflow: hidden;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(
      90deg,
      ${props => props.theme.colors.primary},
      ${props => props.theme.colors.secondary}
    );
    transition: width 0.3s ease;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.md} 0;
`;

const StatItem = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const StatValue = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.p`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CategoryBadge = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.sm};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  return (
    <Link href={`/topics/${topic.id}`}>
      <Card>
        <CardHeader>
          <div>
            <Title>{topic.title}</Title>
            <Description>{topic.description}</Description>
          </div>
          <DifficultyBadge difficulty={topic.difficulty}>
            {topic.difficulty}
          </DifficultyBadge>
        </CardHeader>

        <ProgressContainer>
          <ProgressHeader>
            <ProgressLabel>Progress</ProgressLabel>
            <ProgressValue>{topic.progress}%</ProgressValue>
          </ProgressHeader>
          <ProgressBar progress={topic.progress} />
        </ProgressContainer>

        <StatsGrid>
          <StatItem>
            <StatValue>{topic.completedLessons}</StatValue>
            <StatLabel>Completed</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{topic.totalLessons}</StatValue>
            <StatLabel>Total</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{topic.estimatedTime}</StatValue>
            <StatLabel>Est. Time</StatLabel>
          </StatItem>
        </StatsGrid>

        <CategoryBadge>{topic.category}</CategoryBadge>
      </Card>
    </Link>
  );
}; 