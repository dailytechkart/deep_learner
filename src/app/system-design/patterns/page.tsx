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

const Badge = styled.span`
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.textSecondary};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: ${props => props.theme.spacing.md};
  display: inline-block;
`;

export default function SystemDesignPatternsPage() {
  const patterns = [
    {
      title: 'Component Architecture',
      description: 'Design reusable, maintainable, and scalable component hierarchies for modern web applications.',
      category: 'Frontend',
      link: '/system-design/patterns/component-architecture'
    },
    {
      title: 'State Management',
      description: 'Implement efficient state management patterns for complex frontend applications.',
      category: 'Frontend',
      link: '/system-design/patterns/state-management'
    },
    {
      title: 'Micro Frontends',
      description: 'Break down frontend monoliths into smaller, independently deployable applications.',
      category: 'Frontend',
      link: '/system-design/patterns/micro-frontends'
    },
    {
      title: 'Load Balancer Pattern',
      description: 'Distribute incoming network traffic across multiple servers to ensure high availability and reliability.',
      category: 'Backend',
      link: '/system-design/patterns/load-balancer'
    },
    {
      title: 'Caching Pattern',
      description: 'Store frequently accessed data in memory to improve response time and reduce database load.',
      category: 'Backend',
      link: '/system-design/patterns/caching'
    },
    {
      title: 'Circuit Breaker Pattern',
      description: 'Prevent cascading failures by detecting and handling faults in distributed systems.',
      category: 'Backend',
      link: '/system-design/patterns/circuit-breaker'
    },
    {
      title: 'Event-Driven Architecture',
      description: 'Design systems that communicate through events, enabling loose coupling and scalability.',
      category: 'Architecture',
      link: '/system-design/patterns/event-driven'
    },
    {
      title: 'Microservices Pattern',
      description: 'Break down applications into small, independent services that can be developed and deployed separately.',
      category: 'Architecture',
      link: '/system-design/patterns/microservices'
    },
    {
      title: 'Database Sharding',
      description: 'Split a database into smaller, more manageable pieces to improve performance and scalability.',
      category: 'Backend',
      link: '/system-design/patterns/sharding'
    }
  ];

  return (
    <Layout
      title="System Design Patterns"
      description="Explore common system design patterns and learn how to apply them to build scalable, reliable, and efficient systems."
    >
      <Section>
        <SectionHeader>
          <SectionTitle>Frontend Patterns</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <Grid>
            {patterns
              .filter(pattern => pattern.category === 'Frontend')
              .map((pattern, index) => (
                <Card key={index}>
                  <Badge>{pattern.category}</Badge>
                  <CardTitle>{pattern.title}</CardTitle>
                  <CardDescription>{pattern.description}</CardDescription>
                  <CardLink href={pattern.link}>
                    Learn More →
                  </CardLink>
                </Card>
              ))}
          </Grid>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Backend Patterns</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <Grid>
            {patterns
              .filter(pattern => pattern.category === 'Backend')
              .map((pattern, index) => (
                <Card key={index}>
                  <Badge>{pattern.category}</Badge>
                  <CardTitle>{pattern.title}</CardTitle>
                  <CardDescription>{pattern.description}</CardDescription>
                  <CardLink href={pattern.link}>
                    Learn More →
                  </CardLink>
                </Card>
              ))}
          </Grid>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>Architecture Patterns</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <Grid>
            {patterns
              .filter(pattern => pattern.category === 'Architecture')
              .map((pattern, index) => (
                <Card key={index}>
                  <Badge>{pattern.category}</Badge>
                  <CardTitle>{pattern.title}</CardTitle>
                  <CardDescription>{pattern.description}</CardDescription>
                  <CardLink href={pattern.link}>
                    Learn More →
                  </CardLink>
                </Card>
              ))}
          </Grid>
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>About Design Patterns</SectionTitle>
        </SectionHeader>
        <SectionContent>
          <p>
            System design patterns are reusable solutions to common problems in software architecture.
            They help you build systems that are scalable, reliable, and maintainable.
          </p>
          <p>
            Frontend patterns focus on:
          </p>
          <ul>
            <li>Component architecture and composition</li>
            <li>State management and data flow</li>
            <li>Performance optimization</li>
            <li>Code splitting and lazy loading</li>
            <li>Micro frontend architecture</li>
          </ul>
          <p>
            Backend patterns address:
          </p>
          <ul>
            <li>Scalability and load balancing</li>
            <li>Caching and performance</li>
            <li>Fault tolerance and reliability</li>
            <li>Database design and optimization</li>
            <li>Service communication</li>
          </ul>
          <p>
            Architecture patterns provide high-level solutions for:
          </p>
          <ul>
            <li>System decomposition</li>
            <li>Service boundaries</li>
            <li>Event-driven communication</li>
            <li>Distributed systems</li>
            <li>Cross-cutting concerns</li>
          </ul>
          <p>
            Explore the patterns above to learn more about their use cases, implementation details,
            and best practices. Each pattern includes real-world examples and practical guidance
            for implementation.
          </p>
        </SectionContent>
      </Section>
    </Layout>
  );
} 