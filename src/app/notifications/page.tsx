'use client';

import React, { useState } from 'react';
import {
  PageContainer,
  MainContent,
  Section,
  SectionHeader,
  SectionTitle,
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
  { id: 'all', name: 'All Notifications', count: 15 },
  { id: 'unread', name: 'Unread', count: 5 },
  { id: 'mentions', name: 'Mentions', count: 3 },
  { id: 'updates', name: 'Updates', count: 7 }
];

const notifications = [
  {
    id: 1,
    type: 'mention',
    title: 'New mention in discussion',
    content: 'Jane Smith mentioned you in a discussion about React performance.',
    author: {
      name: 'Jane Smith',
      avatar: '/default-avatar.svg'
    },
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 2,
    type: 'update',
    title: 'Course update available',
    content: 'New content has been added to your "React Fundamentals" course.',
    author: {
      name: 'System',
      avatar: '/default-avatar.svg'
    },
    timestamp: '5 hours ago',
    read: true
  },
  {
    id: 3,
    type: 'achievement',
    title: 'New achievement unlocked',
    content: 'Congratulations! You\'ve completed 10 coding challenges.',
    author: {
      name: 'System',
      avatar: '/default-avatar.svg'
    },
    timestamp: '1 day ago',
    read: true
  }
];

export default function NotificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNotifications = selectedCategory === 'all'
    ? notifications
    : selectedCategory === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === selectedCategory);

  const markAsRead = (id: number) => {
    // Here you would typically make an API call to mark the notification as read
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // Here you would typically make an API call to mark all notifications as read
    console.log('Marking all notifications as read');
  };

  return (
    <PageContainer>
      <MainContent>
        <Section>
          <SectionHeader>
            <SectionTitle>Notifications</SectionTitle>
            <TopicCardAction onClick={markAllAsRead}>
              Mark all as read
            </TopicCardAction>
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
          {filteredNotifications.map(notification => (
            <TopicCard key={notification.id} style={{ marginBottom: '1rem' }}>
              <TopicCardHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <UserAvatar
                    src={notification.author.avatar}
                    alt={notification.author.name}
                    width={24}
                    height={24}
                  />
                  <UserName>{notification.author.name}</UserName>
                </div>
                <span>{notification.type}</span>
              </TopicCardHeader>
              <TopicCardContent>
                <h3>{notification.title}</h3>
                <p>{notification.content}</p>
              </TopicCardContent>
              <TopicCardFooter>
                <TopicCardStats>
                  <span>{notification.timestamp}</span>
                </TopicCardStats>
                {!notification.read && (
                  <TopicCardAction onClick={() => markAsRead(notification.id)}>
                    Mark as read
                  </TopicCardAction>
                )}
              </TopicCardFooter>
            </TopicCard>
          ))}
        </Section>
      </MainContent>
    </PageContainer>
  );
} 