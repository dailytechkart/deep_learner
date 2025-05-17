'use client';

import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { lightTheme, darkTheme } from '../theme';
import {
  DashboardContainer,
  Header,
  HeaderContent,
  HeaderLeft,
  QuickActions,
  ActionButton,
  CategoryList,
  CategoryButton,
  CategoryIcon,
  Logo,
  SearchContainer,
  SearchInput,
  SearchIcon,
  ThemeToggle,
  PageContainer,
  Sidebar,
  SidebarHeader,
  SidebarActions,
  FilterButton,
  SidebarTitle,
  TopicCount,
  TopicTitle,
  UserInfo,
  UserName,
  TopicMeta,
  MetaItem,
  TopicContent,
  Section,
  SectionHeader,
  SectionTitle,
  SectionActions,
  ProblemStatement,
  QuizContainer,
  QuizHeader,
  QuizQuestion,
  QuizProgress,
  QuizOptions,
  MainContent
} from '../components/StyledComponents';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <DashboardContainer>
        <Header>
          <HeaderContent>
            <HeaderLeft>
              <Logo>Deep Learner</Logo>
              <SearchContainer>
                <SearchInput
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon>🔍</SearchIcon>
              </SearchContainer>
            </HeaderLeft>
            <QuickActions>
              <ActionButton>
                <span>📚</span>
                My Courses
              </ActionButton>
              <ActionButton>
                <span>🎯</span>
                Progress
              </ActionButton>
              <ThemeToggle onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? '☀️' : '🌙'}
              </ThemeToggle>
            </QuickActions>
          </HeaderContent>
        </Header>

        <PageContainer>
          <Sidebar>
            <SidebarHeader>
              <SidebarTitle>Categories</SidebarTitle>
              <SidebarActions>
                <FilterButton
                  active={selectedFilter === 'all'}
                  onClick={() => setSelectedFilter('all')}
                >
                  All
                </FilterButton>
                <FilterButton
                  active={selectedFilter === 'in-progress'}
                  onClick={() => setSelectedFilter('in-progress')}
                >
                  In Progress
                </FilterButton>
                <FilterButton
                  active={selectedFilter === 'completed'}
                  onClick={() => setSelectedFilter('completed')}
                >
                  Completed
                </FilterButton>
              </SidebarActions>
            </SidebarHeader>
            <CategoryList>
              <CategoryButton
                active={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
              >
                <CategoryIcon>📚</CategoryIcon>
                All Topics
              </CategoryButton>
              <CategoryButton
                active={selectedCategory === 'ml'}
                onClick={() => setSelectedCategory('ml')}
              >
                <CategoryIcon>🤖</CategoryIcon>
                Machine Learning
              </CategoryButton>
              <CategoryButton
                active={selectedCategory === 'dl'}
                onClick={() => setSelectedCategory('dl')}
              >
                <CategoryIcon>🧠</CategoryIcon>
                Deep Learning
              </CategoryButton>
              <CategoryButton
                active={selectedCategory === 'nlp'}
                onClick={() => setSelectedCategory('nlp')}
              >
                <CategoryIcon>💬</CategoryIcon>
                NLP
              </CategoryButton>
            </CategoryList>
          </Sidebar>

          <MainContent>
            <TopicTitle>Welcome back, {user?.name || 'Learner'}!</TopicTitle>
            <UserInfo>
              <UserName>{user?.email}</UserName>
            </UserInfo>
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

            <TopicContent>
              <p>
                Continue your learning journey with our comprehensive curriculum
                designed to take you from beginner to expert in AI and machine learning.
              </p>
            </TopicContent>

            <Section>
              <SectionHeader>
                <SectionTitle>Featured Topics</SectionTitle>
                <SectionActions>
                  <ActionButton>View All</ActionButton>
                </SectionActions>
              </SectionHeader>
              <ProblemStatement>
                <p>
                  Explore our curated collection of topics designed to take you from
                  beginner to expert in AI and machine learning.
                </p>
              </ProblemStatement>
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
                    What is the primary difference between machine learning and deep learning?
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
      </DashboardContainer>
    </ThemeProvider>
  );
};

export default Dashboard; 