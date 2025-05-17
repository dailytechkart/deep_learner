'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import ProtectedRoute from '../components/ProtectedRoute';

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: ${props => props.theme.colors.sidebar};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  font-weight: bold;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  font-size: 2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const Email = styled.p`
  color: ${props => props.theme.colors.secondary};
  margin-bottom: 1rem;
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.875rem;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const AchievementCard = styled.div`
  padding: 1.5rem;
  background-color: ${props => props.theme.colors.sidebar};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AchievementTitle = styled.h3`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

const AchievementDescription = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.875rem;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  padding: 1rem;
  background-color: ${props => props.theme.colors.sidebar};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActivityTitle = styled.h3`
  font-size: 1rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-size: 0.875rem;
`;

interface Achievement {
  id: string;
  type: string;
  title: string;
  description: string;
  earnedAt: string;
}

interface Activity {
  id: string;
  type: string;
  title: string;
  timestamp: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();

        if (response.ok) {
          setAchievements(data.achievements || []);
          setActivities(data.activities || []);
        }
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <ProtectedRoute>
      <ProfileContainer>
        <ProfileHeader>
          <Avatar>{getInitials(user.name)}</Avatar>
          <UserInfo>
            <Name>{user.name}</Name>
            <Email>{user.email}</Email>
            <Stats>
              <StatItem>
                <StatValue>{user.progress?.completedTopics?.length || 0}</StatValue>
                <StatLabel>Topics Completed</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{user.progress?.streak || 0}</StatValue>
                <StatLabel>Day Streak</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>
                  {Object.values(user.progress?.timeSpent || {}).reduce((a, b) => a + b, 0)}h
                </StatValue>
                <StatLabel>Time Spent</StatLabel>
              </StatItem>
            </Stats>
          </UserInfo>
        </ProfileHeader>

        <Section>
          <SectionTitle>Achievements</SectionTitle>
          <AchievementsGrid>
            {achievements.map(achievement => (
              <AchievementCard key={achievement.id}>
                <AchievementTitle>{achievement.title}</AchievementTitle>
                <AchievementDescription>{achievement.description}</AchievementDescription>
              </AchievementCard>
            ))}
          </AchievementsGrid>
        </Section>

        <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityList>
            {activities.map(activity => (
              <ActivityItem key={activity.id}>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityTime>
                  {new Date(activity.timestamp).toLocaleDateString()}
                </ActivityTime>
              </ActivityItem>
            ))}
          </ActivityList>
        </Section>
      </ProfileContainer>
    </ProtectedRoute>
  );
} 