import React, { memo, Suspense } from 'react';
import styled from 'styled-components';
import { FilterSection } from '@/types/problem';

const FilterSidebar = React.lazy(() =>
  import('@/components/FilterSidebar').then(mod => ({ default: mod.FilterSidebar }))
);

const MainContent = styled.main`
  width: 100%;
  display: flex;
  gap: 2rem;
  position: relative;
  overflow-x: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 320px;
    width: 1px;
    height: 100%;
    background: ${props => props.theme.colors.border};
  }

  @media (max-width: 1024px) {
    gap: 1.5rem;
    &::after {
      left: 280px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    &::after {
      display: none;
    }
  }
`;

const ProblemsSection = styled.div`
  flex: 1;
  padding-left: 2rem;
  min-width: 0;

  @media (max-width: 1024px) {
    padding-left: 1.5rem;
  }

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const LoadingFallback = styled.div`
  width: 280px;
  height: 100%;
  background: ${props => props.theme.colors.background};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
`;

interface InterviewLayoutProps {
  children: React.ReactNode;
  filterSections: FilterSection[];
  onClearAllFilters: () => void;
}

const InterviewLayout: React.FC<InterviewLayoutProps> = memo(
  ({ children, filterSections, onClearAllFilters }) => {
    return (
      <MainContent>
        <Suspense fallback={<LoadingFallback>Loading filters...</LoadingFallback>}>
          <FilterSidebar sections={filterSections} onClearAll={onClearAllFilters} />
        </Suspense>
        <ProblemsSection>{children}</ProblemsSection>
      </MainContent>
    );
  }
);

InterviewLayout.displayName = 'InterviewLayout';

export { InterviewLayout };
