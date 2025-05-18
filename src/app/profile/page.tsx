'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  ProfileContainer,
  ProfileCard,
  ProfileHeader,
  ProfileAvatar,
  ProfileName,
  ProfileEmail,
  ProfileSection,
  Section,
  SectionHeader,
  SectionTitle,
  SectionContent,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  ProgressBar,
} from '../components/StyledComponents';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.typography.h3};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const SkillCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SkillName = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`;

const SkillLevel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ActivityTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const ActivityItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ActivityTime = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const EditButton = styled(Button)`
  position: absolute;
  top: ${props => props.theme.spacing.lg};
  right: ${props => props.theme.spacing.lg};
`;

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const userStats = {
    completedTopics: 24,
    totalPoints: 1250,
    rank: 'Advanced',
    streak: 7,
  };

  const skills = [
    { name: 'System Design', level: 85, progress: 85 },
    { name: 'Data Structures', level: 75, progress: 75 },
    { name: 'Algorithms', level: 80, progress: 80 },
    { name: 'Problem Solving', level: 90, progress: 90 },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'completed',
      title: 'Completed System Design Basics',
      time: '2 hours ago',
      icon: '✓',
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Earned "Quick Learner" Badge',
      time: '5 hours ago',
      icon: '🏆',
    },
    {
      id: 3,
      type: 'progress',
      title: 'Reached 75% in Data Structures',
      time: '1 day ago',
      icon: '📈',
    },
  ];

  return (
    <ProfileContainer>
      <ProfileCard>
        <EditButton onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </EditButton>
        
        <ProfileHeader>
          <ProfileAvatar src="/avatar-placeholder.png" alt="User Avatar" />
          <ProfileName>John Doe</ProfileName>
          <ProfileEmail>john.doe@example.com</ProfileEmail>
        </ProfileHeader>

        <StatsGrid>
          <StatCard>
            <StatValue>{userStats.completedTopics}</StatValue>
            <StatLabel>Topics Completed</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{userStats.totalPoints}</StatValue>
            <StatLabel>Total Points</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{userStats.rank}</StatValue>
            <StatLabel>Current Rank</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{userStats.streak}</StatValue>
            <StatLabel>Day Streak</StatLabel>
          </StatCard>
        </StatsGrid>

        <ProfileSection>
          <Section>
            <SectionHeader>
              <SectionTitle>Skills Progress</SectionTitle>
            </SectionHeader>
            <SectionContent>
              <SkillsGrid>
                {skills.map((skill, index) => (
                  <SkillCard key={index}>
                    <SkillHeader>
                      <SkillName>{skill.name}</SkillName>
                      <SkillLevel>Level {skill.level}</SkillLevel>
                    </SkillHeader>
                    <ProgressBar progress={skill.progress} />
                  </SkillCard>
                ))}
              </SkillsGrid>
            </SectionContent>
          </Section>
        </ProfileSection>

        <ProfileSection>
          <Section>
            <SectionHeader>
              <SectionTitle>Recent Activity</SectionTitle>
            </SectionHeader>
            <SectionContent>
              <ActivityTimeline>
                {recentActivity.map((activity, index) => (
                  <ActivityItem
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ActivityIcon>{activity.icon}</ActivityIcon>
                    <ActivityContent>
                      <ActivityTitle>{activity.title}</ActivityTitle>
                      <ActivityTime>{activity.time}</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                ))}
              </ActivityTimeline>
            </SectionContent>
          </Section>
        </ProfileSection>
      </ProfileCard>
    </ProfileContainer>
  );
} 