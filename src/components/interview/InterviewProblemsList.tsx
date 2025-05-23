import React, { memo, Suspense } from 'react';
import styled from 'styled-components';
import { Problem } from '@/types/problem';

const ProblemCard = React.lazy(() => import('@/components/ProblemCard'));

const ProblemsGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  align-content: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.lg};
`;

const CardSkeleton = styled.div`
  height: 200px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

interface InterviewProblemsListProps {
  problems: Problem[];
}

const InterviewProblemsList: React.FC<InterviewProblemsListProps> = memo(({ problems }) => {
  if (problems.length === 0) {
    return <NoResults>No problems found matching your criteria.</NoResults>;
  }

  return (
    <ProblemsGrid>
      {problems.map(problem => (
        <Suspense key={problem.id} fallback={<CardSkeleton />}>
          <ProblemCard problem={problem} />
        </Suspense>
      ))}
    </ProblemsGrid>
  );
});

InterviewProblemsList.displayName = 'InterviewProblemsList';

export { InterviewProblemsList };
