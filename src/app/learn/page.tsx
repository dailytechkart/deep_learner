'use client';

import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  MainContent,
  Section,
  SectionHeader,
  SectionTitle,
  TopicCardGrid,
  TopicCard,
  TopicCardHeader,
  TopicCardContent,
  TopicCardFooter,
  TopicCardStats,
  TopicCardAction,
  ProgressBar,
  CategoryList,
  CategoryButton
} from '../components/StyledComponents';

const categories = [
  { id: 'all', name: 'All Topics', count: 24 },
  { id: 'frontend', name: 'Frontend', count: 8 },
  { id: 'backend', name: 'Backend', count: 6 },
  { id: 'algorithms', name: 'Algorithms', count: 5 },
  { id: 'system-design', name: 'System Design', count: 5 }
];

const topics = [
  {
    id: 1,
    title: 'React Fundamentals',
    description: 'Learn the core concepts of React including components, props, state, and hooks.',
    progress: 75,
    duration: '4 hours',
    level: 'Beginner',
    category: 'frontend'
  },
  {
    id: 2,
    title: 'Node.js Mastery',
    description: 'Master Node.js for building scalable backend applications.',
    progress: 30,
    duration: '6 hours',
    level: 'Intermediate',
    category: 'backend'
  },
  {
    id: 3,
    title: 'Data Structures',
    description: 'Essential data structures and their implementations.',
    progress: 0,
    duration: '5 hours',
    level: 'Advanced',
    category: 'algorithms'
  },
  {
    id: 4,
    title: 'System Design Patterns',
    description: 'Learn common system design patterns and best practices.',
    progress: 0,
    duration: '8 hours',
    level: 'Advanced',
    category: 'system-design'
  }
];

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTopics = selectedCategory === 'all'
    ? topics
    : topics.filter(topic => topic.category === selectedCategory);

  return (
    <Layout>
      <MainContent>
        <Section>
          <SectionHeader>
            <SectionTitle>Learning Paths</SectionTitle>
          </SectionHeader>
          <CategoryList>
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <span className="category-count">{category.count}</span>
              </CategoryButton>
            ))}
          </CategoryList>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>Available Topics</SectionTitle>
          </SectionHeader>
          <TopicCardGrid>
            {filteredTopics.map(topic => (
              <TopicCard key={topic.id}>
                <TopicCardHeader>
                  <span>{topic.level}</span>
                </TopicCardHeader>
                <TopicCardContent>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </TopicCardContent>
                <TopicCardFooter>
                  <TopicCardStats>
                    <span>Duration: {topic.duration}</span>
                    {topic.progress > 0 && (
                      <>
                        <span>Progress: {topic.progress}%</span>
                        <ProgressBar progress={topic.progress}>
                          <div />
                        </ProgressBar>
                      </>
                    )}
                  </TopicCardStats>
                  <TopicCardAction>
                    {topic.progress > 0 ? 'Continue' : 'Start Learning'}
                  </TopicCardAction>
                </TopicCardFooter>
              </TopicCard>
            ))}
          </TopicCardGrid>
        </Section>
      </MainContent>
    </Layout>
  );
} 