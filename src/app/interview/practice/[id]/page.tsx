'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import ProblemStatement from './components/ProblemStatement';
import CodeEditor from './components/CodeEditor';

const PracticeContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  padding-top: 64px;
`;

const MainContent = styled.main`
  display: flex;
  height: calc(100vh - 64px);
  overflow: hidden;
`;

const LeftPanel = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.lg};
  border-right: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
`;

const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
`;

const EditorTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const EditorActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const ActionButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  ${props =>
    props.$variant === 'primary'
      ? `
    background: ${props.theme.colors.primary};
    color: white;

    &:hover {
      background: ${props.theme.colors.primaryDark};
    }
  `
      : `
    background: ${props.theme.colors.background};
    color: ${props.theme.colors.text};
    border: 1px solid ${props.theme.colors.border};

    &:hover {
      background: ${props.theme.colors.backgroundAlt};
    }
  `}
`;

const EditorContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const TestResults = styled.div`
  padding: ${props => props.theme.spacing.lg};
  border-top: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
  max-height: 200px;
  overflow-y: auto;
`;

const TestResultItem = styled.div<{ $status: 'success' | 'error' | 'pending' }>`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};

  ${props => {
    switch (props.$status) {
      case 'success':
        return `
          background: ${props.theme.colors.status.success}20;
          color: ${props.theme.colors.status.success};
        `;
      case 'error':
        return `
          background: ${props.theme.colors.status.error}20;
          color: ${props.theme.colors.status.error};
        `;
      default:
        return `
          background: ${props.theme.colors.background};
          color: ${props.theme.colors.textSecondary};
        `;
    }
  }}
`;

const StatusIcon = styled.span<{ $status: 'success' | 'error' | 'pending' }>`
  font-size: ${props => props.theme.typography.fontSize.lg};
  ${props => {
    switch (props.$status) {
      case 'success':
        return 'color: ${props.theme.colors.status.success};';
      case 'error':
        return 'color: ${props.theme.colors.status.error};';
      default:
        return 'color: ${props.theme.colors.textSecondary};';
    }
  }}
`;

interface PageProps {
  params: {
    id: string;
  };
}

export default function PracticeProblemPage({ params }: PageProps) {
  const [testResults, setTestResults] = useState<
    Array<{
      status: 'success' | 'error' | 'pending';
      message: string;
    }>
  >([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRunTests = () => {
    // Mock test results
    setTestResults([
      { status: 'success', message: 'Test case 1 passed: Basic functionality' },
      { status: 'error', message: 'Test case 2 failed: Edge case not handled' },
      { status: 'pending', message: 'Running test case 3...' },
    ]);
  };

  const handleSubmit = () => {
    // Handle code submission
    console.log('Submitting code...');
  };

  return (
    <PracticeContainer>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <MainContent>
        <LeftPanel>
          <ProblemStatement problemId={params.id} />
        </LeftPanel>
        <RightPanel>
          <EditorHeader>
            <EditorTitle>Solution</EditorTitle>
            <EditorActions>
              <ActionButton onClick={handleRunTests}>
                <span>▶️</span>
                Run Tests
              </ActionButton>
              <ActionButton $variant="primary" onClick={handleSubmit}>
                <span>📤</span>
                Submit
              </ActionButton>
            </EditorActions>
          </EditorHeader>
          <EditorContainer>
            <CodeEditor problemId={params.id} />
          </EditorContainer>
          <TestResults>
            {testResults.map((result, index) => (
              <TestResultItem key={index} $status={result.status}>
                <StatusIcon $status={result.status}>
                  {result.status === 'success' ? '✅' : result.status === 'error' ? '❌' : '⏳'}
                </StatusIcon>
                {result.message}
              </TestResultItem>
            ))}
          </TestResults>
        </RightPanel>
      </MainContent>
    </PracticeContainer>
  );
}
