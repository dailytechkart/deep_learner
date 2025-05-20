'use client';

import React from 'react';
import styled from 'styled-components';
import { TopicList } from '../components/TopicList';
import { learningTopics } from '../../data/learningTopics';
import { MainLayout } from '@/components/MainLayout';
import { useTheme } from '../context/ThemeContext';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.main`
  max-width: 1200px;
  width: 100%;
  padding: 2rem 0;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  transition: all ${props => props.theme.transitions.default};
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  max-width: 800px;
  transition: all ${props => props.theme.transitions.default};
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  transition: all ${props => props.theme.transitions.default};
`;

const LearnPage: React.FC = () => {
  const { isDarkMode } = useTheme();

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
    <MainLayout>
      <PageContainer>
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
    </MainLayout>
  );
};

export default LearnPage; 