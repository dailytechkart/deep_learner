'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { InterviewPrep } from './components/InterviewPrep';
import { PracticeQuestions } from './components/PracticeQuestions';
import { MockInterviews } from './components/MockInterviews';

const InterviewContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  margin-top: 64px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const NavigationTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: ${props => props.theme.spacing.md};
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: none;
  background: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  border-radius: ${props => props.theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.backgroundAlt};
  }
`;

const TabContent = styled.div`
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.full};
  margin: ${props => props.theme.spacing.xl} 0;
  overflow: hidden;
`;

const Progress = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background: ${props => props.theme.colors.primary};
  transition: width 0.3s ease;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

type TabType = 'practice' | 'prep' | 'mock';

export default function InterviewPage() {
  const [activeTab, setActiveTab] = useState<TabType>('practice');
  const [progress, setProgress] = useState(35); // Example progress

  const stats = [
    { value: '24', label: 'Problems Solved' },
    { value: '85%', label: 'Success Rate' },
    { value: '3', label: 'Mock Interviews' },
    { value: '12', label: 'Hours Practiced' }
  ];

  return (
    <InterviewContainer>
      <Header />
      <MainContent>
        <PageHeader>
          <Title>Interview Preparation</Title>
          <Subtitle>
            Master coding interviews with our comprehensive preparation platform.
            Practice problems, learn strategies, and take mock interviews.
          </Subtitle>
        </PageHeader>

        <StatsContainer>
          {stats.map((stat, index) => (
            <StatCard key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>

        <ProgressBar>
          <Progress $progress={progress} />
        </ProgressBar>

        <NavigationTabs>
          <Tab 
            $active={activeTab === 'practice'} 
            onClick={() => setActiveTab('practice')}
          >
            Practice Problems
          </Tab>
          <Tab 
            $active={activeTab === 'prep'} 
            onClick={() => setActiveTab('prep')}
          >
            Interview Prep
          </Tab>
          <Tab 
            $active={activeTab === 'mock'} 
            onClick={() => setActiveTab('mock')}
          >
            Mock Interviews
          </Tab>
        </NavigationTabs>

        <TabContent>
          {activeTab === 'practice' && <PracticeQuestions />}
          {activeTab === 'prep' && <InterviewPrep />}
          {activeTab === 'mock' && <MockInterviews />}
        </TabContent>
      </MainContent>
    </InterviewContainer>
  );
} 