'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.h1};
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.heading};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.h2};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.fontSize.md};
    margin-bottom: ${props => props.theme.spacing.lg};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.lg};
    margin-top: ${props => props.theme.spacing.lg};
  }
`;

const Card = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  transition: box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.lg};
  }
`;

const CardTitle = styled.h2`
  font-size: ${props => props.theme.typography.h3};
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.heading};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.h4};
  }
`;

const CardDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.md};
  flex-grow: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

const CardLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-top: auto;
  padding: ${props => props.theme.spacing.sm} 0;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

const topics = [
  {
    title: 'Basic Concepts',
    description: 'Learn fundamental system design principles and terminology.',
    href: '/system-design/basics'
  },
  {
    title: 'Architecture Patterns',
    description: 'Explore common system architecture patterns and their use cases.',
    href: '/system-design/patterns'
  },
  {
    title: 'Scalability',
    description: 'Design scalable and performant systems that can handle growth.',
    href: '/system-design/scalability'
  },
  {
    title: 'Case Studies',
    description: 'Real-world system design examples and their implementations.',
    href: '/system-design/case-studies'
  }
];

export default function SystemDesignPage() {
  return (
    <PageContainer>
      <Title>System Design Practice</Title>
      <Description>Master the art of designing scalable and efficient systems.</Description>
      
      <Grid>
        {topics.map((topic) => (
          <Card key={topic.href}>
            <CardTitle>{topic.title}</CardTitle>
            <CardDescription>{topic.description}</CardDescription>
            <CardLink href={topic.href}>
              Learn More →
            </CardLink>
          </Card>
        ))}
      </Grid>
    </PageContainer>
  );
} 