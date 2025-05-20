'use client';

import React from 'react';
import styled from 'styled-components';
import { Layout, Section, SectionHeader, SectionTitle, SectionContent, Grid } from '../../components/Layout';
import Link from 'next/link';
import {
  PageContainer,
  MainContent,
  Title,
  Description,
  Content
} from '../../components/StyledComponents';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';

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
    <>
      <SEO
        title="System Design Patterns"
        description="Learn about common system design patterns and architectural solutions. Understand how to apply these patterns to build scalable and maintainable systems."
        keywords={[
          'system design',
          'design patterns',
          'architecture patterns',
          'scalability patterns',
          'distributed systems',
          'microservices',
          'event-driven architecture'
        ]}
      />
      <PageContainer>
        <MainContent>
          <Breadcrumbs
            items={[
              { label: 'System Design', href: '/system-design' },
              { label: 'Patterns' }
            ]}
          />
          <Title>System Design Patterns</Title>
          <Description>
            Learn about common system design patterns and architectural solutions. Understand
            how to apply these patterns to build scalable and maintainable systems.
          </Description>

          <Section>
            <SectionTitle>Microservices Architecture</SectionTitle>
            <Content>
              <p>
                Breaking down applications into small, independent services that communicate
                through APIs. Benefits include:
              </p>
              <ul>
                <li>Independent deployment and scaling</li>
                <li>Technology diversity</li>
                <li>Fault isolation</li>
                <li>Team autonomy</li>
              </ul>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Event-Driven Architecture</SectionTitle>
            <Content>
              <p>
                Using events to trigger and communicate between decoupled services. Key components:
              </p>
              <ul>
                <li>Event producers and consumers</li>
                <li>Message brokers</li>
                <li>Event stores</li>
                <li>Event processing patterns</li>
              </ul>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Circuit Breaker Pattern</SectionTitle>
            <Content>
              <p>
                Preventing cascading failures in distributed systems by monitoring for failures
                and stopping the flow of requests when necessary.
              </p>
              <h3>States</h3>
              <ul>
                <li>Closed (normal operation)</li>
                <li>Open (failing fast)</li>
                <li>Half-open (testing recovery)</li>
              </ul>
            </Content>
          </Section>

          <Section>
            <SectionTitle>CQRS Pattern</SectionTitle>
            <Content>
              <p>
                Command Query Responsibility Segregation separates read and write operations
                for better scalability and performance.
              </p>
              <h3>Components</h3>
              <ul>
                <li>Command model (write operations)</li>
                <li>Query model (read operations)</li>
                <li>Event sourcing</li>
                <li>Materialized views</li>
              </ul>
            </Content>
          </Section>

          <Section>
            <SectionTitle>Load Balancing Patterns</SectionTitle>
            <Content>
              <p>
                Distributing incoming network traffic across multiple servers to ensure
                reliability and performance.
              </p>
              <h3>Strategies</h3>
              <ul>
                <li>Round-robin</li>
                <li>Least connections</li>
                <li>IP hash</li>
                <li>Weighted distribution</li>
              </ul>
            </Content>
          </Section>
        </MainContent>
      </PageContainer>
    </>
  );
} 