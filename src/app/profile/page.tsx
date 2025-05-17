'use client';

import React from 'react';
import Layout from '../components/Layout';
import {
  MainContent,
  Section,
  SectionHeader,
  SectionTitle,
  ProfileContainer,
  ProfileCard,
  ProfileHeader,
  ProfileAvatar,
  ProfileName,
  ProfileEmail,
  ProfileSection,
  SectionContent,
  TopicCardGrid,
  TopicCard,
  TopicCardHeader,
  TopicCardContent,
  TopicCardFooter,
  TopicCardStats,
  TopicCardAction,
  ProgressBar
} from '../components/StyledComponents';

const userStats = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/default-avatar.svg',
  joinDate: 'January 2024',
  completedTopics: 12,
  totalPoints: 2500,
  rank: 'Gold',
  streak: 15
};

const recentActivity = [
  {
    id: 1,
    title: 'React Fundamentals',
    progress: 100,
    completedAt: '2 days ago',
    points: 200
  },
  {
    id: 2,
    title: 'Node.js Mastery',
    progress: 75,
    completedAt: '5 days ago',
    points: 150
  },
  {
    id: 3,
    title: 'TypeScript Advanced',
    progress: 50,
    completedAt: '1 week ago',
    points: 100
  }
];

export default function ProfilePage() {
  return (
    <Layout>
      <MainContent>
        <ProfileContainer>
          <ProfileCard>
            <ProfileHeader>
              <ProfileAvatar
                src={userStats.avatar}
                alt={userStats.name}
                width={120}
                height={120}
              />
              <ProfileName>{userStats.name}</ProfileName>
              <ProfileEmail>{userStats.email}</ProfileEmail>
            </ProfileHeader>

            <ProfileSection>
              <SectionHeader>
                <SectionTitle>Statistics</SectionTitle>
              </SectionHeader>
              <SectionContent>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div>
                    <h4>Member Since</h4>
                    <p>{userStats.joinDate}</p>
                  </div>
                  <div>
                    <h4>Rank</h4>
                    <p>{userStats.rank}</p>
                  </div>
                  <div>
                    <h4>Completed Topics</h4>
                    <p>{userStats.completedTopics}</p>
                  </div>
                  <div>
                    <h4>Total Points</h4>
                    <p>{userStats.totalPoints}</p>
                  </div>
                  <div>
                    <h4>Current Streak</h4>
                    <p>{userStats.streak} days</p>
                  </div>
                </div>
              </SectionContent>
            </ProfileSection>

            <ProfileSection>
              <SectionHeader>
                <SectionTitle>Recent Activity</SectionTitle>
              </SectionHeader>
              <TopicCardGrid>
                {recentActivity.map(activity => (
                  <TopicCard key={activity.id}>
                    <TopicCardHeader>
                      <span>Completed {activity.completedAt}</span>
                    </TopicCardHeader>
                    <TopicCardContent>
                      <h3>{activity.title}</h3>
                      <ProgressBar progress={activity.progress}>
                        <div />
                      </ProgressBar>
                    </TopicCardContent>
                    <TopicCardFooter>
                      <TopicCardStats>
                        <span>Points: {activity.points}</span>
                        <span>Progress: {activity.progress}%</span>
                      </TopicCardStats>
                      <TopicCardAction>
                        Review
                      </TopicCardAction>
                    </TopicCardFooter>
                  </TopicCard>
                ))}
              </TopicCardGrid>
            </ProfileSection>
          </ProfileCard>
        </ProfileContainer>
      </MainContent>
    </Layout>
  );
} 