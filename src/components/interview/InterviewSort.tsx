import React, { memo } from 'react';
import styled from 'styled-components';
import { FaSort } from 'react-icons/fa';

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
`;

const SortLabel = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  white-space: nowrap;
`;

const SortSelect = styled.select`
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  font-size: ${props => props.theme.typography.fontSize.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 160px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export type SortOption = 'most-asked' | 'difficulty' | 'recent' | 'alphabetical';

interface InterviewSortProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const InterviewSort: React.FC<InterviewSortProps> = memo(({ sortBy, onSortChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortOption);
  };

  return (
    <SortContainer>
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
    </SortContainer>
  );
});

InterviewSort.displayName = 'InterviewSort'; 