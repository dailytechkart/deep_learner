import { ProblemFilters as FilterType, Topic, Difficulty, Company, Tag } from '@/types/problem';
import styled from 'styled-components';

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

const FilterSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
  padding: 0.5rem;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
`;

const FilterSectionTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.25rem 0;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Checkbox = styled.input`
  width: 14px;
  height: 14px;
  margin: 0;
  cursor: pointer;
  accent-color: ${props => props.theme.colors.primary};
`;

export default function ProblemFilters({
  filters,
  selectedFilters,
  onFilterChange,
}: ProblemFiltersProps) {
  const renderFilterSection = (
    title: string,
    filterType: keyof FilterType,
    options: string[],
    selectedOptions: string[]
  ) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            onClick={() => onFilterChange(filterType, option)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedOptions.includes(option)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {renderFilterSection('Topics', 'topics', filters.topics, selectedFilters.topics)}
      {renderFilterSection(
        'Difficulty',
        'difficulty',
        filters.difficulty,
        selectedFilters.difficulty
      )}
      {renderFilterSection('Companies', 'companies', filters.companies, selectedFilters.companies)}
      {renderFilterSection('Tags', 'tags', filters.tags, selectedFilters.tags)}
    </div>
  );
}
