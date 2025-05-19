'use client';

import React from 'react';
import styled from 'styled-components';
import { Layout, Section, SectionHeader, SectionTitle, SectionContent, Grid } from '../components/Layout';
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

const Badge = styled.span`
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.textSecondary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

export default function SystemDesignPage() {
  const prerequisites = [
    {
      title: 'Frontend Fundamentals',
      description: 'Understanding of HTML, CSS, JavaScript, and modern frontend frameworks.',
      link: '/learn/frontend-basics'
    },
    {
      title: 'State Management',
      description: 'Knowledge of state management patterns and solutions like Redux, MobX, or Context API.',
      link: '/learn/state-management'
    },
    {
      title: 'Performance Optimization',
      description: 'Understanding of frontend performance optimization techniques and tools.',
      link: '/learn/performance'
    },
    {
      title: 'Basic Computer Science',
      description: 'Understanding of data structures, algorithms, and basic computer science concepts.',
      link: '/learn/basics'
    },
    {
      title: 'Networking Fundamentals',
      description: 'Knowledge of HTTP, TCP/IP, DNS, and basic networking concepts.',
      link: '/learn/networking'
    },
    {
      title: 'Database Concepts',
      description: 'Understanding of SQL, NoSQL, and database design principles.',
      link: '/learn/databases'
    }
  ];

  const topics = [
    {
      title: 'Frontend Architecture',
      description: 'Learn about component architecture, state management, and building scalable frontend applications.',
      link: '/system-design/frontend-architecture'
    },
    {
      title: 'Performance Optimization',
      description: 'Master techniques for optimizing frontend performance, including code splitting, lazy loading, and caching strategies.',
      link: '/system-design/performance'
    },
    {
      title: 'Micro Frontends',
      description: 'Learn how to design and implement micro frontend architectures for large-scale applications.',
      link: '/system-design/micro-frontends'
    },
    {
      title: 'System Design Fundamentals',
      description: 'Learn the core concepts and principles of system design.',
      link: '/system-design/fundamentals'
    },
    {
      title: 'Design Patterns',
      description: 'Explore common system design patterns and their applications.',
      link: '/system-design/patterns'
    },
    {
      title: 'Case Studies',
      description: 'Study real-world system design examples from top companies.',
      link: '/system-design/case-studies'
    },
    {
      title: 'Practice Problems',
      description: 'Solve system design problems and get hands-on experience.',
      link: '/system-design/problems'
    }
  ];

  return (
    <Layout
      title="System Design"
      description="Master the art of designing scalable, reliable, and efficient systems. Learn from real-world examples and practice with hands-on problems."
    >
      <Section>
        <SectionHeader>
          <SectionTitle>Prerequisites</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <Grid>
            {prerequisites.map((prerequisite, index) => (
              <Card key={index}>
                <CardTitle>{prerequisite.title}</CardTitle>
                <CardDescription>{prerequisite.description}</CardDescription>
                <CardLink href={prerequisite.link}>
                  Learn More →
                </CardLink>
              </Card>
            ))}
          </Grid>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Topics</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <Grid>
            {topics.map((topic, index) => (
              <Card key={index}>
                <CardTitle>{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
                <CardLink href={topic.link}>
                  Explore →
                </CardLink>
              </Card>
            ))}
          </Grid>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Getting Started</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <p>
            System design is a crucial skill for software engineers. It involves designing scalable,
            reliable, and efficient systems that can handle large amounts of data and traffic.
          </p>
          <p>
            For frontend developers, system design includes:
          </p>
          <ul>
            <li>Component architecture and composition</li>
            <li>State management and data flow</li>
            <li>Performance optimization and code splitting</li>
            <li>Micro frontend architecture</li>
            <li>Build system and deployment strategies</li>
            <li>Browser caching and service workers</li>
            <li>Progressive enhancement and accessibility</li>
          </ul>
          <p>
            For backend developers, system design covers:
          </p>
          <ul>
            <li>API design and versioning</li>
            <li>Database design and optimization</li>
            <li>Scalability and load balancing</li>
            <li>Caching and performance</li>
            <li>Security and authentication</li>
            <li>Monitoring and logging</li>
            <li>Deployment and DevOps</li>
          </ul>
          <p>
            This section will guide you through the fundamentals of system design, common patterns,
            and real-world case studies. You'll also get hands-on practice with system design problems.
          </p>
          <p>
            Start with the prerequisites if you're new to system design, or dive directly into the
            topics if you're already familiar with the basics.
          </p>
        </SectionContent>
      </Section>
    </Layout>
  );
} 