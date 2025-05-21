'use client';

import React, { ReactNode } from 'react';
import Mermaid from '@/components/Mermaid';
import styled from 'styled-components';
import { FaRocket, FaClock, FaUsers, FaLock, FaLink, FaTachometerAlt, FaComments, FaBell, FaSearch, FaCreditCard, FaFile, FaShoppingCart, FaCar, FaBriefcase, FaVideo } from 'react-icons/fa';
import { MainLayout } from '@/components/MainLayout';

const hldDiagram = `flowchart TD
  Client[Client Apps]
  LB[Load Balancer]
  WS[WebSocket Servers]
  API[REST API Servers]
  MQ[Message Queue]
  MS[Message Service]
  DB[(Database)]
  Cache[(Cache)]
  Search[Search Service]

  Client --> LB
  LB --> WS
  LB --> API
  WS --> MQ
  API --> MQ
  MQ --> MS
  MS --> DB
  MS --> Cache
  MS --> Search
`;

const dataModelDiagram = `erDiagram
  User {
    string id
    string username
    string email
    string status
    datetime lastSeen
  }
  Conversation {
    string id
    string type
    string name
    array participants
    datetime createdAt
  }
  Message {
    string id
    string conversationId
    string senderId
    string content
    string type
    datetime timestamp
    string status
  }
  MessageStatus {
    string id
    string messageId
    string userId
    string status
    datetime timestamp
  }
  User ||--o{ Conversation : participates
  Conversation ||--o{ Message : contains
  Message ||--o{ MessageStatus : has
`;

const messageFlowDiagram = `sequenceDiagram
  participant Client
  participant WS as WebSocket
  participant MQ as Message Queue
  participant MS as Message Service
  participant DB as Database
  participant Cache

  Client->>WS: Connect
  WS->>Cache: Get user status
  Cache-->>WS: Return status
  WS-->>Client: Connection established

  Client->>WS: Send message
  WS->>MQ: Publish message
  MQ->>MS: Process message
  MS->>DB: Store message
  MS->>Cache: Update conversation
  MS->>MQ: Publish delivery status
  MQ->>WS: Broadcast status
  WS-->>Client: Message delivered
`;

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
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
  height: calc(100vh - 4rem);
  padding: 1rem;
  display: flex;
  gap: 1rem;
  position: relative;
  overflow: hidden;
`;

const LeftPanel = styled.aside`
  width: 280px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0.75rem;
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
  flex: 1;
  margin: 0 300px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow-y: auto;
  height: calc(100vh - 6rem);
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

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
  letter-spacing: -0.016em;
`;

const SubSectionTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 600;
  margin: 2.5rem 0 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.3;
  letter-spacing: -0.014em;
`;

const SectionContent = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;

  p {
    margin-bottom: 1.5rem;
  }

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const ListItem = styled.li`
  padding: 0.75rem 0;
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DiagramContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};

  > div {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  svg {
    max-width: 100%;
    height: auto;
  }
`;

const DiagramCaption = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-top: 1rem;
  text-align: center;
  font-style: italic;
`;

const CodeBlock = styled.pre`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 1.5rem;
  margin: 2rem 0;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const InlineCode = styled.code`
  background: ${({ theme }) => theme.colors.background};
  padding: 0.2em 0.4em;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: 'Fira Code', monospace;
  font-size: 0.875em;
  color: ${({ theme }) => theme.colors.primary};
`;

const Blockquote = styled.blockquote`
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  margin: 2rem 0;
  padding: 1rem 0 1rem 1.5rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.125rem;
  line-height: 1.8;
`;

const NavigationItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.body1.fontSize};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const TableOfContentsLink = styled.a`
  display: block;
  padding: 0.35rem 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border-left: 2px solid transparent;
  padding-left: 0.75rem;
  margin-bottom: 0.15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-left-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(4px);
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    border-left-color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const InfoTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const InfoContent = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const StatsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
`;

const ProblemIcon = styled.div`
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 0.9rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 0.2rem;
  transition: all 0.2s ease;
`;

const ProblemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: 0.35rem;
  transition: all 0.2s ease;
`;

const ProblemLink = styled.a`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
  text-decoration: none;
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleY(0);
    transition: transform 0.2s ease;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transform: translateX(2px);
    border-color: ${({ theme }) => theme.colors.border};

    &::before {
      transform: scaleY(1);
    }
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border-color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;

    &::before {
      transform: scaleY(1);
    }

    ${ProblemIcon} {
      color: white;
    }

    ${ProblemMeta} {
      color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const ProblemTitle = styled.div`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 0.1rem 0.35rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: ${({ theme, difficulty }) => {
    switch (difficulty) {
      case 'Easy':
        return theme.colors.status.success;
      case 'Medium':
        return theme.colors.status.warning;
      case 'Hard':
        return theme.colors.status.error;
      default:
        return theme.colors.backgroundAlt;
    }
  }};
  color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Badge = styled.span<{ variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  background: ${({ theme, variant = 'primary' }) => {
    switch (variant) {
      case 'success':
        return theme.colors.status.success;
      case 'warning':
        return theme.colors.status.warning;
      case 'error':
        return theme.colors.status.error;
      case 'info':
        return theme.colors.primary;
      default:
        return theme.colors.primary;
    }
  }};
  color: ${({ theme }) => theme.colors.background};
  margin: 0.15rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const BadgeGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin: 0.35rem 0;
`;

const CompanyBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.6rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 0.35rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CompanyName = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const CompanyCount = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 0.1rem 0.4rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const RightPanelSectionTitle = styled.h4`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const systemDesignProblems = [
  {
    id: 'chat-system',
    title: 'Real-time Chat System',
    difficulty: 'Hard',
    timeEstimate: '60-90 min',
    icon: <FaComments />,
  },
  {
    id: 'infinite-scroll',
    title: 'Infinite Scroll Feed',
    difficulty: 'Medium',
    timeEstimate: '45-60 min',
    icon: <FaRocket />,
  },
  {
    id: 'typeahead',
    title: 'Typeahead/Autocomplete',
    difficulty: 'Medium',
    timeEstimate: '45-60 min',
    icon: <FaSearch />,
  },
  {
    id: 'file-upload',
    title: 'File Upload System',
    difficulty: 'Medium',
    timeEstimate: '45-60 min',
    icon: <FaFile />,
  },
  {
    id: 'notification',
    title: 'Push Notification System',
    difficulty: 'Hard',
    timeEstimate: '60-90 min',
    icon: <FaBell />,
  },
  {
    id: 'rate-limiter',
    title: 'Rate Limiter',
    difficulty: 'Medium',
    timeEstimate: '45-60 min',
    icon: <FaTachometerAlt />,
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    difficulty: 'Hard',
    timeEstimate: '60-90 min',
    icon: <FaUsers />,
  },
  {
    id: 'video-player',
    title: 'Video Player System',
    difficulty: 'Hard',
    timeEstimate: '60-90 min',
    icon: <FaVideo />,
  },
  {
    id: 'e-commerce',
    title: 'E-commerce Product Page',
    difficulty: 'Hard',
    timeEstimate: '60-90 min',
    icon: <FaShoppingCart />,
  },
  {
    id: 'calendar',
    title: 'Calendar System',
    difficulty: 'Medium',
    timeEstimate: '45-60 min',
    icon: <FaClock />,
  },
  {
    id: 'payment',
    title: 'Payment Integration',
    difficulty: 'Hard',
    timeEstimate: '60-90 min',
    icon: <FaCreditCard />,
  },
  {
    id: 'job-board',
    title: 'Job Board Platform',
    difficulty: 'Medium',
    timeEstimate: '45-60 min',
    icon: <FaBriefcase />,
  }
];

const ProblemCategory = styled.div`
  margin-bottom: 1.5rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const CategoryTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.75rem;
  padding-left: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    display: block;
    width: 3px;
    height: 12px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
`;

const section = (title: string, children: ReactNode) => (
  <div>
    <SectionTitle>{title}</SectionTitle>
    <SectionContent>{children}</SectionContent>
  </div>
);

const ChatSystemAnswer = () => {
  const [activeSection, setActiveSection] = React.useState('');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Adjust this value based on your header height
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
      const sections = ['overview', 'requirements', 'architecture', 'data-model', 'message-flow', 'scaling', 'security', 'monitoring'];
      
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
      {systemDesignProblems.map((problem) => (
        <ProblemLink
          key={problem.id}
          href={`/system-design/problems/${problem.id}`}
          className={problem.id === 'chat-system' ? 'active' : ''}
        >
          <ProblemIcon>{problem.icon}</ProblemIcon>
          <ProblemTitle>{problem.title}</ProblemTitle>
          <ProblemMeta>
            <DifficultyBadge difficulty={problem.difficulty}>
              {problem.difficulty}
            </DifficultyBadge>
            <span>{problem.timeEstimate}</span>
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
            High-Level Design
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('data-model')}
            className={activeSection === 'data-model' ? 'active' : ''}
          >
            Data Model
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('message-flow')}
            className={activeSection === 'message-flow' ? 'active' : ''}
          >
            Message Flow
          </TableOfContentsLink>
          <TableOfContentsLink 
            onClick={() => scrollToSection('scaling')}
            className={activeSection === 'scaling' ? 'active' : ''}
          >
            Scaling Considerations
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
          <Badge variant="error">Hard</Badge>
          <Badge variant="info">90 min</Badge>
          <Badge variant="warning">Advanced</Badge>
        </BadgeGroup>
      </InfoCard>

      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Key Concepts</RightPanelSectionTitle>
        </SectionHeader>
        <BadgeGroup>
          <Badge variant="info">WebSocket</Badge>
          <Badge variant="info">Message Queues</Badge>
          <Badge variant="info">Real-time</Badge>
          <Badge variant="info">Scalability</Badge>
          <Badge variant="info">Data Consistency</Badge>
        </BadgeGroup>
      </InfoCard>

      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>Asked By</RightPanelSectionTitle>
        </SectionHeader>
        <InfoContent>
          <CompanyBadge>
            <CompanyName>Meta</CompanyName>
            <CompanyCount>12 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Google</CompanyName>
            <CompanyCount>8 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Amazon</CompanyName>
            <CompanyCount>6 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>Microsoft</CompanyName>
            <CompanyCount>5 times</CompanyCount>
          </CompanyBadge>
          <CompanyBadge>
            <CompanyName>LinkedIn</CompanyName>
            <CompanyCount>4 times</CompanyCount>
          </CompanyBadge>
        </InfoContent>
      </InfoCard>
    </RightPanel>
  );

  const mainContent = (
    <ContentSection>
      <section id="overview">
        <SectionTitle>Real-time Chat System</SectionTitle>
        <SectionContent>
          <p>
            A scalable, real-time chat system architecture supporting millions of concurrent users,
            with features like message delivery, read receipts, typing indicators, and message
            persistence. This system design explores the challenges and solutions for building a
            modern chat application at scale.
          </p>
        </SectionContent>
      </section>

      <section id="requirements">
        {section(
          '1. Clarifying Questions',
          <List>
            <ListItem>What is the expected number of concurrent users?</ListItem>
            <ListItem>What is the expected message volume per second?</ListItem>
            <ListItem>What is the maximum group size?</ListItem>
            <ListItem>What are the message delivery guarantees required?</ListItem>
            <ListItem>What is the expected message retention period?</ListItem>
            <ListItem>What are the security requirements?</ListItem>
            <ListItem>What are the compliance requirements (GDPR, etc.)?</ListItem>
            <ListItem>What are the backup and disaster recovery requirements?</ListItem>
          </List>
        )}
      </section>

      <section id="architecture">
        {section(
          '2. Requirements',
          <>
            <Blockquote>
              Understanding the requirements is crucial for designing a system that meets user needs
              while maintaining scalability and reliability.
            </Blockquote>
            <strong>Functional Requirements:</strong>
            <List>
              <ListItem>Real-time message delivery with WebSocket support</ListItem>
              <ListItem>One-to-one and group chat functionality</ListItem>
              <ListItem>Message persistence and history</ListItem>
              <ListItem>User presence indicators</ListItem>
              <ListItem>Message delivery and read receipts</ListItem>
              <ListItem>Typing indicators</ListItem>
              <ListItem>Message search functionality</ListItem>
              <ListItem>File sharing capabilities</ListItem>
            </List>
            <strong style={{ display: 'block', marginTop: '1.5rem' }}>Non-Functional Requirements:</strong>
            <List>
              <ListItem>High availability (99.99%)</ListItem>
              <ListItem>Low latency (&lt;100ms for message delivery)</ListItem>
              <ListItem>Scalability to handle millions of concurrent users</ListItem>
              <ListItem>Data consistency and durability</ListItem>
              <ListItem>Security and encryption</ListItem>
              <ListItem>Message delivery guarantees</ListItem>
            </List>
          </>
        )}
      </section>

      <section id="data-model">
        {section(
          '3. High-Level Architecture',
          <>
            <p>
              The system uses a microservices architecture with WebSocket servers for real-time
              communication, message queues for reliable message delivery, and distributed storage
              for persistence. The architecture is designed to scale horizontally and handle high
              message throughput.
            </p>
            <DiagramContainer>
              <Mermaid chart={hldDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              System architecture showing client apps, load balancers, WebSocket servers, message
              queue, and storage layers.
            </DiagramCaption>
          </>
        )}
      </section>

      <section id="message-flow">
        {section(
          '4. Data Model',
          <>
            <DiagramContainer>
              <Mermaid chart={dataModelDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              Entity relationship diagram showing the data model for users, conversations, messages, and message statuses.
            </DiagramCaption>
            <p style={{ margin: '0 0 2.2rem 0' }}>
              The data model is designed for efficient querying and scaling, with separate
              collections for users, conversations, messages, and message statuses. The schema
              supports all required features while maintaining data consistency.
            </p>
          </>
        )}
      </section>

      <section id="scaling">
        {section(
          '5. Message Flow',
          <>
            <DiagramContainer>
              <Mermaid chart={messageFlowDiagram} />
            </DiagramContainer>
            <DiagramCaption>
              Sequence diagram illustrating the message flow through the system components.
            </DiagramCaption>
            <p style={{ margin: '0 0 2.2rem 0' }}>
              The message flow ensures reliable delivery and status updates through WebSocket
              connections, message queues, and distributed services. The system handles message
              persistence, caching, and real-time updates efficiently.
            </p>
          </>
        )}
      </section>

      <section id="security">
        {section(
          '6. Scaling Considerations',
          <List>
            <ListItem>
              <strong>WebSocket Layer:</strong>
              <List>
                <ListItem>Horizontal scaling with multiple WebSocket servers</ListItem>
                <ListItem>Load balancing with sticky sessions</ListItem>
                <ListItem>Connection pooling and resource management</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Message Queue:</strong>
              <List>
                <ListItem>Partitioning for high throughput</ListItem>
                <ListItem>Message batching for efficiency</ListItem>
                <ListItem>Dead letter queues for failed messages</ListItem>
              </List>
            </ListItem>
            <ListItem>
              <strong>Database:</strong>
              <List>
                <ListItem>Sharding for horizontal scaling</ListItem>
                <ListItem>Read replicas for high availability</ListItem>
                <ListItem>Caching layer for frequent queries</ListItem>
              </List>
            </ListItem>
          </List>
        )}
      </section>

      <section id="monitoring">
        {section(
          '7. Security Considerations',
          <List>
            <ListItem>End-to-end encryption for messages</ListItem>
            <ListItem>Authentication and authorization</ListItem>
            <ListItem>Rate limiting and DDoS protection</ListItem>
            <ListItem>Input validation and sanitization</ListItem>
            <ListItem>Secure WebSocket connections (WSS)</ListItem>
            <ListItem>Data encryption at rest</ListItem>
            <ListItem>Regular security audits</ListItem>
          </List>
        )}
      </section>

      <section>
        {section(
          '8. Monitoring and Reliability',
          <List>
            <ListItem>Real-time metrics for system health</ListItem>
            <ListItem>Alerting for critical issues</ListItem>
            <ListItem>Logging and tracing for debugging</ListItem>
            <ListItem>Performance monitoring</ListItem>
            <ListItem>Error tracking and reporting</ListItem>
            <ListItem>Automated failover</ListItem>
            <ListItem>Backup and recovery procedures</ListItem>
          </List>
        )}
      </section>
    </ContentSection>
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

export default ChatSystemAnswer; 