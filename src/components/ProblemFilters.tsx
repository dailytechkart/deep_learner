import { ProblemFilters as FilterType, Topic, Difficulty, Company, Tag } from '@/types/problem';
import styled from 'styled-components';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsEvent } from '@/utils/analytics';

interface ProblemFiltersProps {
  filters: FilterType;
  selectedFilters: {
    topics: Topic[];
    difficulty: Difficulty[];
    companies: Company[];
    tags: Tag[];
  };
  onFilterChange: (filterType: keyof FilterType, value: string) => void;
}

const FiltersContainer = styled.div`
  padding: 1rem;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: 0.75rem;
  color: ${props => props.theme.colors.text};
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button<{ isSelected: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;

  ${props =>
    props.isSelected
      ? `
    background: ${props.theme.colors.primary};
    color: ${props.theme.colors.background};
  `
      : `
    background: ${props.theme.colors.border};
    color: ${props.theme.colors.textSecondary};
    
    &:hover {
      background: ${props.theme.colors.backgroundHover};
    }
  `}
`;

export default function ProblemFilters({
  filters,
  selectedFilters,
  onFilterChange,
}: ProblemFiltersProps) {
  const { trackEvent } = useAnalytics();

  const handleFilterChange = (filterType: keyof FilterType, value: string) => {
    const analyticsFilterType = {
      topics: 'topic',
      difficulty: 'difficulty',
      companies: 'company',
      tags: 'tag',
    }[filterType] as 'difficulty' | 'topic' | 'company' | 'tag' | 'status';

    trackEvent(AnalyticsEvent.SEARCH, {
      action: 'problem_filter',
      location: 'problem_list',
      filter: {
        type: analyticsFilterType,
        value,
      },
      timestamp: new Date().toISOString(),
    });

    onFilterChange(filterType, value);
  };

  const renderFilterSection = (
    title: string,
    filterType: keyof FilterType,
    options: string[],
    selectedOptions: string[]
  ) => (
    <FilterSection>
      <SectionTitle>{title}</SectionTitle>
      <FilterOptions>
        {options.map(option => (
          <FilterButton
            key={option}
            onClick={() => handleFilterChange(filterType, option)}
            isSelected={selectedOptions.includes(option)}
          >
            {option}
          </FilterButton>
        ))}
      </FilterOptions>
    </FilterSection>
  );

  return (
    <FiltersContainer>
      {renderFilterSection('Topics', 'topics', filters.topics, selectedFilters.topics)}
      {renderFilterSection(
        'Difficulty',
        'difficulty',
        filters.difficulty,
        selectedFilters.difficulty
      )}
      {renderFilterSection('Companies', 'companies', filters.companies, selectedFilters.companies)}
      {renderFilterSection('Tags', 'tags', filters.tags, selectedFilters.tags)}
    </FiltersContainer>
  );
}
