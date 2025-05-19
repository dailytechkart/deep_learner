'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { TopicList } from '../components/TopicList';
import { learningTopics } from '../../data/learningTopics';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  margin-top: 64px;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 800px;
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 2px solid ${props => props.theme.colors.border};
`;

const LearnPage: React.FC = () => {
  // Group topics by category
  const topicsByCategory = learningTopics.reduce((acc, topic) => {
    if (!acc[topic.category]) {
      acc[topic.category] = [];
    }
    acc[topic.category].push(topic);
    return acc;
  }, {} as Record<string, typeof learningTopics>);

  // Define the order of categories
  const categoryOrder = [
    'JavaScript',
    'CSS',
    'React',
    'CI/CD',
    'Testing',
    'System Design',
    'Security',
    'SEO',
    'Performance'
  ];

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <Title>Learn Frontend Development</Title>
        <Description>
          Master modern frontend technologies with our comprehensive learning paths.
          Start with the basics and progress to advanced concepts at your own pace.
        </Description>

        {categoryOrder.map(category => (
          topicsByCategory[category] && (
            <Section key={category}>
              <SectionTitle>{category}</SectionTitle>
              <TopicList topics={topicsByCategory[category]} />
            </Section>
          )
        ))}
      </MainContent>
    </PageContainer>
  );
};

export default LearnPage; 