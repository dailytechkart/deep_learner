import React from 'react';
import styled from 'styled-components';
import { TopicCard } from './TopicCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-top: 2rem;
  position: relative;
  padding-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SectionHeading = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.xl};
    margin-bottom: 0.75rem;
  }
`;

const SectionDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  font-size: ${props => props.theme.typography.fontSize.md};

  @media (max-width: 768px) {
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

interface SystemDesignTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  technologies: string[];
  roles: string[];
}

interface TopicsGridProps {
  topics: SystemDesignTopic[];
}

export const TopicsGrid: React.FC<TopicsGridProps> = ({ topics }) => {
  return (
    <>
      <SectionHeading>System Design Topics</SectionHeading>
      <SectionDescription>
        Explore comprehensive system design topics and patterns. Click a topic to start learning
        and practicing system design concepts.
      </SectionDescription>
      <Grid>
        {topics.map(topic => (
          <TopicCard
            key={topic.id}
            {...topic}
            isPremium={topic.tags.includes('premium')}
          />
        ))}
      </Grid>
    </>
  );
}; 