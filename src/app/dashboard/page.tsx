'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
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
  ActionButton,
  StatCard,
  StatTitle,
  StatValue
} from '../components/StyledComponents';
import Sidebar from '../components/Sidebar';

// Types
interface UserStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalHours: number;
}

interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
}

interface ActivityData {
  date: string;
  hours: number;
}

interface SkillData {
  name: string;
  value: number;
}

// Styled Components
const DashboardContent = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const DateText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.md};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ChartContainer = styled.div`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ChartTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.h4};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.lg};
  
  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const CourseList = styled.div`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const CourseItem = styled.div`
  padding: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const CourseTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#6366F1', '#EC4899'];

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [userStats, setUserStats] = useState<UserStats>({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    totalHours: 0
  });
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [skillData, setSkillData] = useState<SkillData[]>([]);

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

  useEffect(() => {
    // Fetch user stats
    const fetchUserStats = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        setUserStats(data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    // Fetch course progress
    const fetchCourseProgress = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/dashboard/courses');
        const data = await response.json();
        setCourseProgress(data);
      } catch (error) {
        console.error('Error fetching course progress:', error);
      }
    };

    // Fetch activity data
    const fetchActivityData = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/dashboard/activity');
        const data = await response.json();
        setActivityData(data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    // Fetch skill data
    const fetchSkillData = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/dashboard/skills');
        const data = await response.json();
        setSkillData(data);
      } catch (error) {
        console.error('Error fetching skill data:', error);
      }
    };

    fetchUserStats();
    fetchCourseProgress();
    fetchActivityData();
    fetchSkillData();
  }, []);

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

        <DashboardContent>
          <DashboardHeader>
            <div>
              <DateText>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</DateText>
            </div>
          </DashboardHeader>

          <StatsGrid>
            <StatCard>
              <StatTitle>Total Courses</StatTitle>
              <StatValue>{userStats.totalCourses}</StatValue>
            </StatCard>
            <StatCard>
              <StatTitle>Completed Courses</StatTitle>
              <StatValue>{userStats.completedCourses}</StatValue>
            </StatCard>
            <StatCard>
              <StatTitle>In Progress</StatTitle>
              <StatValue>{userStats.inProgressCourses}</StatValue>
            </StatCard>
            <StatCard>
              <StatTitle>Total Learning Hours</StatTitle>
              <StatValue>{userStats.totalHours}</StatValue>
            </StatCard>
          </StatsGrid>

          <GridLayout>
            <ChartContainer>
              <ChartTitle>Learning Activity</ChartTitle>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="hours" stroke="#F59E0B" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>

            <ChartContainer>
              <ChartTitle>Skill Distribution</ChartTitle>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={skillData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {skillData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartContainer>
          </GridLayout>

          <CourseList>
            <ChartTitle>Course Progress</ChartTitle>
            {courseProgress.map((course) => (
              <CourseItem key={course.id}>
                <CourseTitle>{course.title}</CourseTitle>
                <ProgressBar progress={course.progress}>
                  <div />
                </ProgressBar>
                <DateText>Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}</DateText>
              </CourseItem>
            ))}
          </CourseList>
        </DashboardContent>
      </MainContent>
    </PageContainer>
  );
} 