import React, { useState } from 'react';
import styled from 'styled-components';
import { Problem } from '../data/problems';
import { FaFilter, FaTimes, FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  height: fit-content;
  position: sticky;
  top: 88px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SearchInput = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.sm};

  input {
    width: 100%;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    padding-left: ${props => props.theme.spacing.xl};
    background: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.md};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.fontSize.sm};
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
    }

    &::placeholder {
      color: ${props => props.theme.colors.textSecondary};
    }
  }

  svg {
    position: absolute;
    left: ${props => props.theme.spacing.sm};
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.textSecondary};
    width: 14px;
    height: 14px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.xs} 0;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FilterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  svg {
    width: 12px;
    height: 12px;
  }
`;

const FilterCount = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-left: auto;
`;

const FilterOptions = styled.div<{ isExpanded: boolean }>`
  display: ${props => (props.isExpanded ? 'flex' : 'none')};
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
  padding-left: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.xs};
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme.colors.border} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.border};
    border-radius: 3px;
  }
`;

const FilterOption = styled.label<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  cursor: pointer;
  color: ${props =>
    props.isSelected ? props.theme.colors.primary : props.theme.colors.textSecondary};
  transition: all 0.2s ease;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  background: ${props => (props.isSelected ? `${props.theme.colors.primary}10` : 'transparent')};

  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => `${props.theme.colors.primary}10`};
  }

  input {
    margin: 0;
    width: 14px;
    height: 14px;
    accent-color: ${props => props.theme.colors.primary};
  }
`;

const OptionCount = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-left: auto;
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: ${props => props.theme.spacing.sm};

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    border-color: ${props => props.theme.colors.primary};
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const ActiveFilter = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primary}10;
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.xs};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary}20;
  }

  svg {
    width: 10px;
    height: 10px;
  }
`;

interface FiltersProps {
  problems: Problem[];
  selectedTopics: string[];
  selectedCompanies: string[];
  selectedDifficulties: string[];
  onTopicChange: (topic: string) => void;
  onCompanyChange: (company: string) => void;
  onDifficultyChange: (difficulty: string) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  problems,
  selectedTopics,
  selectedCompanies,
  selectedDifficulties,
  onTopicChange,
  onCompanyChange,
  onDifficultyChange,
}) => {
  const [expandedGroups, setExpandedGroups] = useState({
    topics: true,
    companies: true,
    difficulties: true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleGroup = (group: keyof typeof expandedGroups) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const clearAllFilters = () => {
    selectedTopics.forEach(onTopicChange);
    selectedCompanies.forEach(onCompanyChange);
    selectedDifficulties.forEach(onDifficultyChange);
  };

  const getUniqueTopics = () => {
    const topics = new Set<string>();
    problems.forEach(problem => {
      problem.tags.forEach(tag => topics.add(tag));
    });
    return Array.from(topics)
      .sort()
      .filter(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const getUniqueCompanies = () => {
    const companies = new Set<string>();
    problems.forEach(problem => {
      problem.companies.forEach(company => companies.add(company));
    });
    return Array.from(companies)
      .sort()
      .filter(company => company.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const getUniqueDifficulties = () => {
    const difficulties = new Set<string>();
    problems.forEach(problem => {
      difficulties.add(problem.difficulty);
    });
    return Array.from(difficulties)
      .sort()
      .filter(difficulty => difficulty.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const getFilterCount = (type: 'topics' | 'companies' | 'difficulties') => {
    switch (type) {
      case 'topics':
        return selectedTopics.length;
      case 'companies':
        return selectedCompanies.length;
      case 'difficulties':
        return selectedDifficulties.length;
      default:
        return 0;
    }
  };

  const renderActiveFilters = () => {
    const allFilters = [
      ...selectedTopics.map(topic => ({
        type: 'topic',
        value: topic,
        onRemove: () => onTopicChange(topic),
      })),
      ...selectedCompanies.map(company => ({
        type: 'company',
        value: company,
        onRemove: () => onCompanyChange(company),
      })),
      ...selectedDifficulties.map(difficulty => ({
        type: 'difficulty',
        value: difficulty,
        onRemove: () => onDifficultyChange(difficulty),
      })),
    ];

    if (allFilters.length === 0) return null;

    return (
      <ActiveFilters>
        {allFilters.map(filter => (
          <ActiveFilter key={`${filter.type}-${filter.value}`} onClick={filter.onRemove}>
            {filter.value}
            <FaTimes />
          </ActiveFilter>
        ))}
      </ActiveFilters>
    );
  };

  return (
    <FiltersContainer>
      <SearchInput>
        <FaSearch />
        <input
          type="text"
          placeholder="Search filters..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </SearchInput>

      {renderActiveFilters()}

      <FilterGroup>
        <FilterHeader onClick={() => toggleGroup('topics')}>
          <FilterTitle>
            <FaFilter />
            Topics
          </FilterTitle>
          {getFilterCount('topics') > 0 && <FilterCount>({getFilterCount('topics')})</FilterCount>}
          {expandedGroups.topics ? <FaChevronUp /> : <FaChevronDown />}
        </FilterHeader>
        <FilterOptions isExpanded={expandedGroups.topics}>
          {getUniqueTopics().map(topic => (
            <FilterOption key={topic} isSelected={selectedTopics.includes(topic)}>
              <input
                type="checkbox"
                checked={selectedTopics.includes(topic)}
                onChange={() => onTopicChange(topic)}
              />
              {topic}
              <OptionCount>({problems.filter(p => p.tags.includes(topic)).length})</OptionCount>
            </FilterOption>
          ))}
        </FilterOptions>
      </FilterGroup>

      <FilterGroup>
        <FilterHeader onClick={() => toggleGroup('companies')}>
          <FilterTitle>
            <FaFilter />
            Companies
          </FilterTitle>
          {getFilterCount('companies') > 0 && (
            <FilterCount>({getFilterCount('companies')})</FilterCount>
          )}
          {expandedGroups.companies ? <FaChevronUp /> : <FaChevronDown />}
        </FilterHeader>
        <FilterOptions isExpanded={expandedGroups.companies}>
          {getUniqueCompanies().map(company => (
            <FilterOption key={company} isSelected={selectedCompanies.includes(company)}>
              <input
                type="checkbox"
                checked={selectedCompanies.includes(company)}
                onChange={() => onCompanyChange(company)}
              />
              {company}
              <OptionCount>
                ({problems.filter(p => p.companies.includes(company)).length})
              </OptionCount>
            </FilterOption>
          ))}
        </FilterOptions>
      </FilterGroup>

      <FilterGroup>
        <FilterHeader onClick={() => toggleGroup('difficulties')}>
          <FilterTitle>
            <FaFilter />
            Difficulty
          </FilterTitle>
          {getFilterCount('difficulties') > 0 && (
            <FilterCount>({getFilterCount('difficulties')})</FilterCount>
          )}
          {expandedGroups.difficulties ? <FaChevronUp /> : <FaChevronDown />}
        </FilterHeader>
        <FilterOptions isExpanded={expandedGroups.difficulties}>
          {getUniqueDifficulties().map(difficulty => (
            <FilterOption key={difficulty} isSelected={selectedDifficulties.includes(difficulty)}>
              <input
                type="checkbox"
                checked={selectedDifficulties.includes(difficulty)}
                onChange={() => onDifficultyChange(difficulty)}
              />
              {difficulty}
              <OptionCount>
                ({problems.filter(p => p.difficulty === difficulty).length})
              </OptionCount>
            </FilterOption>
          ))}
        </FilterOptions>
      </FilterGroup>

      {(selectedTopics.length > 0 ||
        selectedCompanies.length > 0 ||
        selectedDifficulties.length > 0) && (
        <ClearButton onClick={clearAllFilters}>
          <FaTimes />
          Clear All
        </ClearButton>
      )}
    </FiltersContainer>
  );
};
