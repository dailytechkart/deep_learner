'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/Header';
import { ProblemStatement } from './components/ProblemStatement';
import { CodeEditor } from './components/CodeEditor';

const PracticeContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const MainContent = styled.main`
  display: flex;
  height: calc(100vh - 64px); // Subtract header height
  margin-top: 64px; // Add header height
`;

const LeftPanel = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.xl};
  border-right: 1px solid ${props => props.theme.colors.border};
`;

const RightPanel = styled.div`
  flex: 1;
  overflow-y: auto;
  background: ${props => props.theme.colors.backgroundAlt};
`;

export default function PracticeProblemPage({ params }: { params: { id: string } }) {
  return (
    <PracticeContainer>
      <Header />
      <MainContent>
        <LeftPanel>
          <ProblemStatement problemId={params.id} />
        </LeftPanel>
        <RightPanel>
          <CodeEditor problemId={params.id} />
        </RightPanel>
      </MainContent>
    </PracticeContainer>
  );
} 