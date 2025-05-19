'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.full};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.primary}10;
  }
`;

const QuestionsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing.md};
`;

const QuestionCard = styled(Link)`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    transform: translateX(4px);
    border-color: ${props => props.theme.colors.primary};
  }
`;

const QuestionInfo = styled.div`
  flex: 1;
`;

const QuestionTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs};
`;

const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const QuestionTag = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props => {
    switch (props.difficulty) {
      case 'Easy':
        return props.theme.colors.success;
      case 'Medium':
        return props.theme.colors.warning;
      case 'Hard':
        return props.theme.colors.error;
      default:
        return props.theme.colors.backgroundAlt;
    }
  }};
  color: white;
`;

const Blind75Badge = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: 9999px;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props => props.theme.colors.primary};
  color: white;
  margin-left: ${props => props.theme.spacing.sm};
`;

const questions = [
  // Arrays & Strings
  {
    id: '1',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '85%',
    href: '/interview/practice/two-sum',
    isBlind75: true
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Strings',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '75%',
    href: '/interview/practice/valid-parentheses',
    isBlind75: true
  },
  {
    id: '3',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    category: 'Arrays',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '65%',
    href: '/interview/practice/merge-intervals',
    isBlind75: true
  },
  {
    id: '4',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
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
    difficulty: 'Easy',
    category: 'Linked Lists',
    companies: ['Amazon', 'Microsoft', 'Facebook'],
    acceptanceRate: '80%',
    href: '/interview/practice/reverse-linked-list',
    isBlind75: true
  },
  {
    id: '6',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
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
    difficulty: 'Easy',
    category: 'Trees',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '75%',
    href: '/interview/practice/maximum-depth-binary-tree',
    isBlind75: true
  },
  {
    id: '8',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
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
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '70%',
    href: '/interview/practice/climbing-stairs',
    isBlind75: true
  },
  {
    id: '10',
    title: 'Coin Change',
    difficulty: 'Medium',
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
    difficulty: 'Medium',
    category: 'Graphs',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '65%',
    href: '/interview/practice/number-of-islands',
    isBlind75: true
  },
  {
    id: '12',
    title: 'Course Schedule',
    difficulty: 'Medium',
    category: 'Graphs',
    companies: ['Google', 'Amazon', 'Microsoft'],
    acceptanceRate: '55%',
    href: '/interview/practice/course-schedule',
    isBlind75: true
  }
];

const categories = ['All', 'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming'];
const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

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