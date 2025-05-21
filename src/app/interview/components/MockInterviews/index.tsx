'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const MockInterviewsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InterviewCard = styled.div`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.lg};
`;

const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs};
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text};

  &::before {
    content: '✓';
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.typography.fontWeight.bold};
  }
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  text-decoration: none;
  transition: all 0.2s ease;
  margin-top: auto;

  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const mockInterviews = [
  {
    id: 'technical',
    title: 'Technical Mock Interview',
    description: 'Practice coding and system design questions with experienced interviewers.',
    icon: '💻',
    features: [
      '45-minute coding session',
      '15-minute system design discussion',
      'Detailed feedback and suggestions',
      'Real-time coding environment',
      'Video recording available',
    ],
    href: '/interview/mock/technical',
  },
  {
    id: 'behavioral',
    title: 'Behavioral Mock Interview',
    description: 'Master behavioral questions and improve your communication skills.',
    icon: '🤝',
    features: [
      '60-minute behavioral session',
      'STAR method practice',
      'Leadership & teamwork scenarios',
      'Personalized feedback',
      'Follow-up resources',
    ],
    href: '/interview/mock/behavioral',
  },
];

export const MockInterviews: React.FC = () => {
  return (
    <MockInterviewsContainer>
      {mockInterviews.map(interview => (
        <InterviewCard key={interview.id}>
          <CardHeader>
            <IconContainer>{interview.icon}</IconContainer>
            <HeaderContent>
              <Title>{interview.title}</Title>
              <Description>{interview.description}</Description>
            </HeaderContent>
          </CardHeader>

          <FeaturesList>
            {interview.features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>

          <ActionButton href={interview.href}>Schedule Interview</ActionButton>
        </InterviewCard>
      ))}
    </MockInterviewsContainer>
  );
};
