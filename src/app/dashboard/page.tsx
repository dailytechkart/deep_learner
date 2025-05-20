'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { MainLayout } from '@/components/MainLayout';
import {
  FaCode,
  FaBook,
  FaChartLine,
  FaTrophy,
  FaCalendar,
  FaStar,
  FaFire,
  FaCheck,
  FaLock,
  FaUnlock,
} from 'react-icons/fa';

// Styled Components
const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const DashboardContent = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StatsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 12px;
  padding: 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px ${props => props.theme.colors.border}15;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${props => props.theme.colors.border}25;
  }
`;

const StatIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: ${props => props.theme.colors.primary}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 1.75rem;
`;

const StatContent = styled.div`
  h3 {
    font-size: 1.75rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.25rem;
  }
  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

const Section = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  box-shadow: 0 2px 4px ${props => props.theme.colors.border}15;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const ViewAll = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ProblemGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProblemCard = styled(Link)`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  padding: 1.25rem;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px ${props => props.theme.colors.border}15;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${props => props.theme.colors.border}25;
  }
`;

const ProblemTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const ProblemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props =>
    props.difficulty === 'Easy'
      ? props.theme.colors.status.success + '20'
      : props.difficulty === 'Medium'
        ? props.theme.colors.status.warning + '20'
        : props.theme.colors.status.error + '20'};
  color: ${props =>
    props.difficulty === 'Easy'
      ? props.theme.colors.status.success
      : props.difficulty === 'Medium'
        ? props.theme.colors.status.warning
        : props.theme.colors.status.error};
`;

const CourseCard = styled(Link)`
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 10px;
  padding: 1.5rem;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px ${props => props.theme.colors.border}15;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${props => props.theme.colors.border}25;
  }
`;

const CourseTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const CourseDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
  line-height: 1.5;
`;

const ProgressContainer = styled.div`
  margin-top: 1rem;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: 500;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 6px;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: 3px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.progress}%;
    background: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
`;

const RecentActivity = styled.div`
  background: ${props => props.theme.colors.background};
  border-radius: 10px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${props => props.theme.colors.primary}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
  font-size: 1.25rem;
`;

const ActivityContent = styled.div`
  flex: 1;

  h4 {
    color: ${props => props.theme.colors.text};
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.75rem;
  }
`;

const PremiumBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: ${props => props.theme.colors.status.warning}20;
  color: ${props => props.theme.colors.status.warning};
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

export default function DashboardPage() {
  const [stats] = useState({
    problemsSolved: 42,
    coursesCompleted: 3,
    currentStreak: 7,
    totalPoints: 1250,
  });

  const [recentProblems] = useState([
    {
      id: 1,
      title: 'Design a Chat Application',
      difficulty: 'Hard',
      category: 'System Design',
      isPremium: true,
    },
    {
      id: 2,
      title: 'Implement Rate Limiter',
      difficulty: 'Medium',
      category: 'System Design',
      isPremium: false,
    },
    {
      id: 3,
      title: 'Design URL Shortener',
      difficulty: 'Medium',
      category: 'System Design',
      isPremium: true,
    },
  ]);

  const [courses] = useState([
    {
      id: 1,
      title: 'System Design Fundamentals',
      description:
        'Master the core concepts of system design including scalability, reliability, and performance optimization.',
      progress: 75,
      totalModules: 12,
      completedModules: 9,
    },
    {
      id: 2,
      title: 'Advanced System Design Patterns',
      description:
        'Learn advanced patterns and best practices for building scalable and maintainable systems.',
      progress: 45,
      totalModules: 8,
      completedModules: 4,
    },
  ]);

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'problem',
      title: 'Solved Design a Chat Application',
      time: '2 hours ago',
      icon: <FaCheck />,
    },
    {
      id: 2,
      type: 'course',
      title: 'Completed System Design Fundamentals Module 3',
      time: '1 day ago',
      icon: <FaBook />,
    },
    {
      id: 3,
      type: 'streak',
      title: 'Maintained 7-day streak',
      time: '2 days ago',
      icon: <FaFire />,
    },
  ]);

  return (
    <MainLayout>
      <DashboardContainer>
        <DashboardContent>
          <StatsGrid>
            <StatCard>
              <StatIcon>
                <FaCode />
              </StatIcon>
              <StatContent>
                <h3>{stats.problemsSolved}</h3>
                <p>Problems Solved</p>
              </StatContent>
            </StatCard>
            <StatCard>
              <StatIcon>
                <FaBook />
              </StatIcon>
              <StatContent>
                <h3>{stats.coursesCompleted}</h3>
                <p>Courses Completed</p>
              </StatContent>
            </StatCard>
            <StatCard>
              <StatIcon>
                <FaFire />
              </StatIcon>
              <StatContent>
                <h3>{stats.currentStreak}</h3>
                <p>Day Streak</p>
              </StatContent>
            </StatCard>
            <StatCard>
              <StatIcon>
                <FaTrophy />
              </StatIcon>
              <StatContent>
                <h3>{stats.totalPoints}</h3>
                <p>Total Points</p>
              </StatContent>
            </StatCard>
          </StatsGrid>

          <Section>
            <SectionHeader>
              <SectionTitle>Recent Problems</SectionTitle>
              <ViewAll href="/system-design/problems">
                View All
                <FaChartLine size={14} />
              </ViewAll>
            </SectionHeader>
            <ProblemGrid>
              {recentProblems.map(problem => (
                <ProblemCard key={problem.id} href={`/system-design/problems/${problem.id}`}>
                  <ProblemTitle>
                    {problem.title}
                    {problem.isPremium && (
                      <PremiumBadge>
                        <FaStar size={12} />
                        Premium
                      </PremiumBadge>
                    )}
                  </ProblemTitle>
                  <ProblemMeta>
                    <DifficultyBadge difficulty={problem.difficulty}>
                      {problem.difficulty}
                    </DifficultyBadge>
                    <span>{problem.category}</span>
                  </ProblemMeta>
                </ProblemCard>
              ))}
            </ProblemGrid>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Your Courses</SectionTitle>
              <ViewAll href="/courses">
                View All
                <FaBook size={14} />
              </ViewAll>
            </SectionHeader>
            <ProblemGrid>
              {courses.map(course => (
                <CourseCard key={course.id} href={`/courses/${course.id}`}>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseDescription>{course.description}</CourseDescription>
                  <ProgressContainer>
                    <ProgressLabel>
                      <span>Progress</span>
                      <span>
                        {course.completedModules}/{course.totalModules} Modules
                      </span>
                    </ProgressLabel>
                    <ProgressBar progress={course.progress} />
                  </ProgressContainer>
                </CourseCard>
              ))}
            </ProblemGrid>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Recent Activity</SectionTitle>
              <ViewAll href="/activity">
                View All
                <FaCalendar size={14} />
              </ViewAll>
            </SectionHeader>
            <RecentActivity>
              {recentActivity.map(activity => (
                <ActivityItem key={activity.id}>
                  <ActivityIcon>{activity.icon}</ActivityIcon>
                  <ActivityContent>
                    <h4>{activity.title}</h4>
                    <p>{activity.time}</p>
                  </ActivityContent>
                </ActivityItem>
              ))}
            </RecentActivity>
          </Section>
        </DashboardContent>
      </DashboardContainer>
    </MainLayout>
  );
}
