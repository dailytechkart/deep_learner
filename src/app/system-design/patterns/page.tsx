'use client';

import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.h1};
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.body};
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-family: ${props => props.theme.fonts.body};
`;

const Content = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.md};
  line-height: 1.6;

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  ul {
    margin-bottom: ${props => props.theme.spacing.md};
    padding-left: ${props => props.theme.spacing.xl};
  }

  li {
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  h3 {
    font-size: ${props => props.theme.typography.h3};
    color: ${props => props.theme.colors.text};
    margin: ${props => props.theme.spacing.lg} 0 ${props => props.theme.spacing.md};
  }
`;

const patterns = [
  {
    title: 'Monolithic Architecture',
    content: `
      <p>A monolithic architecture is a traditional unified model for the design of a software program. Monolithic means composed all in one piece.</p>
      <h3>Characteristics:</h3>
      <ul>
        <li>Single codebase</li>
        <li>All components are tightly coupled</li>
        <li>Deployed as a single unit</li>
        <li>Shared memory space</li>
      </ul>
      <h3>Pros:</h3>
      <ul>
        <li>Simple to develop and deploy</li>
        <li>Easy to test and debug</li>
        <li>Better performance for small applications</li>
      </ul>
      <h3>Cons:</h3>
      <ul>
        <li>Difficult to scale</li>
        <li>Hard to maintain as the application grows</li>
        <li>Single point of failure</li>
      </ul>
    `
  },
  {
    title: 'Microservices Architecture',
    content: `
      <p>Microservices architecture is a method of developing software applications as a suite of independently deployable, small, modular services.</p>
      <h3>Characteristics:</h3>
      <ul>
        <li>Loosely coupled services</li>
        <li>Independent deployment</li>
        <li>Service-specific databases</li>
        <li>Inter-service communication</li>
      </ul>
      <h3>Pros:</h3>
      <ul>
        <li>Better scalability</li>
        <li>Easier maintenance</li>
        <li>Technology diversity</li>
        <li>Fault isolation</li>
      </ul>
      <h3>Cons:</h3>
      <ul>
        <li>Increased complexity</li>
        <li>Network latency</li>
        <li>Distributed system challenges</li>
      </ul>
    `
  },
  {
    title: 'Event-Driven Architecture',
    content: `
      <p>Event-driven architecture is a software architecture pattern promoting the production, detection, consumption of, and reaction to events.</p>
      <h3>Characteristics:</h3>
      <ul>
        <li>Event producers and consumers</li>
        <li>Event channels</li>
        <li>Asynchronous processing</li>
        <li>Loose coupling</li>
      </ul>
      <h3>Pros:</h3>
      <ul>
        <li>High scalability</li>
        <li>Real-time processing</li>
        <li>Loose coupling</li>
        <li>Better responsiveness</li>
      </ul>
      <h3>Cons:</h3>
      <ul>
        <li>Complex debugging</li>
        <li>Event ordering challenges</li>
        <li>Message loss handling</li>
      </ul>
    `
  }
];

export default function ArchitecturePatternsPage() {
  return (
    <PageContainer>
      <Title>Architecture Patterns</Title>
      <p>Explore common system architecture patterns and their use cases.</p>
      
      {patterns.map((pattern, index) => (
        <Section key={index}>
          <SectionTitle>{pattern.title}</SectionTitle>
          <Content dangerouslySetInnerHTML={{ __html: pattern.content }} />
        </Section>
      ))}
    </PageContainer>
  );
} 