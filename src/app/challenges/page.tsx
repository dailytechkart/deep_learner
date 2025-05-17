'use client';

import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  MainContent,
  Section,
  SectionHeader,
  SectionTitle,
  TopicCardGrid,
  TopicCard,
  TopicCardHeader,
  TopicCardContent,
  TopicCardFooter,
  TopicCardStats,
  TopicCardAction,
  CategoryList,
  CategoryButton
} from '../components/StyledComponents';

const categories = [
  { id: 'all', name: 'All Challenges', count: 15 },
  { id: 'ongoing', name: 'Ongoing', count: 5 },
  { id: 'upcoming', name: 'Upcoming', count: 5 },
  { id: 'completed', name: 'Completed', count: 5 }
];

const challenges = [
  {
    id: 1,
    title: 'Weekly Algorithm Challenge',
    description: 'Solve 5 algorithm problems in 24 hours. Compete with other developers!',
    status: 'ongoing',
    participants: 150,
    prize: '$500',
    endDate: '2024-03-20'
  },
  {
    id: 2,
    title: 'Frontend Master Challenge',
    description: 'Build a responsive dashboard using React and TypeScript.',
    status: 'upcoming',
    participants: 0,
    prize: '$300',
    startDate: '2024-03-25'
  },
  {
    id: 3,
    title: 'System Design Competition',
    description: 'Design a scalable e-commerce platform architecture.',
    status: 'completed',
    participants: 200,
    prize: '$1000',
    endDate: '2024-03-15'
  }
];

export default function ChallengesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredChallenges = selectedCategory === 'all'
    ? challenges
    : challenges.filter(challenge => challenge.status === selectedCategory);

  return (
    <Layout>
      <MainContent>
        <Section>
          <SectionHeader>
            <SectionTitle>Coding Challenges</SectionTitle>
          </SectionHeader>
          <CategoryList>
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <span className="category-count">{category.count}</span>
              </CategoryButton>
            ))}
          </CategoryList>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>Available Challenges</SectionTitle>
          </SectionHeader>
          <TopicCardGrid>
            {filteredChallenges.map(challenge => (
              <TopicCard key={challenge.id}>
                <TopicCardHeader>
                  <span>{challenge.status}</span>
                </TopicCardHeader>
                <TopicCardContent>
                  <h3>{challenge.title}</h3>
                  <p>{challenge.description}</p>
                </TopicCardContent>
                <TopicCardFooter>
                  <TopicCardStats>
                    <span>Prize: {challenge.prize}</span>
                    <span>Participants: {challenge.participants}</span>
                    <span>
                      {challenge.status === 'ongoing' ? 'Ends: ' : 'Starts: '}
                      {challenge.status === 'ongoing' ? challenge.endDate : challenge.startDate}
                    </span>
                  </TopicCardStats>
                  <TopicCardAction>
                    {challenge.status === 'ongoing' ? 'Join Challenge' :
                     challenge.status === 'upcoming' ? 'Set Reminder' : 'View Results'}
                  </TopicCardAction>
                </TopicCardFooter>
              </TopicCard>
            ))}
          </TopicCardGrid>
        </Section>
      </MainContent>
    </Layout>
  );
} 