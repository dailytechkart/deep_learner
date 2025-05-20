'use client';

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
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

// Styled Components
const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.lg};
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: ${props => props.theme.spacing.lg};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const StatValue = styled.div`
  font-size: ${props => props.theme.typography.h3.fontSize};
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
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
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
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-bottom: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.text};
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

const ProfileInfo = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.sm} 0;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const InfoValue = styled.span`
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const BadgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const BadgeIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const BadgeName = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || 'User',
    email: user?.email || '',
    joinDate: 'January 2024',
    lastActive: '2 hours ago',
    timezone: 'UTC+5:30',
    language: 'English',
  });

  const userStats = {
    completedTopics: 24,
    totalPoints: 1250,
    rank: 'Advanced',
    streak: 7,
    totalHours: 48,
    quizzesCompleted: 12,
    averageScore: 85,
  };

  const skills = [
    { name: 'System Design', level: 85, progress: 85 },
    { name: 'Data Structures', level: 75, progress: 75 },
    { name: 'Algorithms', level: 80, progress: 80 },
    { name: 'Problem Solving', level: 90, progress: 90 },
  ];

  const badges = [
    { id: 1, name: 'Quick Learner', icon: '⚡' },
    { id: 2, name: 'Consistent', icon: '📈' },
    { id: 3, name: 'Problem Solver', icon: '🎯' },
    { id: 4, name: 'Team Player', icon: '🤝' },
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

        <ProfileGrid>
          <Sidebar>
            <ProfileHeader>
              <ProfileAvatar
                src={user?.photoURL || '/default-avatar.png'}
                alt={profileData.displayName}
              />
              <ProfileName>{profileData.displayName}</ProfileName>
              <ProfileEmail>{profileData.email}</ProfileEmail>
            </ProfileHeader>

            <ProfileInfo>
              <InfoItem>
                <InfoLabel>Member Since</InfoLabel>
                <InfoValue>{profileData.joinDate}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Last Active</InfoLabel>
                <InfoValue>{profileData.lastActive}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Timezone</InfoLabel>
                <InfoValue>{profileData.timezone}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Language</InfoLabel>
                <InfoValue>{profileData.language}</InfoValue>
              </InfoItem>
            </ProfileInfo>

            <Section>
              <SectionHeader>
                <SectionTitle>Badges</SectionTitle>
              </SectionHeader>
              <BadgeGrid>
                {badges.map(badge => (
                  <Badge key={badge.id}>
                    <BadgeIcon>{badge.icon}</BadgeIcon>
                    <BadgeName>{badge.name}</BadgeName>
                  </Badge>
                ))}
              </BadgeGrid>
            </Section>
          </Sidebar>

          <MainContent>
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
              <StatCard>
                <StatValue>{userStats.totalHours}</StatValue>
                <StatLabel>Learning Hours</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>{userStats.averageScore}%</StatValue>
                <StatLabel>Average Score</StatLabel>
              </StatCard>
            </StatsGrid>

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
          </MainContent>
        </ProfileGrid>
      </ProfileCard>
    </ProfileContainer>
  );
}
