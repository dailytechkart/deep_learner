'use client';

import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  MainContent,
  Section,
  SectionHeader,
  SectionTitle,
  ProblemStatement,
  QuizContainer,
  QuizHeader,
  QuizQuestion,
  QuizProgress,
  QuizOptions,
  CategoryList,
  CategoryButton
} from '../components/StyledComponents';

const categories = [
  { id: 'all', name: 'All Problems', count: 50 },
  { id: 'easy', name: 'Easy', count: 20 },
  { id: 'medium', name: 'Medium', count: 20 },
  { id: 'hard', name: 'Hard', count: 10 }
];

const problems = [
  {
    id: 1,
    title: 'Reverse a String',
    description: 'Write a function that takes a string as input and returns the string reversed.',
    difficulty: 'easy',
    category: 'strings',
    template: 'function reverseString(str) {\n  // Your code here\n}'
  },
  {
    id: 2,
    title: 'Binary Search',
    description: 'Implement binary search algorithm to find a target value in a sorted array.',
    difficulty: 'medium',
    category: 'algorithms',
    template: 'function binarySearch(arr, target) {\n  // Your code here\n}'
  },
  {
    id: 3,
    title: 'LRU Cache',
    description: 'Design and implement a data structure for Least Recently Used (LRU) cache.',
    difficulty: 'hard',
    category: 'data-structures',
    template: 'class LRUCache {\n  // Your code here\n}'
  }
];

export default function PracticePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProblem, setSelectedProblem] = useState(problems[0]);

  const filteredProblems = selectedCategory === 'all'
    ? problems
    : problems.filter(problem => problem.difficulty === selectedCategory);

  return (
    <Layout>
      <MainContent>
        <Section>
          <SectionHeader>
            <SectionTitle>Coding Practice</SectionTitle>
          </SectionHeader>
          <CategoryList>
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <span className="category-count">{category.count}</span>
              </CategoryButton>
            ))}
          </CategoryList>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>Problem Statement</SectionTitle>
          </SectionHeader>
          <ProblemStatement>
            <h3>{selectedProblem.title}</h3>
            <p>{selectedProblem.description}</p>
          </ProblemStatement>

          <QuizContainer>
            <QuizHeader>
              <QuizQuestion>Your Solution</QuizQuestion>
              <QuizProgress>Problem {selectedProblem.id} of {problems.length}</QuizProgress>
            </QuizHeader>
            <pre>
              <code>{selectedProblem.template}</code>
            </pre>
          </QuizContainer>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>Available Problems</SectionTitle>
          </SectionHeader>
          <QuizOptions>
            {filteredProblems.map(problem => (
              <CategoryButton
                key={problem.id}
                active={selectedProblem.id === problem.id}
                onClick={() => setSelectedProblem(problem)}
              >
                {problem.title}
                <span className="category-count">{problem.difficulty}</span>
              </CategoryButton>
            ))}
          </QuizOptions>
        </Section>
      </MainContent>
    </Layout>
  );
} 