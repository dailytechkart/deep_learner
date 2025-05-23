import React from 'react';
import styled from 'styled-components';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { Topic, Difficulty, Company, Tag } from '@/types/problem';
import { Badge } from './Badge';

type FilterValue = Topic | Difficulty | Company | Tag;

interface FilterOption {
  id: FilterValue;
  label: FilterValue;
  count: number;
}

interface FilterSection {
  title: string;
  options: FilterOption[];
  selected: FilterValue[];
  onSelect: (value: FilterValue) => void;
}

interface FilterSidebarProps {
  sections: FilterSection[];
  onClearAll: () => void;
}

const SidebarContainer = styled.aside`
  width: 280px;
  background: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  height: 100%;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.75rem;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterCount = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: 0.25rem;
`;

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ sections, onClearAll }) => {
  return (
    <SidebarContainer>
      <Header>
        <Title>
          <FaFilter />
          Filters
        </Title>
        <ClearButton onClick={onClearAll}>
          <FaTimes />
          Clear All
        </ClearButton>
      </Header>
      {sections.map(section => (
        <FilterSection key={section.title}>
          <SectionTitle>{section.title}</SectionTitle>
          <FilterOptions>
            {section.options.map(option => (
              <Badge
                key={option.id}
                variant="primary"
                size="sm"
                isSelected={section.selected.includes(option.id)}
                onClick={() => section.onSelect(option.id)}
              >
                {option.label}
                <FilterCount>{option.count}</FilterCount>
              </Badge>
            ))}
          </FilterOptions>
        </FilterSection>
      ))}
    </SidebarContainer>
  );
};

export type { FilterValue, FilterOption, FilterSection };
