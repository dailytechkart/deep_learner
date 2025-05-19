'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Link from 'next/link';

const SystemDesignContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  margin-top: 64px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.colors.border};
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Card = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.6;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.md};
`;

const Tag = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primary}20;
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const InternalLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  margin-top: ${props => props.theme.spacing.md};

  &:hover {
    text-decoration: underline;
  }
`;

const PrerequisitesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PrerequisiteItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.text};

  &::before {
    content: '✓';
    color: ${props => props.theme.colors.primary};
    font-weight: bold;
  }
`;

export default function SystemDesignPage() {
  const prerequisites = [
    'Understanding of modern JavaScript frameworks (React, Vue, Angular)',
    'Knowledge of state management patterns and solutions',
    'Experience with frontend performance optimization',
    'Understanding of browser rendering and JavaScript runtime',
    'Familiarity with frontend build tools and bundlers',
    'Knowledge of frontend security best practices'
  ];

  const learningPaths = [
    {
      title: 'Frontend Architecture',
      description: 'Learn about component architecture, state management, and building scalable frontend applications.',
      tags: ['Component Design', 'State Management', 'Code Organization'],
      link: '/system-design/frontend-architecture'
    },
    {
      title: 'Performance Optimization',
      description: 'Master techniques for optimizing frontend performance, including code splitting, lazy loading, and caching strategies.',
      tags: ['Code Splitting', 'Lazy Loading', 'Caching', 'Bundle Size'],
      link: '/system-design/performance'
    },
    {
      title: 'Micro Frontends',
      description: 'Learn how to design and implement micro frontend architectures for large-scale applications.',
      tags: ['Module Federation', 'Independent Deployments', 'Team Autonomy'],
      link: '/system-design/micro-frontends'
    },
    {
      title: 'Real-time Features',
      description: 'Design and implement real-time features like chat, notifications, and live updates in your frontend applications.',
      tags: ['WebSocket', 'Server-Sent Events', 'Real-time Updates'],
      link: '/system-design/real-time'
    }
  ];

  const practiceAreas = [
    {
      title: 'Design a Real-time Dashboard',
      description: 'Create a scalable dashboard with real-time data updates and efficient state management',
      difficulty: 'Medium',
      link: '/system-design/practice/dashboard'
    },
    {
      title: 'Design a Micro Frontend Architecture',
      description: 'Implement a micro frontend architecture for a large e-commerce application',
      difficulty: 'Hard',
      link: '/system-design/practice/micro-frontend'
    },
    {
      title: 'Design a Frontend Caching System',
      description: 'Implement an efficient caching strategy for a content-heavy web application',
      difficulty: 'Medium',
      link: '/system-design/practice/caching'
    },
    {
      title: 'Design a Progressive Web App',
      description: 'Create a PWA with offline support, push notifications, and efficient data synchronization',
      difficulty: 'Medium',
      link: '/system-design/practice/pwa'
    }
  ];

  return (
    <SystemDesignContainer>
      <Header />
      <MainContent>
        <PageHeader>
          <Title>Frontend System Design</Title>
          <Subtitle>
            Master the art of designing scalable, performant, and maintainable frontend applications.
            Learn modern frontend architecture patterns and best practices.
          </Subtitle>
        </PageHeader>

        <Section>
          <SectionTitle>Prerequisites</SectionTitle>
          <Card>
            <PrerequisitesList>
              {prerequisites.map((prerequisite, index) => (
                <PrerequisiteItem key={index}>{prerequisite}</PrerequisiteItem>
              ))}
            </PrerequisitesList>
          </Card>
        </Section>

        <Section>
          <SectionTitle>Learning Paths</SectionTitle>
          <CardGrid>
            {learningPaths.map((path, index) => (
              <Card key={index}>
                <CardTitle>{path.title}</CardTitle>
                <CardDescription>{path.description}</CardDescription>
                <TagList>
                  {path.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex}>{tag}</Tag>
                  ))}
                </TagList>
                <InternalLink href={path.link}>
                  Start Learning →
                </InternalLink>
              </Card>
            ))}
          </CardGrid>
        </Section>

        <Section>
          <SectionTitle>Practice Areas</SectionTitle>
          <CardGrid>
            {practiceAreas.map((area, index) => (
              <Card key={index}>
                <CardTitle>{area.title}</CardTitle>
                <CardDescription>{area.description}</CardDescription>
                <TagList>
                  <Tag>{area.difficulty}</Tag>
                </TagList>
                <InternalLink href={area.link}>
                  Start Practice →
                </InternalLink>
              </Card>
            ))}
          </CardGrid>
        </Section>
      </MainContent>
    </SystemDesignContainer>
  );
} 