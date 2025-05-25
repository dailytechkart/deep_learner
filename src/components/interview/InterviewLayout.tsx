import React, { memo } from 'react';
import styled from 'styled-components';
import { SortOption } from './InterviewSort';
import { InterviewControls } from './InterviewControls';

const LayoutContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  position: relative;
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  width: 280px;
  flex-shrink: 0;
  background: ${props => props.theme.colors.background};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  height: calc(100vh - 200px);
  position: sticky;
  top: 80px;
  overflow-y: auto;

  @media (max-width: 768px) {
    display: ${props => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    border-right: none;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

const FilterCheckbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const FilterCount = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  opacity: 0.7;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  padding: 0;
  margin-top: 1rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const CloseButton = styled.button`
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;

  @media (max-width: 768px) {
    display: block;
  }

  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

interface FilterSectionType {
  title: string;
  options: { id: string; label: string; count: number }[];
  selected: string[];
  onSelect: (value: string) => void;
}

interface InterviewLayoutProps {
  filterSections: FilterSectionType[];
  onClearAllFilters: () => void;
  children: React.ReactNode;
  isSidebarOpen?: boolean;
  onCloseSidebar?: () => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const InterviewLayout: React.FC<InterviewLayoutProps> = memo(({
  filterSections,
  onClearAllFilters,
  children,
  isSidebarOpen = true,
  onCloseSidebar,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <LayoutContainer>
      <Sidebar isOpen={isSidebarOpen}>
        {onCloseSidebar && <CloseButton onClick={onCloseSidebar}>×</CloseButton>}
        {filterSections.map((section, index) => (
          <FilterSection key={index}>
            <FilterTitle>{section.title}</FilterTitle>
            <FilterOptions>
              {section.options.map(option => (
                <FilterOption key={option.id}>
                  <FilterCheckbox
                    type="checkbox"
                    checked={section.selected.includes(option.id)}
                    onChange={() => section.onSelect(option.id)}
                  />
                  {option.label}
                  <FilterCount>({option.count})</FilterCount>
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterSection>
        ))}
        <ClearButton onClick={onClearAllFilters}>Clear all filters</ClearButton>
      </Sidebar>
      <MainContent>
        <InterviewControls
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
        />
        {children}
      </MainContent>
    </LayoutContainer>
  );
});

InterviewLayout.displayName = 'InterviewLayout';
