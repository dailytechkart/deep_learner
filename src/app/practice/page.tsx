'use client';

import React from 'react';
import { PracticeQuestionsList } from '../components/PracticeQuestionsList';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
`;

export default function PracticePage() {
  return (
    <PageContainer>
      <PracticeQuestionsList />
    </PageContainer>
  );
} 