'use client';

import React, { ReactNode } from 'react';
import Mermaid from '@/components/Mermaid';
import styled, { createGlobalStyle, DefaultTheme } from 'styled-components';
import {
  FaRocket,
  FaClock,
  FaUsers,
  FaTachometerAlt,
  FaComments,
  FaBell,
  FaSearch,
  FaCreditCard,
  FaFile,
  FaShoppingCart,
  FaBriefcase,
  FaVideo,
  FaBars,
  FaList,
  FaCheckCircle,
  FaBolt,
  FaThLarge,
  FaLock,
  FaChevronDown,
  FaChevronRight,
  FaChevronLeft,
  FaFire,
  FaMapMarkerAlt,
  FaVoteYea,
  FaInfoCircle,
  FaSun,
  FaMoon,
  FaExclamationTriangle,
  FaExclamationCircle,
} from 'react-icons/fa';
import { MainLayout } from '@/components/MainLayout';
import { useTheme } from '@/app/context/ThemeContext';
import { useAuth } from '@/app/hooks/useAuth';
import { CustomUser } from '@/types/auth';
import Logo from '@/app/components/Logo';
import CompactLogo from '@/app/components/CompactLogo';

interface ThemeType {
  colors: {
    background: string;
    backgroundAlt: string;
    text: string;
    textSecondary: string;
    primary: string;
    border: string;
    error: string;
    warning: string;
    success: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  spacing: {
    sm: string;
    md: string;
  };
}

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
  padding: 0;
  transition: background-color 0.3s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const MainContent = styled.main`
  width: 100%;
  height: 100vh;
  padding: 0;
  display: flex;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  transition: background-color 0.3s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 100%;
  width: 100%;
  position: relative;
  transition: opacity 0.3s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const ContentSection = styled.section`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const LeftPanel = styled.aside<{ $collapsed?: boolean }>`
  width: ${({ $collapsed }) => ($collapsed ? '64px' : '240px')};
  min-width: ${({ $collapsed }) => ($collapsed ? '64px' : '240px')};
  max-width: ${({ $collapsed }) => ($collapsed ? '64px' : '240px')};
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0;
  padding: 0;
  height: 100%;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: none;
  overflow: hidden;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.border}20 transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  border-right: 1px solid ${({ theme }) => theme.colors.border}15;
  display: flex;
  flex-direction: column;

  @media (max-width: 1400px) {
    width: ${({ $collapsed }) => ($collapsed ? '64px' : '220px')};
    min-width: ${({ $collapsed }) => ($collapsed ? '64px' : '220px')};
    max-width: ${({ $collapsed }) => ($collapsed ? '64px' : '220px')};
  }

  @media (max-width: 1200px) {
    width: ${({ $collapsed }) => ($collapsed ? '64px' : '200px')};
    min-width: ${({ $collapsed }) => ($collapsed ? '64px' : '200px')};
    max-width: ${({ $collapsed }) => ($collapsed ? '64px' : '200px')};
  }

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    left: -100%;
    width: ${({ $collapsed }) => ($collapsed ? '64px' : '280px')};
    min-width: ${({ $collapsed }) => ($collapsed ? '64px' : '280px')};
    max-width: ${({ $collapsed }) => ($collapsed ? '64px' : '280px')};
    height: 100vh;
    background: ${({ theme }) => theme.colors.background}ee;
    backdrop-filter: blur(8px);
    border: 1px solid ${({ theme }) => theme.colors.border}30;
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateX(0);
    transition: transform 0.3s ease;

    &.open {
      transform: translateX(100%);
    }
  }

  @media (max-width: 768px) {
    width: ${({ $collapsed }) => ($collapsed ? '64px' : '85vw')};
    min-width: ${({ $collapsed }) => ($collapsed ? '64px' : '280px')};
    max-width: ${({ $collapsed }) => ($collapsed ? '64px' : '100vw')};
  }
`;

const LogoSection = styled.div<{ $collapsed?: boolean }>`
  padding: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}30;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.background};
  flex-shrink: 0;
  position: relative;
  justify-content: ${({ $collapsed }) => ($collapsed ? 'center' : 'flex-start')};

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.border}40,
      ${({ theme }) => theme.colors.border}20,
      ${({ theme }) => theme.colors.border}40
    );
  }

  ${({ $collapsed }) =>
    $collapsed &&
    `
    padding: 0.75rem 0.5rem;
    
    &:hover {
      background: ${({ theme }) => theme.colors.backgroundAlt}22;
    }
  `}
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: 0.5rem 0.25rem 0.5rem 0.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SidebarSectionHeader = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0.25rem 0 0.25rem 0.5rem;
  opacity: 0.8;
`;

const SidebarNavItem = styled.div<{ active?: boolean; $collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.borderRadius.md};
  font-size: 0.85rem;
  font-weight: ${({ active }) => (active ? 600 : 500)};
  color: ${({ theme, active }: { theme: ThemeType; active?: boolean }) =>
    active ? theme.colors.primary : theme.colors.text};
  background: ${({ theme, active }: { theme: ThemeType; active?: boolean }) =>
    active ? theme.colors.primary + '10' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  outline: none;
  user-select: none;
  margin: 0.15rem 0.25rem;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }: { theme: ThemeType }) => theme.colors.primary}40;
  }

  &:hover {
    background: ${({ theme }: { theme: ThemeType }) => theme.colors.backgroundAlt}22;
    color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
    transform: translateX(2px);
  }

  ${({ $collapsed }) =>
    $collapsed &&
    `
    justify-content: center;
    padding: 0.75rem;
    margin: 0.15rem 0.25rem;
    border-radius: ${({ theme }: { theme: ThemeType }) => theme.borderRadius.md};
    background: ${({ theme, active }: { theme: ThemeType; active?: boolean }) => (active ? theme.colors.primary + '15' : 'transparent')};
    
    &:hover {
      background: ${({ theme }: { theme: ThemeType }) => theme.colors.backgroundAlt};
      transform: translateY(-1px);
    }
  `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const SidebarSubNavItem = styled.div<{ $locked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.5rem 0.35rem 1.75rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: transparent;
  cursor: ${({ $locked }) => ($locked ? 'not-allowed' : 'pointer')};
  opacity: ${({ $locked }) => ($locked ? 0.6 : 1)};
  position: relative;
  outline: none;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SidebarDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border}30;
  margin: 0.5rem 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.border}40,
      ${({ theme }) => theme.colors.border}20,
      ${({ theme }) => theme.colors.border}40
    );
  }
`;

const ProfileSection = styled.div`
  padding: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border}30;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.background};
  flex-shrink: 0;
  margin-top: auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.border}40,
      ${({ theme }) => theme.colors.border}20,
      ${({ theme }) => theme.colors.border}40
    );
  }
`;

const ProfileImage = styled.div<{ $src?: string }>`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary}15;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 0.85rem;
  background-image: ${({ $src }) => ($src ? `url(${$src})` : 'none')};
  background-size: cover;
  background-position: center;
  border: 1px solid ${({ theme }) => theme.colors.border}20;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
`;

const ProfileName = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ProfileRole = styled.span`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
`;

const SidebarCollapseButton = styled.button`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border}30;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
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

const MobileMenuButton = styled.button`
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border}40;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;
  user-select: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }

  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const MobileTocButton = styled(MobileMenuButton)`
  left: auto;
  right: 1rem;
`;

const VerticalDivider = styled.div`
  width: 1px;
  background: ${({ theme }) => theme.colors.border}30;
  margin: 0 1rem;
  align-self: stretch;
  border-radius: 1px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.border}40,
      ${({ theme }) => theme.colors.border}20,
      ${({ theme }) => theme.colors.border}40
    );
  }

  @media (max-width: 1400px) {
    display: none;
  }
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
  },
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

const renderSection = (title: string, children: ReactNode) => (
  <div>
    <SectionTitle>{title}</SectionTitle>
    <SectionContent>{children}</SectionContent>
  </div>
);

// Sidebar data structure
const sidebarSections = [
  {
    header: 'LEARN SYSTEM DESIGN',
    items: [
      {
        id: 'in-a-hurry',
        label: 'In a Hurry',
        icon: <FaClock />,
        active: true,
        children: [],
      },
      {
        id: 'core-concepts',
        label: 'Core Concepts',
        icon: <FaCheckCircle />,
        children: [],
      },
      {
        id: 'key-technologies',
        label: 'Key Technologies',
        icon: <FaBolt />,
        children: [],
      },
      {
        id: 'patterns',
        label: 'Patterns',
        icon: <FaThLarge />,
        children: [
          {
            id: 'real-time-updates',
            label: 'Real-time Updates',
            icon: <FaCheckCircle />,
            locked: true,
          },
        ],
      },
      {
        id: 'advanced-topics',
        label: 'Advanced Topics',
        icon: <FaFire />,
        children: [],
      },
      {
        id: 'question-breakdown',
        label: 'Question Breakdown',
        icon: <FaMapMarkerAlt />,
        children: [],
      },
      {
        id: 'vote-content',
        label: 'Vote For New Content',
        icon: <FaVoteYea />,
        children: [],
      },
    ],
  },
];

const SidebarContainer = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SidebarChevron = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85em;
  display: flex;
  align-items: center;
  opacity: 0.7;
`;

const SidebarTooltip = styled.div`
  position: absolute;
  left: 110%;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.35rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: ${({ theme }) => theme.shadows.md};
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 100;
  border: 1px solid ${({ theme }) => theme.colors.border}20;
`;

const ThemeToggleSection = styled.div`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border}22;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt}22;
  flex-shrink: 0;
  margin-top: auto;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt}33;
  }
`;

const ThemeIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary}33;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const ThemeText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ThemeLabel = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const ThemeDescription = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const AlertContainer = styled.div<{ variant?: 'info' | 'warning' | 'error' | 'success' }>`
  display: flex;
  gap: 1rem;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'error':
        return `${theme.colors.error}15`;
      case 'warning':
        return `${theme.colors.warning}15`;
      case 'success':
        return `${theme.colors.success}15`;
      default:
        return `${theme.colors.primary}15`;
    }
  }};
  border: 1px solid
    ${({ theme, variant }) => {
      switch (variant) {
        case 'error':
          return `${theme.colors.error}30`;
        case 'warning':
          return `${theme.colors.warning}30`;
        case 'success':
          return `${theme.colors.success}30`;
        default:
          return `${theme.colors.primary}30`;
      }
    }};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme, variant }) => {
      switch (variant) {
        case 'error':
          return theme.colors.error;
        case 'warning':
          return theme.colors.warning;
        case 'success':
          return theme.colors.success;
        default:
          return theme.colors.primary;
      }
    }};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const AlertIcon = styled.div<{ variant?: 'info' | 'warning' | 'error' | 'success' }>`
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'success':
        return theme.colors.success;
      default:
        return theme.colors.primary;
    }
  }};
  font-size: 1.25rem;
  opacity: 0.9;
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.h4<{ variant?: 'info' | 'warning' | 'error' | 'success' }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      case 'success':
        return theme.colors.success;
      default:
        return theme.colors.primary;
    }
  }};
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AlertText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  opacity: 0.9;
`;

const AlertLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary}dd;
    text-decoration: underline;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const ThemeToggle = styled.button`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: 1px solid ${({ theme }) => theme.colors.border}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;
  opacity: 0.8;
  user-select: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt}dd;
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary}33;
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.text};
  line-height: 1.4;
  letter-spacing: -0.016em;
`;

const SectionContent = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.text};
  margin-bottom: 1.5rem;
  letter-spacing: 0.01em;

  p {
    margin-bottom: 1.25rem;
  }

  strong {
    font-weight: 600;
    color: ${({ theme }: { theme: ThemeType }) => theme.colors.text};
  }
`;

const RightPanel = styled.aside`
  width: 280px;
  flex-shrink: 0;
  background: ${({ theme }: { theme: ThemeType }) => theme.colors.background};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.borderRadius.lg};
  padding: 0.75rem;
  height: 100%;
  position: relative;
  box-shadow: ${({ theme }: { theme: ThemeType }) => theme.shadows.sm};
  border: none;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }: { theme: ThemeType }) => theme.colors.border}20 transparent;
  transition: all 0.3s ease;
  z-index: 2;
  border-left: 1px solid ${({ theme }: { theme: ThemeType }) => theme.colors.border}15;
  margin-right: 0.75rem;

  @media (max-width: 1400px) {
    width: 260px;
  }

  @media (max-width: 1200px) {
    width: 240px;
  }

  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    right: -100%;
    width: 85vw;
    max-width: 320px;
    height: 100vh;
    margin: 0;
    background: ${({ theme }: { theme: ThemeType }) => theme.colors.background}ee;
    backdrop-filter: blur(8px);
    border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.colors.border}30;
    box-shadow: ${({ theme }: { theme: ThemeType }) => theme.shadows.lg};
    transform: translateX(0);
    transition: transform 0.3s ease;

    &.open {
      transform: translateX(-100%);
    }
  }

  @media (max-width: 768px) {
    width: 100vw;
    max-width: none;
  }
`;

const InfoCard = styled.div`
  background: ${({ theme }: { theme: ThemeType }) => theme.colors.background};
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.borderRadius.lg};
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  border: 1px solid ${({ theme }: { theme: ThemeType }) => theme.colors.border}15;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }: { theme: ThemeType }) => theme.colors.backgroundAlt}22;
    border-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary}20;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }: { theme: ThemeType }) => theme.colors.border}30;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      to right,
      ${({ theme }: { theme: ThemeType }) => theme.colors.border}40,
      ${({ theme }: { theme: ThemeType }) => theme.colors.border}20,
      ${({ theme }: { theme: ThemeType }) => theme.colors.border}40
    );
  }
`;

const RightPanelSectionTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.text};
  margin: 0;
  text-transform: none;
  letter-spacing: 0.5px;
`;

const TableOfContentsLink = styled.a`
  display: block;
  padding: 0.65rem 0.75rem;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  cursor: pointer;
  border-left: 2px solid transparent;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.8;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.borderRadius.sm};
  font-weight: 400;
  user-select: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }: { theme: ThemeType }) => theme.colors.primary}40;
  }

  &:hover {
    color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
    border-left-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
    background: ${({ theme }: { theme: ThemeType }) => theme.colors.backgroundAlt}22;
    opacity: 1;
  }

  &.active {
    color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
    border-left-color: ${({ theme }: { theme: ThemeType }) => theme.colors.primary};
    font-weight: 500;
    background: ${({ theme }: { theme: ThemeType }) => theme.colors.primary}15;
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const BadgeGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;
`;

const Badge = styled.span<{ variant?: 'error' | 'info' | 'warning' }>`
  padding: 0.35rem 0.75rem;
  border-radius: ${({ theme }: { theme: ThemeType }) => theme.borderRadius.full};
  font-size: 0.85rem;
  font-weight: 500;
  background: ${({
    theme,
    variant,
  }: {
    theme: ThemeType;
    variant?: 'error' | 'info' | 'warning';
  }) => {
    switch (variant) {
      case 'error':
        return `${theme.colors.error}15`;
      case 'warning':
        return `${theme.colors.warning}15`;
      default:
        return `${theme.colors.primary}15`;
    }
  }};
  color: ${({ theme, variant }: { theme: ThemeType; variant?: 'error' | 'info' | 'warning' }) => {
    switch (variant) {
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.primary;
    }
  }};
  border: 1px solid
    ${({ theme, variant }: { theme: ThemeType; variant?: 'error' | 'info' | 'warning' }) => {
      switch (variant) {
        case 'error':
          return `${theme.colors.error}30`;
        case 'warning':
          return `${theme.colors.warning}30`;
        default:
          return `${theme.colors.primary}30`;
      }
    }};
  transition: all 0.2s ease;
  opacity: 0.9;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }: { theme: ThemeType }) => theme.shadows.sm};
    opacity: 1;
  }
`;

const CompanyBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt}15;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border}20;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ theme }) => theme.colors.backgroundAlt}25;
    border-color: ${({ theme }) => theme.colors.primary}30;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const CompanyName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const CompanyCount = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
`;

const MobileHeader = styled.header<{ theme: ThemeType }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}30;
  padding: 0 1rem;
  z-index: 1000;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    display: flex;
  }
`;

const MobileHeaderLeft = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MobileHeaderRight = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MobileHeaderButton = styled.button<{ theme: ThemeType }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border}40;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}40;
  }
`;

const MobileHeaderTitle = styled.h1<{ theme: ThemeType }>`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobileOverlay = styled.div<{ theme: ThemeType }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.open {
    display: block;
    opacity: 1;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const StickySectionTitle = styled.div<{ theme: ThemeType }>`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem 0;
  margin-bottom: 2rem;
  z-index: 10;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}30;
`;

const TitleRow = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
`;

const TitleContent = styled.div<{ theme: ThemeType }>`
  flex: 1;
`;

const TitleBadges = styled.div<{ theme: ThemeType }>`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const TitleBadge = styled.div<{ theme: ThemeType; variant?: 'error' | 'info' | 'warning' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.85rem;
  font-weight: 500;
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'error':
        return `${theme.colors.error}15`;
      case 'warning':
        return `${theme.colors.warning}15`;
      default:
        return `${theme.colors.primary}15`;
    }
  }};
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'error':
        return theme.colors.error;
      case 'warning':
        return theme.colors.warning;
      default:
        return theme.colors.primary;
    }
  }};
  border: 1px solid
    ${({ theme, variant }) => {
      switch (variant) {
        case 'error':
          return `${theme.colors.error}30`;
        case 'warning':
          return `${theme.colors.warning}30`;
        default:
          return `${theme.colors.primary}30`;
      }
    }};
`;

const BadgeIcon = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
`;

const List = styled.ul<{ theme: ThemeType }>`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

const ListItem = styled.li<{ theme: ThemeType }>`
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const Blockquote = styled.blockquote<{ theme: ThemeType }>`
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.backgroundAlt}22;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-style: italic;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TipBlock = styled.div<{ theme: ThemeType }>`
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  margin: 1.5rem 0;
  background: ${({ theme }) => theme.colors.backgroundAlt}22;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
`;

const TipIcon = styled.div<{ theme: ThemeType }>`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.25rem;
  opacity: 0.9;
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

const TipContent = styled.div<{ theme: ThemeType }>`
  flex: 1;
`;

const TipTitle = styled.h4<{ theme: ThemeType }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 0.5rem 0;
`;

const TipText = styled.p<{ theme: ThemeType }>`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  opacity: 0.9;
`;

const CodeBlock = styled.div<{ theme: ThemeType }>`
  margin: 1.5rem 0;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt}22;
  border: 1px solid ${({ theme }) => theme.colors.border}30;
`;

const CodeBlockHeader = styled.div<{ theme: ThemeType }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.backgroundAlt}33;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}30;
`;

const CodeBlockTitle = styled.span<{ theme: ThemeType }>`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const CodeBlockLanguage = styled.span<{ theme: ThemeType }>`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.25rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ theme }) => theme.colors.backgroundAlt}44;
`;

const CodeBlockContent = styled.div<{ theme: ThemeType }>`
  padding: 1rem;
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.backgroundAlt}11;

  pre {
    margin: 0;
    padding: 0;
    background: transparent;
  }

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    display: block;
    white-space: pre;
    overflow-x: auto;
  }
`;

const DiagramContainer = styled.div<{ theme: ThemeType }>`
  margin: 1.5rem 0;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.backgroundAlt}22;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border}30;
  overflow-x: auto;
`;

const DiagramCaption = styled.p<{ theme: ThemeType }>`
  text-align: center;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0.75rem 0 0 0;
  opacity: 0.8;
`;

const ChatSystemAnswer = () => {
  const [activeSection, setActiveSection] = React.useState('');
  const [isLeftPanelOpen, setIsLeftPanelOpen] = React.useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const customUser = user as CustomUser;
  const userName =
    customUser?.user_metadata?.full_name || customUser?.email?.split('@')[0] || 'User';
  const userAvatar = customUser?.user_metadata?.avatar_url;
  const isPremium = customUser?.user_metadata?.premium || false;

  // Add screen size detection
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1400);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Update panel visibility logic
  React.useEffect(() => {
    if (isSmallScreen) {
      if (isLeftPanelOpen) {
        setIsRightPanelOpen(false);
      }
      if (isRightPanelOpen) {
        setIsLeftPanelOpen(false);
      }
    }
  }, [isSmallScreen, isLeftPanelOpen, isRightPanelOpen]);

  const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  const handleOverlayClick = () => {
    setIsLeftPanelOpen(false);
    setIsRightPanelOpen(false);
  };

  const handleLeftPanelToggle = () => {
    setIsLeftPanelOpen(prev => !prev);
    if (isSmallScreen && !isLeftPanelOpen) {
      setIsRightPanelOpen(false);
    }
  };

  const handleRightPanelToggle = () => {
    setIsRightPanelOpen(prev => !prev);
    if (isSmallScreen && !isRightPanelOpen) {
      setIsLeftPanelOpen(false);
    }
  };

  // Sidebar state for expand/collapse
  const [expanded, setExpanded] = React.useState<{ [key: string]: boolean }>({});
  const handleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLeftPanelOpen(false);
        setIsRightPanelOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'overview',
        'requirements',
        'architecture',
        'data-model',
        'message-flow',
        'scaling',
        'security',
        'monitoring',
      ];

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [leftCollapsed, setLeftCollapsed] = React.useState(false);
  const [tooltip, setTooltip] = React.useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const rightPanelContent = (
    <RightPanel className={isRightPanelOpen ? 'open' : ''}>
      <InfoCard>
        <SectionHeader>
          <RightPanelSectionTitle>On This Page</RightPanelSectionTitle>
        </SectionHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
          <TableOfContentsLink
            href="#overview"
            className={activeSection === 'overview' ? 'active' : ''}
          >
            Overview
          </TableOfContentsLink>
          <TableOfContentsLink
            href="#requirements"
            className={activeSection === 'requirements' ? 'active' : ''}
          >
            Requirements
          </TableOfContentsLink>
          <TableOfContentsLink
            href="#architecture"
            className={activeSection === 'architecture' ? 'active' : ''}
          >
            Architecture
          </TableOfContentsLink>
          <TableOfContentsLink
            href="#data-model"
            className={activeSection === 'data-model' ? 'active' : ''}
          >
            Data Model
          </TableOfContentsLink>
          <TableOfContentsLink
            href="#message-flow"
            className={activeSection === 'message-flow' ? 'active' : ''}
          >
            Message Flow
          </TableOfContentsLink>
          <TableOfContentsLink
            href="#scaling"
            className={activeSection === 'scaling' ? 'active' : ''}
          >
            Scaling
          </TableOfContentsLink>
          <TableOfContentsLink
            href="#security"
            className={activeSection === 'security' ? 'active' : ''}
          >
            Security
          </TableOfContentsLink>
          <TableOfContentsLink
            href="#monitoring"
            className={activeSection === 'monitoring' ? 'active' : ''}
          >
            Monitoring
          </TableOfContentsLink>
        </div>
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
      </InfoCard>
    </RightPanel>
  );

  const leftPanelContent = (
    <LeftPanel className={isLeftPanelOpen ? 'open' : ''} $collapsed={leftCollapsed}>
      <LogoSection $collapsed={leftCollapsed}>
        {leftCollapsed ? <CompactLogo /> : <Logo />}
      </LogoSection>
      <SidebarContent>
        <SidebarContainer>
          {sidebarSections.map(section => (
            <React.Fragment key={section.header}>
              {!leftCollapsed && <SidebarSectionHeader>{section.header}</SidebarSectionHeader>}
              {section.items.map(item => (
                <React.Fragment key={item.id}>
                  <SidebarNavItem
                    active={item.active}
                    onClick={() => item.children.length && handleExpand(item.id)}
                    onKeyPress={e =>
                      handleKeyPress(e, () => item.children.length && handleExpand(item.id))
                    }
                    onMouseEnter={() => setTooltip(item.label)}
                    onMouseLeave={() => setTooltip('')}
                    tabIndex={0}
                    role="button"
                    aria-expanded={expanded[item.id]}
                    aria-label={item.label}
                    style={{
                      justifyContent: leftCollapsed ? 'center' : 'flex-start',
                      padding: leftCollapsed ? '0.65rem' : undefined,
                    }}
                  >
                    {item.icon}
                    {!leftCollapsed && item.label}
                    {item.children.length > 0 && !leftCollapsed && (
                      <SidebarChevron>
                        {expanded[item.id] ? <FaChevronDown /> : <FaChevronRight />}
                      </SidebarChevron>
                    )}
                    {leftCollapsed && tooltip === item.label && (
                      <SidebarTooltip>{item.label}</SidebarTooltip>
                    )}
                  </SidebarNavItem>
                  {item.children.length > 0 && expanded[item.id] && !leftCollapsed && (
                    <div>
                      {item.children.map(sub => (
                        <SidebarSubNavItem
                          key={sub.id}
                          $locked={sub.locked}
                          role="button"
                          tabIndex={0}
                          aria-label={sub.label}
                          aria-disabled={sub.locked}
                          onKeyPress={e =>
                            handleKeyPress(e, () => !sub.locked && handleExpand(sub.id))
                          }
                        >
                          {sub.icon}
                          {sub.label}
                          {sub.locked && <FaLock style={{ marginLeft: 'auto', opacity: 0.7 }} />}
                        </SidebarSubNavItem>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
              {!leftCollapsed && <SidebarDivider />}
            </React.Fragment>
          ))}
        </SidebarContainer>
      </SidebarContent>
      <SidebarCollapseButton
        aria-label={leftCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={() => setLeftCollapsed(c => !c)}
        onKeyPress={e => handleKeyPress(e, () => setLeftCollapsed(c => !c))}
      >
        {leftCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </SidebarCollapseButton>
      <ProfileSection>
        <ProfileImage $src={userAvatar} role="img" aria-label={`${userName}'s profile picture`}>
          {!userAvatar && userName[0]}
        </ProfileImage>
        {!leftCollapsed && (
          <ProfileInfo>
            <ProfileName>{userName}</ProfileName>
            <ProfileRole>{isPremium ? 'Premium Member' : 'Member'}</ProfileRole>
          </ProfileInfo>
        )}
        <ThemeToggle
          onClick={toggleTheme}
          onKeyPress={e => handleKeyPress(e, toggleTheme)}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </ThemeToggle>
      </ProfileSection>
    </LeftPanel>
  );

  const mainContentSection = (
    <ContentSection>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            opacity: 0.7,
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid',
              borderColor: 'rgba(var(--primary-rgb), 0.2)',
              borderTopColor: 'var(--primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      ) : (
        <>
          <section id="overview" style={{ scrollMarginTop: 100, paddingTop: '1rem' }}>
            <StickySectionTitle>
              <TitleRow>
                <TitleContent>
                  <h1>Real-time Chat System</h1>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'var(--text-secondary)',
                      margin: 0,
                      opacity: 0.8,
                    }}
                  >
                    A scalable, real-time chat system architecture supporting millions of concurrent
                    users
                  </p>
                </TitleContent>
                <TitleBadges>
                  <TitleBadge variant="error">
                    <BadgeIcon>
                      <FaFire />
                    </BadgeIcon>
                    Hard
                  </TitleBadge>
                  <TitleBadge variant="info">
                    <BadgeIcon>
                      <FaClock />
                    </BadgeIcon>
                    90 min
                  </TitleBadge>
                  <TitleBadge variant="warning">
                    <BadgeIcon>
                      <FaBolt />
                    </BadgeIcon>
                    Advanced
                  </TitleBadge>
                </TitleBadges>
              </TitleRow>
            </StickySectionTitle>
            <SectionContent>
              <p>
                A scalable, real-time chat system architecture supporting millions of concurrent
                users, with features like message delivery, read receipts, typing indicators, and
                message persistence. This system design explores the challenges and solutions for
                building a modern chat application at scale.
              </p>

              <AlertContainer variant="info">
                <AlertIcon variant="info">
                  <FaInfoCircle />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle variant="info">System Design Tip</AlertTitle>
                  <AlertText>
                    When designing a real-time chat system, always consider scalability from the
                    start. Use WebSocket for real-time communication and implement proper message
                    queuing for reliable delivery.
                  </AlertText>
                  <AlertLink href="#architecture">
                    Learn more about architecture <FaChevronRight size={12} />
                  </AlertLink>
                </AlertContent>
              </AlertContainer>

              <AlertContainer variant="warning">
                <AlertIcon variant="warning">
                  <FaExclamationTriangle />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle variant="warning">Performance Consideration</AlertTitle>
                  <AlertText>
                    Message delivery latency should be kept under 100ms for a good user experience.
                    Consider implementing message batching and proper caching strategies to achieve
                    this.
                  </AlertText>
                </AlertContent>
              </AlertContainer>

              <CodeBlock>
                <CodeBlockHeader>
                  <CodeBlockTitle>WebSocket Connection Example</CodeBlockTitle>
                  <CodeBlockLanguage>TypeScript</CodeBlockLanguage>
                </CodeBlockHeader>
                <CodeBlockContent>
                  <pre>
                    <code>
                      {`// WebSocket connection setup
const ws = new WebSocket('wss://chat.example.com');

ws.onopen = () => {
  console.log('Connected to chat server');
  // Send authentication
  ws.send(JSON.stringify({
    type: 'auth',
    token: userToken
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  switch (message.type) {
    case 'chat':
      handleChatMessage(message);
      break;
    case 'typing':
      handleTypingIndicator(message);
      break;
    case 'presence':
      handleUserPresence(message);
      break;
  }
};`}
                    </code>
                  </pre>
                </CodeBlockContent>
              </CodeBlock>

              <AlertContainer variant="error">
                <AlertIcon variant="error">
                  <FaExclamationCircle />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle variant="error">Critical Security Note</AlertTitle>
                  <AlertText>
                    Always implement end-to-end encryption for messages and proper authentication
                    mechanisms. Never store sensitive user data in plain text.
                  </AlertText>
                  <AlertLink href="#security">
                    View security guidelines <FaChevronRight size={12} />
                  </AlertLink>
                </AlertContent>
              </AlertContainer>

              <AlertContainer variant="success">
                <AlertIcon variant="success">
                  <FaCheckCircle />
                </AlertIcon>
                <AlertContent>
                  <AlertTitle variant="success">Best Practice</AlertTitle>
                  <AlertText>
                    Implement proper error handling and retry mechanisms for message delivery. Use
                    message queues to ensure reliable delivery and handle high load scenarios.
                  </AlertText>
                </AlertContent>
              </AlertContainer>
            </SectionContent>
          </section>

          <section id="requirements" style={{ scrollMarginTop: 100, paddingTop: '1rem' }}>
            {renderSection(
              '1. Clarifying Questions',
              <>
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

                <TipBlock>
                  <TipIcon>
                    <FaCheckCircle />
                  </TipIcon>
                  <TipContent>
                    <TipTitle>Requirements Checklist</TipTitle>
                    <TipText>
                      Always start with clarifying questions to understand the scope and
                      constraints. Document both functional and non-functional requirements clearly.
                      Consider scalability, security, and compliance requirements from the start.
                    </TipText>
                  </TipContent>
                </TipBlock>
              </>
            )}
          </section>

          <section id="architecture" style={{ scrollMarginTop: 100, paddingTop: '1rem' }}>
            {renderSection(
              '2. Requirements',
              <>
                <Blockquote>
                  Understanding the requirements is crucial for designing a system that meets user
                  needs while maintaining scalability and reliability.
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

                <CodeBlock>
                  <CodeBlockHeader>
                    <span>Message Queue Configuration</span>
                    <span>Node.js</span>
                  </CodeBlockHeader>
                  <CodeBlockContent>
                    {`// RabbitMQ configuration for message handling
const amqp = require('amqplib');

async function setupMessageQueue() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  // Declare queues
  await channel.assertQueue('chat_messages', {
    durable: true,
    maxLength: 1000000
  });
  
  await channel.assertQueue('delivery_status', {
    durable: true
  });
  
  // Set up message handling
  channel.consume('chat_messages', (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      processMessage(message);
      channel.ack(msg);
    }
  });
}`}
                  </CodeBlockContent>
                </CodeBlock>

                <strong style={{ display: 'block', marginTop: '1.5rem' }}>
                  Non-Functional Requirements:
                </strong>
                <List>
                  <ListItem>High availability (99.99%)</ListItem>
                  <ListItem>Low latency (&lt;100ms for message delivery)</ListItem>
                  <ListItem>Scalability to handle millions of concurrent users</ListItem>
                  <ListItem>Data consistency and durability</ListItem>
                  <ListItem>Security and encryption</ListItem>
                  <ListItem>Message delivery guarantees</ListItem>
                </List>

                <TipBlock>
                  <TipIcon>
                    <FaBolt />
                  </TipIcon>
                  <TipContent>
                    <TipTitle>Performance Optimization</TipTitle>
                    <TipText>
                      Use message batching for high throughput, implement proper caching strategies,
                      and consider using a CDN for static content. Monitor system metrics and
                      optimize based on real usage patterns.
                    </TipText>
                  </TipContent>
                </TipBlock>
              </>
            )}
          </section>

          <section id="data-model" style={{ scrollMarginTop: 100, paddingTop: '1rem' }}>
            {renderSection(
              '3. High-Level Architecture',
              <>
                <p>
                  The system uses a microservices architecture with WebSocket servers for real-time
                  communication, message queues for reliable message delivery, and distributed
                  storage for persistence. The architecture is designed to scale horizontally and
                  handle high message throughput.
                </p>
                <DiagramContainer>
                  <Mermaid chart={hldDiagram} />
                </DiagramContainer>
                <DiagramCaption>
                  System architecture showing client apps, load balancers, WebSocket servers,
                  message queue, and storage layers.
                </DiagramCaption>
              </>
            )}
          </section>

          <section id="message-flow" style={{ scrollMarginTop: 100, paddingTop: '1rem' }}>
            {renderSection(
              '4. Data Model',
              <>
                <DiagramContainer>
                  <Mermaid chart={dataModelDiagram} />
                </DiagramContainer>
                <DiagramCaption>
                  Entity relationship diagram showing the data model for users, conversations,
                  messages, and message statuses.
                </DiagramCaption>
                <p style={{ margin: '0 0 2.2rem 0' }}>
                  The data model is designed for efficient querying and scaling, with separate
                  collections for users, conversations, messages, and message statuses. The schema
                  supports all required features while maintaining data consistency.
                </p>
              </>
            )}
          </section>

          <section id="scaling" style={{ scrollMarginTop: 100, paddingTop: '1rem' }}>
            {renderSection(
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

          <section id="security" style={{ scrollMarginTop: 100, paddingTop: '1rem' }}>
            {renderSection(
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

          <section id="monitoring" style={{ scrollMarginTop: 100, paddingTop: '1rem' }}>
            {renderSection(
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

          <section style={{ scrollMarginTop: 100, paddingTop: '1rem' }}>
            {renderSection(
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
        </>
      )}
    </ContentSection>
  );

  return (
    <MainLayout hideHeader>
      <PageContainer>
        <MobileHeader>
          <MobileHeaderLeft>
            <MobileHeaderButton
              onClick={handleLeftPanelToggle}
              aria-label="Toggle navigation menu"
              aria-expanded={isLeftPanelOpen}
            >
              <FaBars />
            </MobileHeaderButton>
            <MobileHeaderTitle>Real-time Chat System</MobileHeaderTitle>
          </MobileHeaderLeft>
          <MobileHeaderRight>
            <ThemeToggle
              onClick={toggleTheme}
              onKeyPress={e => handleKeyPress(e, toggleTheme)}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </ThemeToggle>
            <MobileHeaderButton
              onClick={handleRightPanelToggle}
              aria-label="Toggle table of contents"
              aria-expanded={isRightPanelOpen}
            >
              <FaList />
            </MobileHeaderButton>
          </MobileHeaderRight>
        </MobileHeader>
        <MobileOverlay
          className={isLeftPanelOpen || isRightPanelOpen ? 'open' : ''}
          onClick={handleOverlayClick}
        />
        <MainContent>
          <ContentWrapper>
            {leftPanelContent}
            {(!isSmallScreen || !isRightPanelOpen) && <VerticalDivider />}
            {mainContentSection}
            {(!isSmallScreen || !isLeftPanelOpen) && <VerticalDivider />}
            {(!isSmallScreen || !isLeftPanelOpen) && rightPanelContent}
          </ContentWrapper>
        </MainContent>
      </PageContainer>
    </MainLayout>
  );
};

// Add keyframes for loading spinner
const keyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Add global styles
const GlobalStyles = createGlobalStyle<{ theme: DefaultTheme }>`
  ${keyframes}
  
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default ChatSystemAnswer;
