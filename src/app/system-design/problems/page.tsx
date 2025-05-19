'use client';

import React from 'react';
import styled from 'styled-components';
import { Layout, Section, SectionHeader, SectionTitle, SectionContent, Grid } from '../../components/Layout';
import Link from 'next/link';

const Card = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  transition: all ${props => props.theme.transitions.default};
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.h3.fontSize};
  font-weight: ${props => props.theme.typography.h3.fontWeight};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.body2.fontSize};
  margin-bottom: ${props => props.theme.spacing.lg};
  flex: 1;
`;

const CardLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    color: ${props => props.theme.colors.secondary};
    gap: ${props => props.theme.spacing.md};
  }
`;

const Badge = styled.span<{ difficulty: 'Easy' | 'Medium' | 'Hard' }>`
  background: ${props => {
    switch (props.difficulty) {
      case 'Easy':
        return props.theme.colors.success + '20';
      case 'Medium':
        return props.theme.colors.warning + '20';
      case 'Hard':
        return props.theme.colors.error + '20';
      default:
        return props.theme.colors.backgroundAlt;
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'Easy':
        return props.theme.colors.success;
      case 'Medium':
        return props.theme.colors.warning;
      case 'Hard':
        return props.theme.colors.error;
      default:
        return props.theme.colors.textSecondary;
    }
  }};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: ${props => props.theme.spacing.md};
  display: inline-block;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Tag = styled.span`
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.textSecondary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

export default function SystemDesignProblemsPage() {
  const problems = [
    {
      title: 'Design a Real-time Dashboard',
      description: 'Create a scalable dashboard with real-time data updates, efficient state management, and optimized rendering.',
      difficulty: 'Hard' as const,
      tags: ['Frontend', 'Real-time', 'State Management', 'Performance'],
      link: '/system-design/problems/real-time-dashboard'
    },
    {
      title: 'Design a Micro Frontend Architecture',
      description: 'Implement a micro frontend architecture for a large e-commerce application with independent deployments.',
      difficulty: 'Hard' as const,
      tags: ['Frontend', 'Micro Frontends', 'Module Federation', 'Build System'],
      link: '/system-design/problems/micro-frontend'
    },
    {
      title: 'Design a Frontend Caching System',
      description: 'Implement an efficient caching strategy for a content-heavy web application with offline support.',
      difficulty: 'Medium' as const,
      tags: ['Frontend', 'Caching', 'Service Worker', 'Performance'],
      link: '/system-design/problems/frontend-caching'
    },
    {
      title: 'Design a Progressive Web App',
      description: 'Create a PWA with offline support, push notifications, and efficient data synchronization.',
      difficulty: 'Medium' as const,
      tags: ['Frontend', 'PWA', 'Service Worker', 'Offline First'],
      link: '/system-design/problems/pwa'
    },
    {
      title: 'Design a URL Shortener',
      description: 'Create a service that converts long URLs into shorter, more manageable links.',
      difficulty: 'Easy' as const,
      tags: ['Backend', 'Scalability', 'Caching', 'Database Design'],
      link: '/system-design/problems/url-shortener'
    },
    {
      title: 'Design a Rate Limiter',
      description: 'Implement a system that limits the number of requests a user can make within a time window.',
      difficulty: 'Medium' as const,
      tags: ['Backend', 'Distributed Systems', 'Caching', 'Performance'],
      link: '/system-design/problems/rate-limiter'
    },
    {
      title: 'Design a Distributed Cache',
      description: 'Build a distributed caching system that can handle high throughput and maintain consistency.',
      difficulty: 'Hard' as const,
      tags: ['Backend', 'Distributed Systems', 'Consistency', 'Performance'],
      link: '/system-design/problems/distributed-cache'
    },
    {
      title: 'Design a Real-time Chat System',
      description: 'Create a scalable chat application that supports real-time messaging and presence.',
      difficulty: 'Medium' as const,
      tags: ['Full Stack', 'Real-time', 'WebSocket', 'Scalability'],
      link: '/system-design/problems/chat-system'
    },
    {
      title: 'Design a Search Engine',
      description: 'Build a search engine that can efficiently index and search through large amounts of data.',
      difficulty: 'Hard' as const,
      tags: ['Backend', 'Search', 'Indexing', 'Distributed Systems'],
      link: '/system-design/problems/search-engine'
    },
    {
      title: 'Design a Payment System',
      description: 'Create a secure and reliable payment processing system that can handle high transaction volumes.',
      difficulty: 'Hard' as const,
      tags: ['Backend', 'Security', 'Transactions', 'Reliability'],
      link: '/system-design/problems/payment-system'
    }
  ];

  return (
    <Layout
      title="System Design Problems"
      description="Practice your system design skills with real-world problems. Each problem includes detailed requirements and guidance for implementation."
    >
      <Section>
        <SectionHeader>
          <SectionTitle>Frontend Problems</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <Grid>
            {problems
              .filter(problem => problem.tags.includes('Frontend'))
              .map((problem, index) => (
                <Card key={index}>
                  <Badge difficulty={problem.difficulty}>{problem.difficulty}</Badge>
                  <CardTitle>{problem.title}</CardTitle>
                  <CardDescription>{problem.description}</CardDescription>
                  <TagList>
                    {problem.tags.map((tag, tagIndex) => (
                      <Tag key={tagIndex}>{tag}</Tag>
                    ))}
                  </TagList>
                  <CardLink href={problem.link}>
                    Start Problem →
                  </CardLink>
                </Card>
              ))}
          </Grid>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Backend Problems</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <Grid>
            {problems
              .filter(problem => problem.tags.includes('Backend'))
              .map((problem, index) => (
                <Card key={index}>
                  <Badge difficulty={problem.difficulty}>{problem.difficulty}</Badge>
                  <CardTitle>{problem.title}</CardTitle>
                  <CardDescription>{problem.description}</CardDescription>
                  <TagList>
                    {problem.tags.map((tag, tagIndex) => (
                      <Tag key={tagIndex}>{tag}</Tag>
                    ))}
                  </TagList>
                  <CardLink href={problem.link}>
                    Start Problem →
                  </CardLink>
                </Card>
              ))}
          </Grid>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Full Stack Problems</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <Grid>
            {problems
              .filter(problem => problem.tags.includes('Full Stack'))
              .map((problem, index) => (
                <Card key={index}>
                  <Badge difficulty={problem.difficulty}>{problem.difficulty}</Badge>
                  <CardTitle>{problem.title}</CardTitle>
                  <CardDescription>{problem.description}</CardDescription>
                  <TagList>
                    {problem.tags.map((tag, tagIndex) => (
                      <Tag key={tagIndex}>{tag}</Tag>
                    ))}
                  </TagList>
                  <CardLink href={problem.link}>
                    Start Problem →
                  </CardLink>
                </Card>
              ))}
          </Grid>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>How to Practice</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <p>
            System design problems are a great way to practice and improve your architectural skills.
            Each problem presents a real-world scenario that you need to solve by designing a scalable,
            reliable, and efficient system.
          </p>
          <p>
            When approaching frontend problems:
          </p>
          <ul>
            <li>Consider component architecture and state management</li>
            <li>Plan for performance optimization and code splitting</li>
            <li>Think about user experience and accessibility</li>
            <li>Consider browser compatibility and progressive enhancement</li>
            <li>Plan for offline support and data synchronization</li>
          </ul>
          <p>
            When approaching backend problems:
          </p>
          <ul>
            <li>Start by understanding the requirements and constraints</li>
            <li>Consider scalability, reliability, and performance aspects</li>
            <li>Think about data models and API design</li>
            <li>Plan for failure scenarios and edge cases</li>
            <li>Consider trade-offs in your design decisions</li>
          </ul>
          <p>
            Each problem includes detailed requirements, constraints, and guidance to help you
            practice effectively. Take your time to think through the design and consider
            different approaches before implementing your solution.
          </p>
        </SectionContent>
      </Section>
    </Layout>
  );
} 