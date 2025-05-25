import React, { memo, Suspense, useState } from 'react';
import styled from 'styled-components';
import { Problem } from '@/types/problem';
import { PROBLEMS_ANALYTICS } from '@/analytics/constants/problems';

const ProblemsTable = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 100px 120px;
  padding: 0.75rem 1rem;
  background: ${props => props.theme.colors.backgroundAlt};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const TableRow = styled.div<{ isEven?: boolean }>`
  display: grid;
  grid-template-columns: 80px 1fr 100px 120px;
  padding: 0.75rem 1rem;
  background: ${props => (props.isEven ? props.theme.colors.backgroundAlt : 'transparent')};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  align-items: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundHover};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: 500;
  background: ${props => {
    switch (props.difficulty.toLowerCase()) {
      case 'easy':
        return props.theme.colors.success + '20';
      case 'medium':
        return props.theme.colors.warning + '20';
      case 'hard':
        return props.theme.colors.error + '20';
      default:
        return props.theme.colors.backgroundAlt;
    }
  }};
  color: ${props => {
    switch (props.difficulty.toLowerCase()) {
      case 'easy':
        return props.theme.colors.success;
      case 'medium':
        return props.theme.colors.warning;
      case 'hard':
        return props.theme.colors.error;
      default:
        return props.theme.colors.textSecondary;
    }
  }};
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case PROBLEMS_ANALYTICS.STATUS.SOLVED:
        return props.theme.colors.success + '20';
      case PROBLEMS_ANALYTICS.STATUS.ATTEMPTED:
        return props.theme.colors.warning + '20';
      case PROBLEMS_ANALYTICS.STATUS.BOOKMARKED:
        return props.theme.colors.info + '20';
      default:
        return props.theme.colors.backgroundAlt;
    }
  }};
  color: ${props => {
    switch (props.status) {
      case PROBLEMS_ANALYTICS.STATUS.SOLVED:
        return props.theme.colors.success;
      case PROBLEMS_ANALYTICS.STATUS.ATTEMPTED:
        return props.theme.colors.warning;
      case PROBLEMS_ANALYTICS.STATUS.BOOKMARKED:
        return props.theme.colors.info;
      default:
        return props.theme.colors.textSecondary;
    }
  }};
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.lg};
`;

interface InterviewProblemsListProps {
  problems: Problem[];
}

const InterviewProblemsList: React.FC<InterviewProblemsListProps> = memo(({ problems }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProblems = problems.filter(
    problem =>
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (problems.length === 0) {
    return <NoResults>No problems found matching your criteria.</NoResults>;
  }

  return (
    <>
      <ProblemsTable>
        <TableHeader>
          <div>#</div>
          <div>Title</div>
          <div>Difficulty</div>
          <div>Status</div>
        </TableHeader>
        {filteredProblems.map((problem, index) => (
          <TableRow key={problem.id} isEven={index % 2 === 0}>
            <div>{problem.id}</div>
            <div>{problem.title}</div>
            <DifficultyBadge difficulty={problem.difficulty}>{problem.difficulty}</DifficultyBadge>
            <StatusBadge status={PROBLEMS_ANALYTICS.STATUS.NOT_STARTED}>Not Started</StatusBadge>
          </TableRow>
        ))}
      </ProblemsTable>
    </>
  );
});

InterviewProblemsList.displayName = 'InterviewProblemsList';

export { InterviewProblemsList };
