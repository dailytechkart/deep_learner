import React from 'react';
import styled from 'styled-components';
import { TopicCard } from '../TopicCard';

interface Topic {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
}

interface TopicListProps {
  topics: Topic[];
  title?: string;
}

const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${props => props.theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TopicCardWrapper = styled.div`
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const TopicList: React.FC<TopicListProps> = ({ topics }) => {
  return (
    <TopicsGrid>
      {topics.map(topic => (
        <TopicCardWrapper key={topic.id}>
          <TopicCard topic={topic} />
        </TopicCardWrapper>
      ))}
    </TopicsGrid>
  );
};
