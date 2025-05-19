import React from 'react';
import { TopicCard } from '../TopicCard';
import { Container, Section, SectionHeader, SectionTitle } from '../TailwindComponents';

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

export const TopicList: React.FC<TopicListProps> = ({ topics, title = 'Learning Topics' }) => {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
        </SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </Container>
    </Section>
  );
}; 