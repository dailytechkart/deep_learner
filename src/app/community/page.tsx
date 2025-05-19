'use client';

import React, { useState } from 'react';
import ClientLayout from '../components/ClientLayout';
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
  CategoryButton,
  UserAvatar,
  UserName
} from '../components/StyledComponents';

const categories = [
  { id: 'all', name: 'All Discussions', count: 45 },
  { id: 'questions', name: 'Questions', count: 20 },
  { id: 'showcase', name: 'Showcase', count: 15 },
  { id: 'help', name: 'Help', count: 10 }
];

const discussions = [
  {
    id: 1,
    title: 'Best practices for React performance optimization',
    content: 'What are your go-to techniques for optimizing React applications?',
    category: 'questions',
    author: {
      name: 'John Doe',
      avatar: '/default-avatar.svg'
    },
    replies: 12,
    views: 150,
    lastActivity: '2 hours ago'
  },
  {
    id: 2,
    title: 'My portfolio built with Next.js and Tailwind',
    content: 'Check out my latest project using modern web technologies!',
    category: 'showcase',
    author: {
      name: 'Jane Smith',
      avatar: '/default-avatar.svg'
    },
    replies: 8,
    views: 200,
    lastActivity: '5 hours ago'
  },
  {
    id: 3,
    title: 'Need help with TypeScript generics',
    content: 'Struggling with implementing generic types in my project...',
    category: 'help',
    author: {
      name: 'Mike Johnson',
      avatar: '/default-avatar.svg'
    },
    replies: 5,
    views: 100,
    lastActivity: '1 day ago'
  }
];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDiscussions = selectedCategory === 'all'
    ? discussions
    : discussions.filter(discussion => discussion.category === selectedCategory);

  return (
    <ClientLayout>
      <MainContent>
        <Section>
          <SectionHeader>
            <SectionTitle>Community Discussions</SectionTitle>
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
            <SectionTitle>Recent Discussions</SectionTitle>
          </SectionHeader>
          <TopicCardGrid>
            {filteredDiscussions.map(discussion => (
              <TopicCard key={discussion.id}>
                <TopicCardHeader>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <UserAvatar
                      src={discussion.author.avatar}
                      alt={discussion.author.name}
                      width={24}
                      height={24}
                    />
                    <UserName>{discussion.author.name}</UserName>
                  </div>
                  <span>{discussion.category}</span>
                </TopicCardHeader>
                <TopicCardContent>
                  <h3>{discussion.title}</h3>
                  <p>{discussion.content}</p>
                </TopicCardContent>
                <TopicCardFooter>
                  <TopicCardStats>
                    <span>{discussion.replies} replies</span>
                    <span>{discussion.views} views</span>
                    <span>Last activity: {discussion.lastActivity}</span>
                  </TopicCardStats>
                  <TopicCardAction>
                    Join Discussion
                  </TopicCardAction>
                </TopicCardFooter>
              </TopicCard>
            ))}
          </TopicCardGrid>
        </Section>
      </MainContent>
    </ClientLayout>
  );
} 