'use client';

import React from 'react';
import Mermaid from '@/components/Mermaid';
import styled from 'styled-components';
import { MainLayout } from '@/components/MainLayout';

const hldDiagram = `flowchart TD
  Client[Client Apps]
  LB[Load Balancer]
  API[REST API Servers]
  Cache[(Cache)]
  DB[(Database)]
  Search[Search Service]

  Client --> LB
  LB --> API
  API --> Cache
  API --> DB
  API --> Search
`;

const dataModelDiagram = `erDiagram
  Post {
    string id
    string content
    string authorId
    datetime createdAt
    array likes
    array comments
    string status
  }
  User {
    string id
    string username
    string email
    string status
  }
  Comment {
    string id
    string postId
    string authorId
    string content
    datetime createdAt
  }
  Post ||--o{ Comment : has
  User ||--o{ Post : creates
  User ||--o{ Comment : writes
`;

const scrollFlowDiagram = `sequenceDiagram
  participant Client
  participant API
  participant Cache
  participant DB

  Client->>API: Initial load (limit=20)
  API->>Cache: Check cache
  Cache-->>API: Return cached data
  API-->>Client: Return posts

  Note over Client: User scrolls near bottom
  Client->>API: Load more (offset=20, limit=20)
  API->>Cache: Check cache
  Cache-->>API: Return cached data
  API-->>Client: Return next batch
`;

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  padding-top: 4rem;
`;

const MainContent = styled.main`
  width: 100%;
  max-width: 1200px;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  overflow-y: auto;
  margin: 0 auto;
`;

const LeftPanel = styled.aside`
  width: 320px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  height: calc(100vh - 6rem);
  position: fixed;
  top: 5rem;
  left: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.border} transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`;

const LeftPanelTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const RightPanel = styled.aside`
  width: 280px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  height: calc(100vh - 6rem);
  position: fixed;
  top: 5rem;
  right: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.border} transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
  }
`;

const ContentSection = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 2.5rem;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const SectionTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.3;
`;

const SectionContent = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 900px;
  margin: 0 auto;
`;

const DiagramContainer = styled.div`
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  max-width: 900px;
`;

const DiagramCaption = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 1rem auto 0;
  max-width: 900px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1.5rem auto;
  max-width: 900px;
`;

const ListItem = styled.li`
  margin: 1rem 0;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Blockquote = styled.blockquote`
  margin: 2rem auto;
  padding: 1.5rem 2rem;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-style: italic;
  max-width: 900px;
`;

const systemDesignProblems = [
  {
    id: 'chat-system',
    title: 'Real-time Chat System',
    difficulty: 'Hard',
    timeEstimate: '60-90 min',
  },
  {
    id: 'infinite-scroll',
    title: 'Infinite Scroll Feed',
    difficulty: 'Medium',
    timeEstimate: '45-60 min',
  },
  // Add other problems here
];

const ProblemLink = styled.a`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    background: ${({ theme }) => theme.colors.backgroundHover};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProblemTitle = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ProblemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 0.5rem;
`;

const TimeEstimate = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ theme, difficulty }) =>
    difficulty === 'Hard'
      ? theme.colors.status.error
      : difficulty === 'Medium'
      ? theme.colors.status.warning
      : theme.colors.status.success};
  color: white;
`;

const TableOfContentsLink = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.5rem;
  margin: 0.25rem 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundHover};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionHeader = styled.div`
  margin-bottom: 1rem;
`;

const RightPanelSectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BadgeGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Badge = styled.span<{ variant?: 'error' | 'info' | 'warning' }>`
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ theme, variant }) =>
    variant === 'error'
      ? theme.colors.status.error
      : variant === 'info'
      ? theme.colors.status.info
      : variant === 'warning'
      ? theme.colors.status.warning
      : theme.colors.primary};
  color: white;
`;

const CompanyBadge = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: ${({ theme }) => theme.colors.backgroundHover};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const CompanyName = styled.span`
  font-weight: 500;
`;

const CompanyCount = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const InfiniteScrollAnswer = () => {
  const [activeSection, setActiveSection] = React.useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'requirements', 'architecture', 'data-model', 'scroll-flow', 'scaling', 'security', 'monitoring'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftPanel = (
    <LeftPanel>
      <LeftPanelTitle>System Design Problems</LeftPanelTitle>
      {systemDesignProblems.map((problem) => (
        <ProblemLink
          key={problem.id}
          href={`/system-design/problems/${problem.id}`}
          className={problem.id === 'infinite-scroll' ? 'active' : ''}
        >
          <ProblemTitle>{problem.title}</ProblemTitle>
          <ProblemMeta>
            <DifficultyBadge difficulty={problem.difficulty}>
              {problem.difficulty}
            </DifficultyBadge>
            <TimeEstimate>
              <span>⏱️</span>
              {problem.timeEstimate}
            </TimeEstimate>
          </ProblemMeta>
        </ProblemLink>
      ))}
    </LeftPanel>
  );

  const rightPanel = (
    <RightPanel>
      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Table of Contents</RightPanelSectionTitle>
        </SectionHeader>
        <InfoContent>
          <TableOfContentsLink 
            onClick={() => scrollToSection('overview')}
            className={activeSection === 'overview' ? 'active' : ''}
          >
            Overview
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('requirements')}
            className={activeSection === 'requirements' ? 'active' : ''}
          >
            Requirements
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('architecture')}
            className={activeSection === 'architecture' ? 'active' : ''}
          >
            Architecture
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('data-model')}
            className={activeSection === 'data-model' ? 'active' : ''}
          >
            Data Model
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('scroll-flow')}
            className={activeSection === 'scroll-flow' ? 'active' : ''}
          >
            Scroll Flow
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('scaling')}
            className={activeSection === 'scaling' ? 'active' : ''}
          >
            Scaling
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('security')}
            className={activeSection === 'security' ? 'active' : ''}
          >
            Security
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('monitoring')}
            className={activeSection === 'monitoring' ? 'active' : ''}
          >
            Monitoring
          </TableOfContentsLink>
        </InfoContent>
      </InfoCard>

      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Problem Stats</RightPanelSectionTitle>
        </SectionHeader>
        <BadgeGroup>
          <Badge variant="warning">Medium</Badge>
          <Badge variant="info">60 min</Badge>
          <Badge variant="info">Intermediate</Badge>
        </BadgeGroup>
      </InfoCard>

      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Key Concepts</RightPanelSectionTitle>
        </SectionHeader>
        <BadgeGroup>
          <Badge variant="info">Pagination</Badge>
          <Badge variant="info">Caching</Badge>
          <Badge variant="info">Performance</Badge>
          <Badge variant="info">UX</Badge>
          <Badge variant="info">Optimization</Badge>
        </BadgeGroup>
      </InfoCard>

      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Asked By</RightPanelSectionTitle>
        </SectionHeader>
        <InfoContent>
          <CompanyBadge>
            <CompanyName>Facebook</CompanyName>
            <CompanyCount>15 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Twitter</CompanyName>
            <CompanyCount>12 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Instagram</CompanyName>
            <CompanyCount>10 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>LinkedIn</CompanyName>
            <CompanyCount>8 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Pinterest</CompanyName>
            <CompanyCount>6 times</CompanyCount>
          </CompanyBadge>
        </InfoContent>
      </InfoCard>
    </RightPanel>
  );

  const mainContent = (
    <>
      <ContentSection id="overview">
        <SectionTitle>Infinite Scroll Feed</SectionTitle>
        <SectionContent>
          <p>
            Design a scalable infinite scroll feed system that efficiently loads and displays content
            as users scroll, similar to social media feeds. The system should handle high traffic,
            maintain performance, and provide a smooth user experience.
          </p>
        </SectionContent>
      </ContentSection>

      <ContentSection id="requirements">
        <SectionTitle>Requirements</SectionTitle>
        <SectionContent>
          <Blockquote>
            Understanding the requirements is crucial for designing a system that meets user needs
            while maintaining scalability and performance.
          </Blockquote>
          <strong>Functional Requirements:</strong>
          <List>
            <ListItem>Load content dynamically as user scrolls</ListItem>
            <ListItem>Support various content types (text, images, videos)</ListItem>
            <ListItem>Maintain scroll position on page refresh</ListItem>
            <ListItem>Handle content updates in real-time</ListItem>
            <ListItem>Support content filtering and sorting</ListItem>
            <ListItem>Implement content search functionality</ListItem>
          </List>
          <strong style={{ display: 'block', marginTop: '1.5rem' }}>Non-Functional Requirements:</strong>
          <List>
            <ListItem>Low latency (&lt;100ms for content loading)</ListItem>
            <ListItem>High availability (99.9%)</ListItem>
            <ListItem>Scalability to handle millions of users</ListItem>
            <ListItem>Efficient memory usage</ListItem>
            <ListItem>Optimized network usage</ListItem>
            <ListItem>Responsive design for all devices</ListItem>
          </List>
        </SectionContent>
      </ContentSection>

      <ContentSection id="architecture">
        <SectionTitle>High-Level Architecture</SectionTitle>
        <SectionContent>
          <p>
            The system uses a client-server architecture with caching layers and optimized data
            loading strategies. The architecture is designed to handle high traffic and provide
            fast content delivery.
          </p>
          <DiagramContainer>
            <Mermaid chart={hldDiagram} />
          </DiagramContainer>
          <DiagramCaption>
            System architecture showing client apps, load balancer, API servers, cache, and database layers.
          </DiagramCaption>
        </SectionContent>
      </ContentSection>

      <ContentSection id="data-model">
        <SectionTitle>Data Model</SectionTitle>
        <SectionContent>
          <DiagramContainer>
            <Mermaid chart={dataModelDiagram} />
          </DiagramContainer>
          <DiagramCaption>
            Entity relationship diagram showing the data model for posts, users, and comments.
          </DiagramCaption>
          <p style={{ margin: '0 0 2.2rem 0' }}>
            The data model is designed for efficient querying and scaling, with separate
            collections for posts, users, and comments. The schema supports all required
            features while maintaining data consistency.
          </p>
        </SectionContent>
      </ContentSection>

      <ContentSection id="scroll-flow">
        <SectionTitle>Scroll Flow</SectionTitle>
        <SectionContent>
          <DiagramContainer>
            <Mermaid chart={scrollFlowDiagram} />
          </DiagramContainer>
          <DiagramCaption>
            Sequence diagram illustrating the scroll flow and content loading process.
          </DiagramCaption>
          <p style={{ margin: '0 0 2.2rem 0' }}>
            The scroll flow ensures efficient content loading through pagination, caching,
            and optimized data fetching. The system handles content updates and maintains
            scroll position effectively.
          </p>
        </SectionContent>
      </ContentSection>

      <ContentSection id="scaling">
        <SectionTitle>Scaling Considerations</SectionTitle>
        <SectionContent>
          <List>
            <ListItem>
              <strong>Content Delivery:</strong>
              <List>
                <ListItem>Implement content caching at multiple levels</ListItem>
                <ListItem>Use CDN for static content delivery</ListItem>
                <ListItem>Implement content preloading strategies</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Database:</strong>
              <List>
                <ListItem>Implement database sharding</ListItem>
                <ListItem>Use read replicas for high availability</ListItem>
                <ListItem>Optimize query performance</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Client-side:</strong>
              <List>
                <ListItem>Implement virtual scrolling</ListItem>
                <ListItem>Use content placeholders</ListItem>
                <ListItem>Optimize memory usage</ListItem>
              </List>
            </ListItem>
          </List>
        </SectionContent>
      </ContentSection>

      <ContentSection id="security">
        <SectionTitle>Security Considerations</SectionTitle>
        <SectionContent>
          <List>
            <ListItem>Implement rate limiting</ListItem>
            <ListItem>Validate and sanitize user input</ListItem>
            <ListItem>Implement content moderation</ListItem>
            <ListItem>Protect against XSS attacks</ListItem>
            <ListItem>Implement proper authentication</ListItem>
            <ListItem>Secure API endpoints</ListItem>
            <ListItem>Monitor for abuse</ListItem>
          </List>
        </SectionContent>
      </ContentSection>

      <ContentSection id="monitoring">
        <SectionTitle>Monitoring and Reliability</SectionTitle>
        <SectionContent>
          <List>
            <ListItem>Monitor scroll performance metrics</ListItem>
            <ListItem>Track content loading times</ListItem>
            <ListItem>Monitor cache hit rates</ListItem>
            <ListItem>Track error rates</ListItem>
            <ListItem>Monitor memory usage</ListItem>
            <ListItem>Implement automated alerts</ListItem>
            <ListItem>Track user engagement metrics</ListItem>
          </List>
        </SectionContent>
      </ContentSection>
    </>
  );

  return (
    <MainLayout>
      <PageContainer>
        <MainContent>
          {leftPanel}
          {mainContent}
          {rightPanel}
        </MainContent>
      </PageContainer>
    </MainLayout>
  );
};

export default InfiniteScrollAnswer; 