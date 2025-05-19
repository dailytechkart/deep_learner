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
  MainContent,
  Section,
  SectionHeader,
  SectionTitle,
  SectionActions,
  ActionButton,
  ProgressBar
} from '../components/StyledComponents';
import Sidebar from '../components/Sidebar';

// Styled Components
const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${props => props.theme.spacing.lg};
  padding: ${props => props.theme.spacing.xl};
  max-width: 1600px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  grid-column: span 12;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.lg};
    text-align: center;
  }
`;

const WelcomeContent = styled.div`
  h1 {
    font-size: ${props => props.theme.typography.h2.fontSize};
    font-weight: ${props => props.theme.typography.h2.fontWeight};
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.typography.body1.fontSize};
  }
`;

const StatsGrid = styled.div`
  grid-column: span 12;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const StatCard = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const StatTitle = styled.h3`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const StatValue = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.h3.fontSize};
  font-weight: ${props => props.theme.typography.h3.fontWeight};
`;

const ChartSection = styled.div`
  grid-column: span 8;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-column: span 12;
  }
`;

const ActivitySection = styled.div`
  grid-column: span 4;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-column: span 12;
  }
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.backgroundAlt};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
`;

const ActivityContent = styled.div`
  flex: 1;

  h4 {
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.fontSize.sm};
    font-weight: ${props => props.theme.typography.fontWeight.medium};
    margin-bottom: 4px;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.typography.fontSize.xs};
  }
`;

const CourseSection = styled.div`
  grid-column: span 12;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  border: 1px solid ${props => props.theme.colors.border};
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.lg};
`;

const CourseCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const CourseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CourseTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

const CourseProgress = styled.div`
  margin-top: ${props => props.theme.spacing.md};
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

// Types
interface SidebarProps {
  selectedCategory?: string;
  selectedFilter?: string;
  onCategoryChange?: (category: string) => void;
  onFilterChange?: (filter: string) => void;
}

interface ActivityData {
  date: string;
  hours: number;
}

interface RecentActivity {
  id: number;
  icon: string;
  title: string;
  time: string;
}

interface Course {
  id: number;
  title: string;
  progress: number;
  lastAccessed: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [userStats, setUserStats] = useState({
    totalCourses: 12,
    completedCourses: 4,
    inProgressCourses: 3,
    totalHours: 24
  });

  const [activityData] = useState<ActivityData[]>([
    { date: 'Mon', hours: 2 },
    { date: 'Tue', hours: 3 },
    { date: 'Wed', hours: 1 },
    { date: 'Thu', hours: 4 },
    { date: 'Fri', hours: 2 },
    { date: 'Sat', hours: 5 },
    { date: 'Sun', hours: 3 }
  ]);

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: 1,
      icon: '📚',
      title: 'Completed HTML & CSS Fundamentals',
      time: '2 hours ago'
    },
    {
      id: 2,
      icon: '🎯',
      title: 'Started JavaScript Essentials',
      time: '1 day ago'
    },
    {
      id: 3,
      icon: '🏆',
      title: 'Earned "Fast Learner" badge',
      time: '2 days ago'
    }
  ]);

  const [courses] = useState<Course[]>([
    {
      id: 1,
      title: 'HTML & CSS Fundamentals',
      progress: 75,
      lastAccessed: '2 hours ago'
    },
    {
      id: 2,
      title: 'JavaScript Essentials',
      progress: 30,
      lastAccessed: '1 day ago'
    },
    {
      id: 3,
      title: 'React Development',
      progress: 0,
      lastAccessed: 'Not started'
    }
  ]);

  return (
    <PageContainer>
      <Sidebar 
        selectedCategory={selectedCategory}
        selectedFilter={selectedFilter}
        onCategoryChange={setSelectedCategory}
        onFilterChange={setSelectedFilter}
      />
      <MainContent>
        <DashboardGrid>
          <WelcomeSection>
            <WelcomeContent>
              <h1>Welcome back, {user?.displayName || 'Learner'}!</h1>
              <p>Track your progress and continue learning</p>
            </WelcomeContent>
          </WelcomeSection>

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

          <ChartSection>
            <SectionHeader>
              <SectionTitle>Learning Activity</SectionTitle>
            </SectionHeader>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fill: '#6b7280' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      background: '#ffffff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="hours" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={{ fill: '#2563eb' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartSection>

          <ActivitySection>
            <SectionHeader>
              <SectionTitle>Recent Activity</SectionTitle>
            </SectionHeader>
            <ActivityList>
              {recentActivity.map(activity => (
                <ActivityItem key={activity.id}>
                  <ActivityIcon>{activity.icon}</ActivityIcon>
                  <ActivityContent>
                    <h4>{activity.title}</h4>
                    <p>{activity.time}</p>
                  </ActivityContent>
                </ActivityItem>
              ))}
            </ActivityList>
          </ActivitySection>

          <CourseSection>
            <SectionHeader>
              <SectionTitle>Your Courses</SectionTitle>
              <SectionActions>
                <ActionButton>View All Courses</ActionButton>
              </SectionActions>
            </SectionHeader>
            <CourseGrid>
              {courses.map(course => (
                <CourseCard key={course.id}>
                  <CourseHeader>
                    <CourseTitle>{course.title}</CourseTitle>
                  </CourseHeader>
                  <CourseProgress>
                    <ProgressLabel>
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </ProgressLabel>
                    <ProgressBar progress={course.progress}>
                      <div />
                    </ProgressBar>
                    <p style={{ 
                      marginTop: '8px', 
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>
                      Last accessed: {course.lastAccessed}
                    </p>
                  </CourseProgress>
                </CourseCard>
              ))}
            </CourseGrid>
          </CourseSection>
        </DashboardGrid>
      </MainContent>
    </PageContainer>
  );
} 