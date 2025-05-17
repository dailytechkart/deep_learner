'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  PageContainer,
  TopicTitle,
  TopicMeta,
  MetaItem,
  Section,
  SectionHeader,
  SectionTitle,
  SectionActions,
  QuizContainer,
  QuizHeader,
  QuizQuestion,
  QuizProgress,
  QuizOptions,
  MainContent,
  WelcomeCard,
  ProgressBar,
  TopicCard,
  TopicCardGrid,
  TopicCardHeader,
  TopicCardContent,
  TopicCardFooter,
  TopicCardStats,
  TopicCardAction,
  ActionButton
} from '../components/StyledComponents';
import Sidebar from '../components/Sidebar';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const featuredTopics = [
    {
      id: 1,
      title: 'HTML & CSS Fundamentals',
      description: 'Learn the building blocks of web development',
      progress: 75,
      duration: '4 hours',
      level: 'Beginner',
      category: 'frontend'
    },
    {
      id: 2,
      title: 'JavaScript Essentials',
      description: 'Master modern JavaScript and ES6+ features',
      progress: 30,
      duration: '6 hours',
      level: 'Intermediate',
      category: 'frontend'
    },
    {
      id: 3,
      title: 'React Development',
      description: 'Build modern web applications with React',
      progress: 0,
      duration: '5 hours',
      level: 'Advanced',
      category: 'frontend'
    }
  ];

  return (
    <PageContainer>
      <Sidebar
        selectedCategory={selectedCategory}
        selectedFilter={selectedFilter}
        onCategoryChange={setSelectedCategory}
        onFilterChange={setSelectedFilter}
      />

      <MainContent>
        <WelcomeCard>
          <TopicTitle>Welcome back, {user?.displayName || 'Learner'}!</TopicTitle>
          <TopicMeta>
            <MetaItem>
              <span>📚</span>
              <span>12 Topics</span>
            </MetaItem>
            <MetaItem>
              <span>⏱️</span>
              <span>24 Hours of Content</span>
            </MetaItem>
            <MetaItem>
              <span>🎯</span>
              <span>8 Quizzes</span>
            </MetaItem>
          </TopicMeta>
        </WelcomeCard>

        <Section>
          <SectionHeader>
            <SectionTitle>Continue Learning</SectionTitle>
            <SectionActions>
              <ActionButton>View All</ActionButton>
            </SectionActions>
          </SectionHeader>
          <TopicCardGrid>
            {featuredTopics.map(topic => (
              <TopicCard key={topic.id}>
                <TopicCardHeader>
                  <span>{topic.category === 'frontend' ? '🌐' : '💻'}</span>
                  <span>{topic.level}</span>
                </TopicCardHeader>
                <TopicCardContent>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                </TopicCardContent>
                <TopicCardFooter>
                  <TopicCardStats>
                    <span>⏱️ {topic.duration}</span>
                    <ProgressBar progress={topic.progress}>
                      <div />
                    </ProgressBar>
                    <span>{topic.progress}% Complete</span>
                  </TopicCardStats>
                  <TopicCardAction>
                    {topic.progress === 0 ? 'Start' : 'Continue'}
                  </TopicCardAction>
                </TopicCardFooter>
              </TopicCard>
            ))}
          </TopicCardGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>Quick Quiz</SectionTitle>
            <SectionActions>
              <ActionButton>More Quizzes</ActionButton>
            </SectionActions>
          </SectionHeader>
          <QuizContainer>
            <QuizHeader>
              <QuizQuestion>
                What is the primary difference between HTML and CSS?
              </QuizQuestion>
              <QuizProgress>1/5 Questions</QuizProgress>
            </QuizHeader>
            <QuizOptions>
              {/* Quiz options will go here */}
            </QuizOptions>
          </QuizContainer>
        </Section>
      </MainContent>
    </PageContainer>
  );
};

export default Dashboard; 