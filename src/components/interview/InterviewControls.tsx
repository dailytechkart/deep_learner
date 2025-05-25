import React, { memo } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { InterviewSort, SortOption } from './InterviewSort';

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;

  @media (max-width: 640px) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  font-size: ${props => props.theme.typography.fontSize.sm};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
  pointer-events: none;
`;

interface InterviewControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const InterviewControls: React.FC<InterviewControlsProps> = memo(({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <ControlsContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search problems..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <SearchIcon />
      </SearchContainer>
      <InterviewSort sortBy={sortBy} onSortChange={onSortChange} />
    </ControlsContainer>
  );
});

InterviewControls.displayName = 'InterviewControls'; 