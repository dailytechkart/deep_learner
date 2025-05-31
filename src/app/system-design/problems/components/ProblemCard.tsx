import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Problem } from '../data/problems';
import { FaClock, FaBuilding } from 'react-icons/fa';
import { PremiumTag, DifficultyTag, TagsContainer as BadgeTagsContainer } from './shared/Tags';

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Title = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  line-height: 1.4;
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-top: auto;
`;

const Tag = styled.span`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.primary};
  background: ${props => props.theme.colors.primary}10;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
  padding-top: ${props => props.theme.spacing.md};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};

  svg {
    width: 14px;
    height: 14px;
  }
`;

interface ProblemCardProps {
  problem: Problem;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  return (
    <Card href={problem.link}>
      <CardHeader>
        <HeaderLeft>
          <Title>{problem.title}</Title>
          <BadgeTagsContainer>
            <DifficultyTag difficulty={problem.difficulty} />
            {problem.isPremium && <PremiumTag />}
          </BadgeTagsContainer>
        </HeaderLeft>
      </CardHeader>
      <Description>{problem.description}</Description>
      <TagsContainer>
        {problem.tags.slice(0, 3).map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {problem.tags.length > 3 && <Tag>+{problem.tags.length - 3} more</Tag>}
      </TagsContainer>
      <MetaContainer>
        <MetaItem>
          <FaClock />
          {problem.estimatedTime}
        </MetaItem>
        <MetaItem>
          <FaBuilding />
          {problem.companies.slice(0, 2).join(', ')}
          {problem.companies.length > 2 && ` +${problem.companies.length - 2}`}
        </MetaItem>
      </MetaContainer>
    </Card>
  );
};
