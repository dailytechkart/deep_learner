'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${props => props.theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ResourceCard = styled(Link)`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const ResourceIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 24px;
`;

const ResourceTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ResourceDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
`;

const ResourceMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-top: auto;
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const ResourceTag = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.primary};
  background: ${props => props.theme.colors.primary}10;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
`;

const resources = [
  {
    id: 'coding-interview',
    title: 'Coding Interview Guide',
    description:
      'Comprehensive guide covering data structures, algorithms, and problem-solving strategies.',
    icon: '💻',
    tags: ['Algorithms', 'Data Structures', 'Problem Solving'],
    href: '/interview/guides/coding',
  },
  {
    id: 'system-design',
    title: 'System Design Guide',
    description:
      'Learn how to design scalable systems and handle technical discussions effectively.',
    icon: '🏗️',
    tags: ['Architecture', 'Scalability', 'Design Patterns'],
    href: '/interview/guides/system-design',
  },
  {
    id: 'behavioral',
    title: 'Behavioral Interview Guide',
    description:
      'Master behavioral questions and learn how to showcase your experience effectively.',
    icon: '🤝',
    tags: ['Communication', 'Leadership', 'Experience'],
    href: '/interview/guides/behavioral',
  },
  {
    id: 'resume',
    title: 'Resume & Portfolio Guide',
    description: 'Learn how to create an impressive resume and portfolio that stands out.',
    icon: '📄',
    tags: ['Resume', 'Portfolio', 'Career'],
    href: '/interview/guides/resume',
  },
  {
    id: 'negotiation',
    title: 'Salary Negotiation Guide',
    description: 'Tips and strategies for negotiating your compensation package effectively.',
    icon: '💰',
    tags: ['Salary', 'Benefits', 'Negotiation'],
    href: '/interview/guides/negotiation',
  },
  {
    id: 'company-research',
    title: 'Company Research Guide',
    description: 'Learn how to research companies and prepare for company-specific interviews.',
    icon: '🔍',
    tags: ['Research', 'Company Culture', 'Preparation'],
    href: '/interview/guides/company-research',
  },
];

export const InterviewPrep: React.FC = () => {
  return (
    <ResourcesGrid>
      {resources.map(resource => (
        <ResourceCard key={resource.id} href={resource.href}>
          <ResourceIcon>{resource.icon}</ResourceIcon>
          <ResourceTitle>{resource.title}</ResourceTitle>
          <ResourceDescription>{resource.description}</ResourceDescription>
          <ResourceMeta>
            {resource.tags.map(tag => (
              <ResourceTag key={tag}>{tag}</ResourceTag>
            ))}
          </ResourceMeta>
        </ResourceCard>
      ))}
    </ResourcesGrid>
  );
};
