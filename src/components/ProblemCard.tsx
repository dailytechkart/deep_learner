import { Problem } from '@/types/problem';
import Link from 'next/link';
import styled from 'styled-components';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsEvent } from '@/utils/analytics';
import type { ProblemsAnalyticsEvent } from '@/utils/analytics';

interface ProblemCardProps {
  problem: Problem;
}

const difficultyColors = {
  Easy: { bg: '#dcfce7', text: '#166534' },
  Medium: { bg: '#fef9c3', text: '#854d0e' },
  Hard: { bg: '#fee2e2', text: '#991b1b' },
} as const;

const Card = styled.div`
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  background: ${props => props.theme.colors.background};
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`;

const DifficultyBadge = styled.span<{ difficulty: keyof typeof difficultyColors }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props => difficultyColors[props.difficulty].bg};
  color: ${props => difficultyColors[props.difficulty].text};
`;

const Description = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.75rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span<{ variant?: 'topic' | 'company' | 'default' }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  background: ${props => {
    switch (props.variant) {
      case 'topic':
        return props.theme.colors.primary + '10';
      case 'company':
        return props.theme.colors.secondary + '10';
      default:
        return props.theme.colors.border;
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'topic':
        return props.theme.colors.primary;
      case 'company':
        return props.theme.colors.secondary;
      default:
        return props.theme.colors.textSecondary;
    }
  }};
`;

export default function ProblemCard({ problem }: ProblemCardProps) {
  const { trackEvent } = useAnalytics();

  const handleProblemClick = () => {
    const eventProperties: ProblemsAnalyticsEvent = {
      action: 'problem_view',
      location: 'problem_list',
      problemId: problem.id,
      problemTitle: problem.title,
      difficulty: problem.difficulty as 'Easy' | 'Medium' | 'Hard',
      topic: problem.topic,
      tags: problem.tags,
      companies: problem.companies,
      timestamp: new Date().toISOString(),
    };
    trackEvent(AnalyticsEvent.COURSE_VIEW, eventProperties);
  };

  const cardContent = (
    <Card onClick={handleProblemClick}>
      <CardHeader>
        <Title>{problem.title}</Title>
        <DifficultyBadge difficulty={problem.difficulty}>{problem.difficulty}</DifficultyBadge>
      </CardHeader>
      <Description>{problem.description}</Description>
      <TagsContainer>
        <Tag variant="topic">{problem.topic}</Tag>
        {problem.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagsContainer>
      <TagsContainer style={{ marginTop: '0.75rem' }}>
        {problem.companies.map(company => (
          <Tag key={company} variant="company">
            {company}
          </Tag>
        ))}
      </TagsContainer>
    </Card>
  );

  return problem.url ? <Link href={problem.url}>{cardContent}</Link> : cardContent;
}
