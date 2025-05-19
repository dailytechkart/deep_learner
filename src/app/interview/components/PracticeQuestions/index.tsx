'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const QuestionsContainer = styled.div`
  padding: 2rem;
  background: ${props => props.theme.colors.background};
  min-height: 100vh;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: ${props => props.theme.colors.backgroundAlt};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? '#fff' : props.theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover {
    background: ${props => props.active ? props.theme.colors.primaryDark : props.theme.colors.backgroundHover};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const QuestionsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
`;

const QuestionCard = styled(Link)`
  padding: 1.5rem;
  background: ${props => props.theme.colors.backgroundAlt};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background: ${props => props.theme.colors.backgroundHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${props => props.theme.colors.primary}10;
  }
`;

const QuestionInfo = styled.div`
  flex: 1;
`;

const QuestionTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
`;

const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const QuestionTag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textSecondary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
`;

type Difficulty = 'Easy' | 'Medium' | 'Hard';

const DifficultyBadge = styled.span<{ difficulty: Difficulty }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 0.5rem;
  background: ${props => {
    switch (props.difficulty) {
      case 'Easy':
        return props.theme.colors.status.success;
      case 'Medium':
        return props.theme.colors.status.warning;
      case 'Hard':
        return props.theme.colors.status.error;
      default:
        return props.theme.colors.status.info;
    }
  }};
  color: white;
`;

const Blind75Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  margin-left: 0.5rem;
  font-weight: 500;
`;

const categories = ['All', 'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming', 'JavaScript', 'React', 'Frontend'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

const questions = [
  // Arrays & Strings
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy' as Difficulty,
    category: 'Arrays',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '85%',
    href: '/interview/practice/two-sum',
    isBlind75: true
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    difficulty: 'Easy' as Difficulty,
    category: 'Strings',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '75%',
    href: '/interview/practice/valid-parentheses',
    isBlind75: true
  },
  {
    id: '3',
    title: 'Merge Intervals',
    difficulty: 'Medium' as Difficulty,
    category: 'Arrays',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '65%',
    href: '/interview/practice/merge-intervals',
    isBlind75: true
  },
  {
    id: '4',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium' as Difficulty,
    category: 'Strings',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '55%',
    href: '/interview/practice/longest-substring',
    isBlind75: true
  },
  // Linked Lists
  {
    id: '5',
    title: 'Reverse Linked List',
    difficulty: 'Easy' as Difficulty,
    category: 'Linked Lists',
    companies: ['Amazon', 'Microsoft', 'Facebook'],
    acceptanceRate: '80%',
    href: '/interview/practice/reverse-linked-list',
    isBlind75: true
  },
  {
    id: '6',
    title: 'Linked List Cycle',
    difficulty: 'Easy' as Difficulty,
    category: 'Linked Lists',
    companies: ['Amazon', 'Microsoft', 'Facebook'],
    acceptanceRate: '70%',
    href: '/interview/practice/linked-list-cycle',
    isBlind75: true
  },
  // Trees
  {
    id: '7',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy' as Difficulty,
    category: 'Trees',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '75%',
    href: '/interview/practice/maximum-depth-binary-tree',
    isBlind75: true
  },
  {
    id: '8',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium' as Difficulty,
    category: 'Trees',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '60%',
    href: '/interview/practice/validate-bst',
    isBlind75: true
  },
  // Dynamic Programming
  {
    id: '9',
    title: 'Climbing Stairs',
    difficulty: 'Easy' as Difficulty,
    category: 'Dynamic Programming',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '70%',
    href: '/interview/practice/climbing-stairs',
    isBlind75: true
  },
  {
    id: '10',
    title: 'Coin Change',
    difficulty: 'Medium' as Difficulty,
    category: 'Dynamic Programming',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '45%',
    href: '/interview/practice/coin-change',
    isBlind75: true
  },
  // Graphs
  {
    id: '11',
    title: 'Number of Islands',
    difficulty: 'Medium' as Difficulty,
    category: 'Graphs',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '65%',
    href: '/interview/practice/number-of-islands',
    isBlind75: true
  },
  {
    id: '12',
    title: 'Course Schedule',
    difficulty: 'Medium' as Difficulty,
    category: 'Graphs',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '55%',
    href: '/interview/practice/course-schedule',
    isBlind75: true
  },
  // Frontend - JavaScript
  {
    id: '13',
    title: 'Implement Promise.all',
    difficulty: 'Medium' as Difficulty,
    category: 'JavaScript',
    companies: ['Google', 'Amazon', 'Atlassian'],
    acceptanceRate: '60%',
    href: '/interview/practice/javascript/implement-promise-all',
    isBlind75: false
  },
  {
    id: '14',
    title: 'Event Loop and Async JavaScript',
    difficulty: 'Hard' as Difficulty,
    category: 'JavaScript',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '45%',
    href: '/interview/practice/javascript/event-loop',
    isBlind75: false
  },
  {
    id: '15',
    title: 'Implement Debounce Function',
    difficulty: 'Medium' as Difficulty,
    category: 'JavaScript',
    companies: ['Google', 'Amazon', 'Atlassian'],
    acceptanceRate: '70%',
    href: '/interview/practice/javascript/implement-debounce',
    isBlind75: false
  },
  // Frontend - React
  {
    id: '16',
    title: 'Implement Custom Hook',
    difficulty: 'Medium' as Difficulty,
    category: 'React',
    companies: ['Google', 'Amazon', 'Atlassian'],
    acceptanceRate: '65%',
    href: '/interview/practice/react/custom-hook',
    isBlind75: false
  },
  {
    id: '17',
    title: 'React Performance Optimization',
    difficulty: 'Hard' as Difficulty,
    category: 'React',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '50%',
    href: '/interview/practice/react/performance',
    isBlind75: false
  },
  {
    id: '18',
    title: 'State Management in React',
    difficulty: 'Medium' as Difficulty,
    category: 'React',
    companies: ['Google', 'Amazon', 'Atlassian'],
    acceptanceRate: '60%',
    href: '/interview/practice/react/state-management',
    isBlind75: false
  },
  // Frontend - General
  {
    id: '19',
    title: 'CSS Grid Layout Implementation',
    difficulty: 'Medium' as Difficulty,
    category: 'Frontend',
    companies: ['Google', 'Amazon', 'Atlassian'],
    acceptanceRate: '75%',
    href: '/interview/practice/frontend/css-grid',
    isBlind75: false
  },
  {
    id: '20',
    title: 'Web Accessibility Implementation',
    difficulty: 'Medium' as Difficulty,
    category: 'Frontend',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '65%',
    href: '/interview/practice/frontend/web-accessibility',
    isBlind75: false
  },
  {
    id: '21',
    title: 'Browser Rendering Process',
    difficulty: 'Hard' as Difficulty,
    category: 'Frontend',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '40%',
    href: '/interview/practice/frontend/browser-rendering',
    isBlind75: false
  }
];

export const PracticeQuestions: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showBlind75Only, setShowBlind75Only] = useState(false);

  const filteredQuestions = questions.filter(question => {
    if (selectedCategory !== 'All' && question.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'All' && question.difficulty !== selectedDifficulty) return false;
    if (showBlind75Only && !question.isBlind75) return false;
    return true;
  });

  return (
    <QuestionsContainer>
      <FiltersContainer>
        <FilterButton
          active={showBlind75Only}
          onClick={() => setShowBlind75Only(!showBlind75Only)}
        >
          Blind 75 Only
        </FilterButton>
        {categories.map(category => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FiltersContainer>

      <FiltersContainer>
        {difficulties.map(difficulty => (
          <FilterButton
            key={difficulty}
            active={selectedDifficulty === difficulty}
            onClick={() => setSelectedDifficulty(difficulty)}
          >
            {difficulty}
          </FilterButton>
        ))}
      </FiltersContainer>

      <QuestionsList>
        {filteredQuestions.map(question => (
          <QuestionCard key={question.id} href={question.href}>
            <QuestionInfo>
              <QuestionTitle>
                {question.title}
                {question.isBlind75 && <Blind75Badge>Blind 75</Blind75Badge>}
              </QuestionTitle>
              <QuestionMeta>
                <QuestionTag>
                  <span>Category:</span> {question.category}
                </QuestionTag>
                <QuestionTag>
                  <span>Companies:</span> {question.companies.join(', ')}
                </QuestionTag>
                <QuestionTag>
                  <span>Acceptance Rate:</span> {question.acceptanceRate}
                </QuestionTag>
              </QuestionMeta>
            </QuestionInfo>
            <DifficultyBadge difficulty={question.difficulty}>
              {question.difficulty}
            </DifficultyBadge>
          </QuestionCard>
        ))}
      </QuestionsList>
    </QuestionsContainer>
  );
}; 