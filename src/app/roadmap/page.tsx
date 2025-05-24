'use client';

import React, { useState } from 'react';
import { FaCheck, FaClock, FaUsers, FaStar, FaGraduationCap, FaBook, FaCode } from 'react-icons/fa';
import { StatsHero } from '@/components/shared/StatsHero';
import {
  Container,
  Content,
  Title,
  Description,
  RoadmapSection,
  SectionTitle,
  RoadmapGrid,
  RoadmapCard,
  CardTitle,
  CardContent,
  ProgressBar,
  SectionProgress,
  SectionStats,
  Stat,
} from './RoadmapPage.styled';

const RoadmapPage = () => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (itemId: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const getSectionProgress = (items: string[]) => {
    const completed = items.filter(item => completedItems[item]).length;
    return (completed / items.length) * 100;
  };

  const renderCard = (title: string, items: string[], sectionId: string) => (
    <RoadmapCard>
      <CardTitle>{title}</CardTitle>
      <CardContent>
        <ul>
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => toggleItem(`${sectionId}-${index}`)}
              style={{
                cursor: 'pointer',
                textDecoration: completedItems[`${sectionId}-${index}`] ? 'line-through' : 'none',
                opacity: completedItems[`${sectionId}-${index}`] ? 0.7 : 1,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
      <SectionStats>
        <Stat>
          <FaCheck />
          {items.filter((_, index) => completedItems[`${sectionId}-${index}`]).length} completed
        </Stat>
        <Stat>
          <FaClock />
          {items.length} total
        </Stat>
      </SectionStats>
      <ProgressBar
        progress={getSectionProgress(items.map((_, index) => `${sectionId}-${index}`))}
      />
    </RoadmapCard>
  );

  const stats = [
    {
      icon: <FaUsers />,
      value: '10k+',
      label: 'Active Learners',
    },
    {
      icon: <FaStar />,
      value: '4.8',
      label: 'Average Rating',
    },
    {
      icon: <FaGraduationCap />,
      value: '500+',
      label: 'Learning Hours',
    },
  ];

  return (
    <Container>
      <Content>
        <Title>Frontend Development Roadmap</Title>
        <Description>
          A comprehensive guide to becoming a frontend developer, from basics to advanced concepts.
          Click on items to mark them as completed and track your progress.
        </Description>

        <StatsHero
          title="Master Frontend Development"
          description="Join thousands of developers who have successfully transformed their careers through our comprehensive learning path."
          stats={stats}
        />

        <RoadmapSection>
          <SectionTitle>1. Web Fundamentals</SectionTitle>
          <SectionProgress>
            <FaBook /> Essential knowledge for every frontend developer
          </SectionProgress>
          <RoadmapGrid>
            {renderCard(
              'HTML5 & Accessibility',
              ['Semantic HTML', 'Forms & Validation', 'ARIA & Accessibility', 'SEO Best Practices'],
              'html'
            )}
            {renderCard(
              'CSS3 & Layout',
              ['Flexbox & Grid', 'Responsive Design', 'CSS Variables', 'CSS Architecture'],
              'css'
            )}
            {renderCard(
              'JavaScript Fundamentals',
              ['ES6+ Features', 'DOM Manipulation', 'Async Programming', 'Error Handling'],
              'js'
            )}
          </RoadmapGrid>
        </RoadmapSection>

        <RoadmapSection>
          <SectionTitle>2. Frontend Frameworks</SectionTitle>
          <SectionProgress>
            <FaCode /> Modern tools and frameworks for building web applications
          </SectionProgress>
          <RoadmapGrid>
            {renderCard(
              'React Ecosystem',
              ['React Core Concepts', 'Hooks & Custom Hooks', 'State Management', 'React Router'],
              'react'
            )}
            {renderCard(
              'Next.js & SSR',
              ['Pages & Routing', 'Data Fetching', 'API Routes', 'Deployment'],
              'next'
            )}
            {renderCard(
              'TypeScript',
              ['Type System', 'Interfaces & Types', 'Generics', 'Type Safety'],
              'ts'
            )}
          </RoadmapGrid>
        </RoadmapSection>

        <RoadmapSection>
          <SectionTitle>3. Advanced Frontend</SectionTitle>
          <SectionProgress>
            <FaCode /> Advanced concepts and best practices
          </SectionProgress>
          <RoadmapGrid>
            {renderCard(
              'State Management',
              ['Redux Toolkit', 'Context API', 'Zustand/Jotai', 'React Query'],
              'state'
            )}
            {renderCard(
              'Testing & Quality',
              ['Jest & React Testing', 'E2E Testing', 'Performance Testing', 'Code Quality Tools'],
              'testing'
            )}
            {renderCard(
              'Build Tools & Optimization',
              ['Webpack/Vite', 'Code Splitting', 'Bundle Analysis', 'Performance Optimization'],
              'build'
            )}
          </RoadmapGrid>
        </RoadmapSection>

        <RoadmapSection>
          <SectionTitle>4. Modern Frontend</SectionTitle>
          <SectionProgress>
            <FaCode /> Cutting-edge technologies and practices
          </SectionProgress>
          <RoadmapGrid>
            {renderCard(
              'Styling Solutions',
              ['Styled Components', 'Tailwind CSS', 'CSS Modules', 'Design Systems'],
              'styling'
            )}
            {renderCard(
              'Advanced Patterns',
              ['Micro Frontends', 'Server Components', 'Progressive Web Apps', 'Web Workers'],
              'patterns'
            )}
            {renderCard(
              'DevOps & CI/CD',
              ['Git & GitHub', 'Docker Basics', 'CI/CD Pipelines', 'Monitoring & Analytics'],
              'devops'
            )}
          </RoadmapGrid>
        </RoadmapSection>
      </Content>
    </Container>
  );
};

export default RoadmapPage;
