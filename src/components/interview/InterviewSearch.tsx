import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import { FaSearch, FaSort } from 'react-icons/fa';

const SearchAndSortContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  background: ${props => props.theme.colors.backgroundAlt};
  padding: 0.75rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.full};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
  position: relative;
  min-width: 200px;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:focus-within {
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: ${props => props.theme.typography.fontSize.base};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
  pointer-events: none;
`;

const SortSelect = styled.select`
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  font-size: ${props => props.theme.typography.fontSize.base};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 180px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.25rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SortLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  margin-right: 0.5rem;
  white-space: nowrap;
`;

type SortOption = 'most-asked' | 'difficulty' | 'recent' | 'alphabetical';

interface InterviewSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const InterviewSearch: React.FC<InterviewSearchProps> = memo(
  ({ searchQuery, onSearchChange, sortBy, onSortChange }) => {
    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value),
      [onSearchChange]
    );

    const handleSortChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value as SortOption),
      [onSortChange]
    );

    return (
      <SearchAndSortContainer>
        <SearchWrapper>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </SearchWrapper>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SortLabel>
            <FaSort />
            Sort by:
          </SortLabel>
          <SortSelect value={sortBy} onChange={handleSortChange}>
            <option value="most-asked">Most Asked</option>
            <option value="difficulty">Difficulty</option>
            <option value="recent">Recently Added</option>
            <option value="alphabetical">Alphabetical</option>
          </SortSelect>
        </div>
      </SearchAndSortContainer>
    );
  }
);

InterviewSearch.displayName = 'InterviewSearch';

export { InterviewSearch };
