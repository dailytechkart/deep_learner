'use client';

import React, { useState, useEffect } from 'react';
import { usePractice } from '../hooks/usePractice';
import { PracticeQuestion } from './PracticeQuestion';
import { QuestionCategory } from '../types/practice';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #1a1a1a;
  margin: 0;
`;

const Filters = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${props => (props.active ? '#2196F3' : '#e0e0e0')};
  border-radius: 6px;
  background: ${props => (props.active ? '#E3F2FD' : 'white')};
  color: ${props => (props.active ? '#2196F3' : '#666')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => (props.active ? '#2196F3' : '#bdbdbd')};
  }
`;

const SortSelect = styled.select`
  padding: 8px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #bdbdbd;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 48px;
  color: #666;
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 48px;
  color: #f44336;
  font-size: 1.1rem;
`;

const NoQuestionsMessage = styled.div`
  text-align: center;
  padding: 48px;
  color: #666;
  font-size: 1.1rem;
`;

export const PracticeQuestionsList: React.FC = () => {
  const { questions, loading, error, fetchQuestions, fetchQuestionsByCategory } = usePractice();
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'difficulty' | 'points'>('difficulty');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);

  useEffect(() => {
    if (selectedCategory === 'all') {
      fetchQuestions();
    } else {
      fetchQuestionsByCategory(selectedCategory);
    }
  }, [selectedCategory, fetchQuestions, fetchQuestionsByCategory]);

  const handleCategoryChange = (category: QuestionCategory | 'all') => {
    setSelectedCategory(category);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as 'difficulty' | 'points');
  };

  const handleAnswerSubmit = (isCorrect: boolean) => {
    setTotalAttempted(prev => prev + 1);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    if (sortBy === 'difficulty') {
      return a.difficulty.localeCompare(b.difficulty);
    }
    return b.points - a.points;
  });

  if (loading) {
    return <LoadingMessage>Loading questions...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (questions.length === 0) {
    return <NoQuestionsMessage>No questions available for this category.</NoQuestionsMessage>;
  }

  return (
    <Container>
      <Header>
        <Title>Practice Questions</Title>
        <div>
          Score: {correctAnswers}/{totalAttempted}
        </div>
      </Header>

      <Filters>
        <FilterButton
          active={selectedCategory === 'all'}
          onClick={() => handleCategoryChange('all')}
        >
          All
        </FilterButton>
        <FilterButton
          active={selectedCategory === 'html'}
          onClick={() => handleCategoryChange('html')}
        >
          HTML
        </FilterButton>
        <FilterButton
          active={selectedCategory === 'css'}
          onClick={() => handleCategoryChange('css')}
        >
          CSS
        </FilterButton>
        <FilterButton
          active={selectedCategory === 'javascript'}
          onClick={() => handleCategoryChange('javascript')}
        >
          JavaScript
        </FilterButton>
        <FilterButton
          active={selectedCategory === 'react'}
          onClick={() => handleCategoryChange('react')}
        >
          React
        </FilterButton>

        <SortSelect value={sortBy} onChange={handleSortChange}>
          <option value="difficulty">Sort by Difficulty</option>
          <option value="points">Sort by Points</option>
        </SortSelect>
      </Filters>

      {sortedQuestions.map(question => (
        <PracticeQuestion
          key={question.id}
          question={question}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ))}
    </Container>
  );
};
