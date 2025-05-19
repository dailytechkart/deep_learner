'use client';

import React from 'react';
import styled from 'styled-components';

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  category: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  template: string;
}

const ProblemContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['3xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const MetaInfo = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const MetaTag = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ExampleContainer = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ExampleTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CodeBlock = styled.pre`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.sm};
  padding: ${props => props.theme.spacing.md};
  font-family: 'Fira Code', monospace;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text};
  overflow-x: auto;
  margin: ${props => props.theme.spacing.sm} 0;
`;

const ConstraintList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ConstraintItem = styled.li`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  &::before {
    content: '•';
    color: ${props => props.theme.colors.primary};
  }
`;

// Mock data - In a real app, this would come from an API or database
const problems: Record<string, Problem> = {
  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 104',
      '-109 <= nums[i] <= 109',
      '-109 <= target <= 109',
      'Only one valid answer exists.'
    ],
    template: `function twoSum(nums: number[], target: number): number[] {
    // Write your code here
};`
  }
  // Add more problems here
};

export const ProblemStatement: React.FC<{ problemId: string }> = ({ problemId }) => {
  const problem = problems[problemId];

  if (!problem) {
    return <div>Problem not found</div>;
  }

  return (
    <ProblemContainer>
      <Title>{problem.title}</Title>
      <MetaInfo>
        <MetaTag>{problem.difficulty}</MetaTag>
        <MetaTag>{problem.category}</MetaTag>
      </MetaInfo>

      <Section>
        <SectionTitle>Problem Description</SectionTitle>
        <Description>{problem.description}</Description>
      </Section>

      <Section>
        <SectionTitle>Examples</SectionTitle>
        {problem.examples.map((example, index) => (
          <ExampleContainer key={index}>
            <ExampleTitle>Example {index + 1}</ExampleTitle>
            <CodeBlock>Input: {example.input}</CodeBlock>
            <CodeBlock>Output: {example.output}</CodeBlock>
            {example.explanation && (
              <Description>Explanation: {example.explanation}</Description>
            )}
          </ExampleContainer>
        ))}
      </Section>

      <Section>
        <SectionTitle>Constraints</SectionTitle>
        <ConstraintList>
          {problem.constraints.map((constraint, index) => (
            <ConstraintItem key={index}>{constraint}</ConstraintItem>
          ))}
        </ConstraintList>
      </Section>
    </ProblemContainer>
  );
}; 