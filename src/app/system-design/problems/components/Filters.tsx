import React from 'react';
import { Problem } from '../data/problems';
import {
  FiltersContainer,
  FilterSection,
  FilterTitle,
  FilterGroup,
  FilterButton,
  FilterCount,
  FilterDivider,
} from '../styles/FilterStyles';

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
  const allTopics = Array.from(new Set(problems.flatMap(problem => problem.tags))).sort();

  const allCompanies = Array.from(new Set(problems.flatMap(problem => problem.companies))).sort();

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const getTopicCount = (topic: string) => {
    return problems.filter(problem =>
      problem.tags.some(tag => tag.toLowerCase().includes(topic.toLowerCase()))
    ).length;
  };

  const getCompanyCount = (company: string) => {
    return problems.filter(problem => problem.companies.includes(company)).length;
  };

  const getDifficultyCount = (difficulty: string) => {
    return problems.filter(problem => problem.difficulty === difficulty).length;
  };

  return (
    <FiltersContainer>
      <FilterSection>
        <FilterTitle>Topics</FilterTitle>
        <FilterGroup>
          {allTopics.map(topic => (
            <FilterButton
              key={topic}
              onClick={() => onTopicChange(topic)}
              selected={selectedTopics.includes(topic)}
            >
              {topic}
              <FilterCount>{getTopicCount(topic)}</FilterCount>
            </FilterButton>
          ))}
        </FilterGroup>
      </FilterSection>

      <FilterDivider />

      <FilterSection>
        <FilterTitle>Companies</FilterTitle>
        <FilterGroup>
          {allCompanies.map(company => (
            <FilterButton
              key={company}
              onClick={() => onCompanyChange(company)}
              selected={selectedCompanies.includes(company)}
            >
              {company}
              <FilterCount>{getCompanyCount(company)}</FilterCount>
            </FilterButton>
          ))}
        </FilterGroup>
      </FilterSection>

      <FilterDivider />

      <FilterSection>
        <FilterTitle>Difficulty</FilterTitle>
        <FilterGroup>
          {difficulties.map(difficulty => (
            <FilterButton
              key={difficulty}
              onClick={() => onDifficultyChange(difficulty)}
              selected={selectedDifficulties.includes(difficulty)}
              difficulty={difficulty}
            >
              {difficulty}
              <FilterCount>{getDifficultyCount(difficulty)}</FilterCount>
            </FilterButton>
          ))}
        </FilterGroup>
      </FilterSection>
    </FiltersContainer>
  );
};
