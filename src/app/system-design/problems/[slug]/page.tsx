'use client';

import { useState, useRef, useEffect, Suspense, useMemo } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { FaComments, FaList, FaClock, FaCommentDots, FaClipboardList, FaBolt, FaSearch, FaLayerGroup, FaFilter, FaTimes, FaBuilding, FaCode, FaDatabase, FaCogs, FaServer, FaNetworkWired, FaChartLine } from 'react-icons/fa';
import { useParams, useRouter } from 'next/navigation';

const problemsList = [
  {
    name: 'Chat App (Messenger Clone)',
    slug: 'chat-app',
    company_asked: ['Meta', 'Microsoft', 'Swiggy'],
    time_limit: 90,
    difficulty: 'Hard',
    tags: ['WebSocket', 'Real-time', 'Chat', 'React', 'State Management'],
    description: `Design and implement a real-time chat application with the following core features:
    1. Real-time messaging with WebSocket support
    2. Group chat functionality with multiple participants
    3. Message history and persistence
    4. Unread message count badges
    5. Typing indicators
    6. Message delivery status
    7. User presence indicators
    8. Message reactions and emoji support`,
    requirements: [
      'Support multiple concurrent users and groups',
      'Handle message delivery in real-time',
      'Maintain message history in a database',
      'Show unread message counts per chat/group',
      'Implement typing indicators',
      'Support message reactions and emojis',
      'Handle user online/offline status',
      'Ensure message delivery status (sent, delivered, read)',
      'Support file sharing and media messages',
      'Implement proper error handling and retry mechanisms'
    ],
    constraints: [
      'Must handle at least 1000 concurrent users',
      'Message delivery should be under 100ms',
      'Support groups with up to 1000 members',
      'Message history should be searchable',
      'Must be scalable and handle high message throughput',
      'Should work across different devices and browsers',
      'Must implement proper security measures',
      'Should handle network issues gracefully'
    ],
    twist: 'Add group chat and unread count badges.',
    icon: <FaComments />,
  },
  {
    name: 'News Feed (Facebook/Twitter)',
    slug: 'news-feed',
    company_asked: ['Meta', 'LinkedIn'],
    time_limit: 120,
    difficulty: 'Hard',
    tags: ['Pagination', 'Virtualization', 'React', 'Feed System', 'Infinite Scroll'],
    description: 'Create a responsive, paginated news feed with likes, comments, and post creation.',
    twist: 'Add real-time update for new posts and optimistic UI.',
    icon: <FaList />,
  },
  {
    name: 'E-commerce Product Listing Page',
    slug: 'product-listing-page',
    company_asked: ['Amazon', 'Meesho', 'Flipkart'],
    time_limit: 60,
    difficulty: 'Medium',
    tags: ['Filters', 'Sorting', 'Pagination', 'React', 'UI Performance'],
    description: 'Build a product list page with filters, sorting, and lazy loading of images.',
    twist: 'Support comparison view and wishlist functionality.',
    icon: <FaClipboardList />,
  },
  {
    name: 'Google Timer Clone',
    slug: 'google-timer',
    company_asked: ['Uber', 'Microsoft'],
    time_limit: 45,
    difficulty: 'Easy',
    tags: ['Timer', 'Hooks', 'React', 'Ref', 'Controlled Inputs'],
    description: 'Create a timer component that counts down and allows multiple timers sequentially.',
    twist: 'Show an alert and allow rescheduling expired timers.',
    icon: <FaClock />,
  },
  {
    name: 'Comment Thread (YouTube/Facebook)',
    slug: 'comment-thread',
    company_asked: ['Google', 'Meesho', 'Meta'],
    time_limit: 75,
    difficulty: 'Medium',
    tags: ['Nested Comments', 'Recursion', 'React', 'UX'],
    description: 'Implement a comment section that supports replies, editing, deleting and collapse.',
    twist: 'Add real-time updates and lazy loading of replies.',
    icon: <FaCommentDots />,
  },
  {
    name: 'Kanban Board (Trello Clone)',
    slug: 'kanban-board',
    company_asked: ['Atlassian', 'Jira', 'Microsoft'],
    time_limit: 90,
    difficulty: 'Hard',
    tags: ['Drag and Drop', 'React', 'State Sync', 'UX'],
    description: 'Build a board with draggable cards across columns with editable tasks.',
    twist: 'Support offline mode and sync when back online.',
    icon: <FaLayerGroup />,
  },
  {
    name: 'Multi-step Form Wizard',
    slug: 'form-wizard',
    company_asked: ['Google', 'Adobe'],
    time_limit: 45,
    difficulty: 'Medium',
    tags: ['Form Validation', 'React', 'Step Navigation', 'UX'],
    description: 'Create a multi-step form with validation, progress indicator, and summary view.',
    twist: 'Add auto-save and form state recovery after refresh.',
    icon: <FaBolt />,
  },
  {
    name: 'Search Suggestion (Typeahead)',
    slug: 'search-suggestion',
    company_asked: ['Amazon', 'Zomato', 'Swiggy'],
    time_limit: 30,
    difficulty: 'Easy',
    tags: ['Debounce', 'Fetch', 'React', 'UX'],
    description: 'Implement a search bar that shows suggestions with debounce and highlight.',
    twist: 'Group results by category and support keyboard navigation.',
    icon: <FaSearch />,
  }
];

const Layout = styled.div`
  display: flex;
  height: 100vh;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  font-family: "Charter", "Georgia", "Cambria", "Times New Roman", "Times", serif;
`;

const LeftPanel = styled.nav<{ isOpen?: boolean }>`
  width: 320px;
  min-width: 280px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  margin-top: 80px;
  transition: all 0.3s ease;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    position: fixed;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    z-index: 1000;
  }
`;

const RightPanel = styled.aside`
  width: 300px;
  min-width: 250px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  margin-top: 80px;
  transition: all 0.3s ease;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  overflow-y: auto;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const PanelHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 24px 28px 16px 28px;
  font-size: 1.1em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 0.3px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.5em;
  cursor: pointer;
  padding: 8px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const ProblemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 16px 20px;
  flex: 1;
  overflow-y: auto;
`;

const ProblemCard = styled.li<{ selected: boolean; isDisabled?: boolean }>`
  background: ${({ selected, theme }) => selected ? theme.colors.background : theme.colors.backgroundAlt};
  border: 1px solid ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.border};
  border-radius: 10px;
  margin-bottom: 12px;
  padding: 16px;
  color: ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  cursor: ${({ isDisabled }) => isDisabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ isDisabled }) => isDisabled ? 0.7 : 1};
  box-shadow: ${({ selected }) => selected ? '0 4px 12px rgba(0,0,0,0.08)' : 'none'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${({ theme, isDisabled }) => isDisabled ? 'inherit' : theme.colors.background};
    border-color: ${({ theme, isDisabled }) => isDisabled ? 'inherit' : theme.colors.primary};
    box-shadow: ${({ isDisabled }) => isDisabled ? 'none' : '0 4px 12px rgba(0,0,0,0.08)'};
    transform: ${({ isDisabled }) => isDisabled ? 'none' : 'translateY(-1px)'};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: ${({ selected, theme }) => selected ? theme.colors.primary : 'transparent'};
    transition: background 0.2s ease;
  }
`;

const ProblemIcon = styled.div`
  font-size: 1.3em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.9;
`;

const ProblemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProblemTitle = styled.div`
  font-size: 1em;
  font-weight: 500;
  line-height: 1.4;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 6px;
`;

const Badge = styled.span<{ color: string }>`
  background: ${({ color }) => color};
  color: #fff;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 0.8em;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`;

const MainPanel = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  height: 100vh;
  margin-top: 80px;
  transition: all 0.3s ease;
  position: relative;
  overflow-y: auto;
`;

const Header = styled.div`
  width: 100%;
  padding: 32px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  margin-bottom: 24px;
`;

const HeaderContent = styled.div`
  max-width: 900px;
  width: 100%;
  padding: 0 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const MainTitle = styled.h1`
  font-size: 2.2em;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-family: "GT Alpina", "Georgia", "Cambria", "Times New Roman", "Times", serif;
  letter-spacing: -0.016em;
  line-height: 1.2;
  text-align: center;
  position: relative;
  padding-bottom: 16px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const HeaderBadge = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  color: #fff;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 0.95em;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px ${({ color }) => `${color}40`};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ color }) => `${color}50`};
  }

  svg {
    font-size: 1.1em;
  }
`;

const DifficultyBadge = styled(HeaderBadge)`
  background: ${({ theme }) => theme.colors.primary};
`;

const TimeBadge = styled(HeaderBadge)`
  background: #6c63ff;
`;

const MainBadgeRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const ContentCard = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 36px 40px 36px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 0 24px 32px 24px;
  }
`;

const FilterSection = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const SearchInput = styled.div`
  position: relative;
  margin-bottom: 16px;
  
  input {
    width: 100%;
    padding: 10px 14px 10px 38px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9em;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}10`};
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
      opacity: 0.7;
    }
  }
  
  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: color 0.2s ease;
    font-size: 1em;
  }

  &:focus-within svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownFilter = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;
`;

const DropdownButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ isOpen, theme }) => isOpen ? theme.colors.primary : theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9em;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }

  svg {
    transition: transform 0.2s ease;
    transform: rotate(${({ isOpen }) => isOpen ? '180deg' : '0'});
    font-size: 0.9em;
  }
`;

const DropdownContent = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 6px;
  z-index: 10;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-height: 280px;
  overflow-y: auto;
`;

const DropdownOption = styled.div<{ selected: boolean }>`
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ selected, theme }) => selected ? theme.colors.primary : theme.colors.text};
  background: ${({ selected, theme }) => selected ? `${theme.colors.primary}10` : 'transparent'};
  font-weight: ${({ selected }) => selected ? '500' : '400'};
  font-size: 0.9em;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }
`;

const PriceRangeInput = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 8px 12px;

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    font-size: 0.9em;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterLabel = styled.div`
  font-size: 0.9em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 0.9em;
    opacity: 0.7;
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilterChip = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 999px;
  border: 2px solid ${({ active, theme }) => active ? theme.colors.primary : theme.colors.border};
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? '#fff' : theme.colors.text};
  font-size: 0.85em;
  font-weight: ${({ active }) => active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ active, theme }) => active ? theme.colors.primary : 'rgba(108, 99, 255, 0.1)'};
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ClearFilters = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9em;
  font-weight: 500;
  cursor: pointer;
  margin-top: 16px;
  width: 100%;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    font-size: 0.9em;
  }
`;

const InfoSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const InfoTitle = styled.h3`
  font-size: 1.1em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CompanyList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const CompanyTag = styled.div`
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9em;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;

  svg {
    font-size: 0.9em;
  }
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95em;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1em;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const InfoTag = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.85em;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const DesignSection = styled.div`
  margin: 2.5em 0;
  padding: 2em;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h2 {
    margin-top: 0;
    margin-bottom: 1.5em;
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.8em;
    font-weight: 600;

    svg {
      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.2em;
    }
  }
`;

const DesignGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const DesignCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  h3 {
    font-size: 1.2em;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.1em;
    }
  }

  ul {
    margin: 0;
    padding-left: 1.5em;
  }

  li {
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95em;
    line-height: 1.6;
  }
`;

const DiagramContainer = styled.div`
  margin: 32px 0;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
`;

const DiagramBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre;
  overflow-x: auto;
  color: #333;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin: 16px 0;
`;

const DiagramTitle = styled.h3`
  font-size: 1.3em;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DiagramDescription = styled.div`
  margin: 16px 0;
  padding: 16px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 8px;
  font-size: 0.95em;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SystemArchitectureDiagram = () => (
  <DiagramBox>
    {`
    [Client Apps]     [Client Apps]
         ↓                ↓
    [Load Balancer] ← → [Load Balancer]
         ↓                ↓
    [App Server 1]   [App Server 2]
         ↓                ↓
    ┌─────────────────────────────┐
    │        [Cache Layer]        │
    └─────────────────────────────┘
         ↓                ↓
    ┌─────────────────────────────┐
    │         [Database]          │
    └─────────────────────────────┘
         ↓                ↓
    ┌─────────────────────────────┐
    │      [Message Queue]        │
    └─────────────────────────────┘
                ↓
    ┌─────────────────────────────┐
    │      [Worker Process]       │
    └─────────────────────────────┘
    `}
  </DiagramBox>
);

const DataFlowDiagram = () => (
  <DiagramBox>
    {`
    [Client] → [API Gateway] → [Service Layer]
                     ↓
    [Cache] ← → [Service Layer] → [Database]
                     ↓
    [Message Queue] → [Worker] → [Database]
    `}
  </DiagramBox>
);

const ComponentDesignDiagram = () => (
  <DiagramBox>
    {`
    +----------------+     +----------------+
    |    Client      |     |    Service     |
    +----------------+     +----------------+
    | +sendRequest() | --> | +processRequest()|
    | +handleResponse|     | +validateData()  |
    +----------------+     | +handleError()   |
                           +----------------+
                                  ↓
    +----------------+     +----------------+
    |   Database     |     |     Cache      |
    +----------------+     +----------------+
    | +query()       |     | +get()         |
    | +transaction() |     | +set()         |
    | +index()       |     | +invalidate()  |
    +----------------+     +----------------+
    `}
  </DiagramBox>
);

const DataModelDiagram = () => (
  <DiagramBox>
    {`
    +--------+       +---------+       +--------+
    |  User  |       | Message |       | Group  |
    +--------+       +---------+       +--------+
    | id     |       | id      |       | id     |
    | name   |       | content |       | name   |
    | email  |       | user_id |       | desc   |
    +--------+       | group_id|       +--------+
         ↓           +---------+           ↓
         |                ↓                |
         |           +----------+          |
         +---------->| Reaction |<---------+
                     +----------+
                     | id       |
                     | type     |
                     | user_id  |
                     +----------+
    `}
  </DiagramBox>
);

const CodeBlock = styled.pre`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 1.4em;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.8em 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 0.9em;
  line-height: 1.6;
`;

const CodeComment = styled.span`
  color: #6a737d;
  font-style: italic;
`;

const CodeKeyword = styled.span`
  color: #d73a49;
`;

const CodeString = styled.span`
  color: #032f62;
`;

const CodeFunction = styled.span`
  color: #6f42c1;
`;

const CodeVariable = styled.span`
  color: #005cc5;
`;

const ImplementationSection = styled.div`
  margin: 2em 0;
  padding: 1.5em;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ImplementationTitle = styled.h4`
  font-size: 1.2em;
  font-weight: 600;
  margin: 0 0 1em 0;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SystemDesignCode = () => (
  <>
    <ImplementationSection>
      <ImplementationTitle>
        <FaCode />
        API Implementation
      </ImplementationTitle>
      <CodeBlock>
        {`// API Routes
${CodeKeyword}const ${CodeVariable}router = ${CodeFunction}express.Router()${CodeComment};

// Message Routes
${CodeKeyword}router.post('/messages', ${CodeKeyword}async (${CodeVariable}req, ${CodeVariable}res) => {
  ${CodeKeyword}try {
    ${CodeKeyword}const { content, userId, groupId } = ${CodeVariable}req.body;
    ${CodeKeyword}const ${CodeVariable}message = ${CodeKeyword}await ${CodeVariable}Message.create({
      content,
      userId,
      groupId,
      timestamp: ${CodeFunction}Date.now()
    });
    
    ${CodeComment}// Emit to WebSocket
    ${CodeVariable}io.to(groupId).emit('new_message', ${CodeVariable}message);
    
    ${CodeVariable}res.status(201).json(${CodeVariable}message);
  } ${CodeKeyword}catch (${CodeVariable}error) {
    ${CodeVariable}res.status(500).json({ error: ${CodeVariable}error.message });
  }
});`}
      </CodeBlock>
    </ImplementationSection>

    <ImplementationSection>
      <ImplementationTitle>
        <FaDatabase />
        Database Schema
      </ImplementationTitle>
      <CodeBlock>
        {`${CodeComment}// User Schema
${CodeKeyword}const ${CodeVariable}userSchema = ${CodeKeyword}new ${CodeVariable}mongoose.Schema({
  username: { type: ${CodeVariable}String, required: ${CodeKeyword}true, unique: ${CodeKeyword}true },
  email: { type: ${CodeVariable}String, required: ${CodeKeyword}true, unique: ${CodeKeyword}true },
  password: { type: ${CodeVariable}String, required: ${CodeKeyword}true },
  groups: [{ type: ${CodeVariable}mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  unreadCounts: {
    type: ${CodeVariable}Map,
    of: ${CodeVariable}Number,
    default: ${CodeKeyword}new ${CodeVariable}Map()
  }
});

${CodeComment}// Message Schema
${CodeKeyword}const ${CodeVariable}messageSchema = ${CodeKeyword}new ${CodeVariable}mongoose.Schema({
  content: { type: ${CodeVariable}String, required: ${CodeKeyword}true },
  userId: { type: ${CodeVariable}mongoose.Schema.Types.ObjectId, ref: 'User' },
  groupId: { type: ${CodeVariable}mongoose.Schema.Types.ObjectId, ref: 'Group' },
  timestamp: { type: ${CodeVariable}Date, default: ${CodeFunction}Date.now },
  reactions: [{
    type: { type: ${CodeVariable}String },
    userId: { type: ${CodeVariable}mongoose.Schema.Types.ObjectId, ref: 'User' }
  }]
});`}
      </CodeBlock>
    </ImplementationSection>

    <ImplementationSection>
      <ImplementationTitle>
        <FaServer />
        WebSocket Implementation
      </ImplementationTitle>
      <CodeBlock>
        {`${CodeComment}// WebSocket Server Setup
${CodeKeyword}const ${CodeVariable}io = ${CodeKeyword}new ${CodeVariable}Server(${CodeVariable}server);

${CodeVariable}io.on('connection', (${CodeVariable}socket) => {
  ${CodeComment}// Join group chat
  ${CodeVariable}socket.on('join_group', (${CodeVariable}groupId) => {
    ${CodeVariable}socket.join(groupId);
    ${CodeComment}// Reset unread count
    ${CodeKeyword}await ${CodeVariable}User.findByIdAndUpdate(
      ${CodeVariable}socket.userId,
      { $set: { ['unreadCounts.' + groupId]: 0 } }
    );
  });

  ${CodeComment}// Handle new message
  ${CodeVariable}socket.on('send_message', ${CodeKeyword}async (${CodeVariable}data) => {
    ${CodeKeyword}const { content, groupId } = ${CodeVariable}data;
    ${CodeKeyword}const ${CodeVariable}message = ${CodeKeyword}await ${CodeVariable}Message.create({
      content,
      userId: ${CodeVariable}socket.userId,
      groupId
    });

    ${CodeComment}// Notify all users in group except sender
    ${CodeVariable}io.to(groupId).emit('new_message', ${CodeVariable}message);
    
    ${CodeComment}// Update unread counts
    ${CodeKeyword}const ${CodeVariable}group = ${CodeKeyword}await ${CodeVariable}Group.findById(groupId);
    ${CodeKeyword}for (${CodeKeyword}const ${CodeVariable}userId of ${CodeVariable}group.members) {
      ${CodeKeyword}if (${CodeVariable}userId !== ${CodeVariable}socket.userId) {
        ${CodeKeyword}await ${CodeVariable}User.findByIdAndUpdate(
          ${CodeVariable}userId,
          { $inc: { ['unreadCounts.' + groupId]: 1 } }
        );
      }
    }
  });
});`}
      </CodeBlock>
    </ImplementationSection>

    <ImplementationSection>
      <ImplementationTitle>
        <FaCogs />
        Cache Implementation
      </ImplementationTitle>
      <CodeBlock>
        {`${CodeComment}// Redis Cache Implementation
${CodeKeyword}const ${CodeVariable}redis = ${CodeKeyword}new ${CodeVariable}Redis({
  host: ${CodeString}'redis-server',
  port: 6379
});

${CodeComment}// Cache middleware
${CodeKeyword}const ${CodeVariable}cacheMiddleware = ${CodeKeyword}async (${CodeVariable}req, ${CodeVariable}res, ${CodeVariable}next) => {
  ${CodeKeyword}const ${CodeVariable}key = ${CodeVariable}req.originalUrl;
  ${CodeKeyword}const ${CodeVariable}cachedData = ${CodeKeyword}await ${CodeVariable}redis.get(key);
  
  ${CodeKeyword}if (${CodeVariable}cachedData) {
    ${CodeKeyword}return ${CodeVariable}res.json(JSON.parse(cachedData));
  }
  
  ${CodeVariable}res.sendResponse = ${CodeVariable}res.json;
  ${CodeVariable}res.json = (${CodeVariable}body) => {
    ${CodeVariable}redis.setex(key, 3600, JSON.stringify(body));
    ${CodeVariable}res.sendResponse(body);
  };
  
  ${CodeVariable}next();
};`}
      </CodeBlock>
    </ImplementationSection>
  </>
);

function DynamicMDX({ slug }: { slug: string }) {
  const MDXComponent = dynamic(() => import(`./${slug}.mdx`), {
    loading: () => <div>Loading...</div>,
    ssr: true
  });

  return (
    <div className="mdx-content">
      <MDXComponent />
    </div>
  );
}

const MDXContent = styled.div`
  h1 {
    display: none;
  }

  h2 {
    font-size: 1.8em;
    font-weight: 600;
    margin: 2em 0 1em;
    color: ${({ theme }) => theme.colors.text};
    font-family: "GT Alpina", "Georgia", "Cambria", "Times New Roman", "Times", serif;
    letter-spacing: -0.016em;
    line-height: 1.3;
    position: relative;
    padding-bottom: 0.5em;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 2px;
    }
  }

  h3 {
    font-size: 1.4em;
    font-weight: 600;
    margin: 1.8em 0 1em;
    color: ${({ theme }) => theme.colors.text};
    font-family: "GT Alpina", "Georgia", "Cambria", "Times New Roman", "Times", serif;
    letter-spacing: -0.016em;
    line-height: 1.4;
  }

  p {
    font-size: 1.1em;
    line-height: 1.8;
    letter-spacing: -0.003em;
    margin-bottom: 1.8em;
    color: ${({ theme }) => theme.colors.text};
    max-width: 65ch;
  }

  ul, ol {
    font-size: 1.1em;
    line-height: 1.8;
    letter-spacing: -0.003em;
    margin: 1.8em 0;
    padding-left: 2.2em;
    max-width: 65ch;
  }

  li {
    margin-bottom: 1em;
    position: relative;
    color: ${({ theme }) => theme.colors.text};
  }

  li::marker {
    color: ${({ theme }) => theme.colors.primary};
  }

  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 0.9em;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    padding: 0.2em 0.4em;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.border};
  }

  pre {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    padding: 1.4em;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.8em 0;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  pre code {
    background: none;
    padding: 0;
    font-size: 0.9em;
    color: ${({ theme }) => theme.colors.text};
    border: none;
  }

  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    padding: 1em 1.4em;
    margin: 1.8em 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-style: italic;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: 0 8px 8px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.8em 0;
    font-size: 0.95em;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  th, td {
    padding: 1em 1.2em;
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-align: left;
  }

  th {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  tr:nth-child(even) {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }

  tr:hover {
    background: ${({ theme }) => `${theme.colors.primary}08`};
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 1.8em 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: all 0.2s ease;
    border-bottom: 1px solid transparent;
    padding-bottom: 1px;

    &:hover {
      border-bottom-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary}dd;
    }
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    margin: 2.5em 0;
  }

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  section {
    margin: 2.5em 0;
    padding: 1.5em;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h2 {
      margin-top: 0;
    }
  }

  ul li, ol li {
    position: relative;
    padding-left: 0.5em;
  }

  ul li::before {
    content: '•';
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    position: absolute;
    left: -1em;
  }

  pre {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 4px 4px 0 0;
    }
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.primary}20;
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  padding: 40px;
  text-align: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 40px auto;
  max-width: 600px;

  h2 {
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 16px;
    font-size: 1.8em;
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 24px;
    font-size: 1.1em;
  }
`;

const RetryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${({ theme }) => `${theme.colors.primary}40`};
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function ProblemPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState(() => {
    const initialSlug = params?.slug as string;
    return problemsList.find(p => p.slug === initialSlug) || problemsList[0];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedTimeLimits, setSelectedTimeLimits] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigationTimeoutRef = useRef<NodeJS.Timeout>();

  // Update selected problem when URL changes
  useEffect(() => {
    const currentSlug = params?.slug as string;
    const problem = problemsList.find(p => p.slug === currentSlug);
    
    if (!problem) {
      setError('Problem not found');
      return;
    }

    if (problem.slug !== selectedProblem.slug) {
      setIsLoading(true);
      setError(null);
      
      // Clear any existing timeout
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }

      // Set a timeout to handle navigation timeout
      navigationTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        setError('Navigation timeout. Please try again.');
      }, 5000);

      setSelectedProblem(problem);
    }
  }, [params?.slug]);

  // Clear loading state when content is ready
  useEffect(() => {
    if (contentRef.current) {
      setIsLoading(false);
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    }
  }, [selectedProblem]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  // Update URL when problem changes
  const handleProblemSelect = async (problem: typeof problemsList[0]) => {
    try {
      setIsLoading(true);
      setError(null);
      setSelectedProblem(problem);
      await router.push(`/system-design/problems/${problem.slug}`);
    } catch (err) {
      setError('Failed to navigate. Please try again.');
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    const currentSlug = params?.slug as string;
    const problem = problemsList.find(p => p.slug === currentSlug);
    if (problem) {
      handleProblemSelect(problem);
    } else {
      router.push('/system-design/problems');
    }
  };

  // Get unique tags from all problems
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    problemsList.forEach(problem => {
      problem.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const timeLimits = [30, 45, 60, 75, 90, 120];

  const toggleDropdown = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties(prev =>
      prev.includes(difficulty)
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const toggleTimeLimit = (time: number) => {
    setSelectedTimeLimits(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedDifficulties([]);
    setSelectedTimeLimits([]);
    setSelectedTags([]);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [selectedProblem]);

  // Close mobile menu when selecting a problem
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [selectedProblem]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-filter')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (error) {
    return (
      <Layout>
        <ErrorContainer>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <RetryButton onClick={handleRetry}>
            Try Again
          </RetryButton>
        </ErrorContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
        </LoadingOverlay>
      )}
      <LeftPanel isOpen={isMobileMenuOpen}>
        <PanelHeader>
          System Design Problems
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? '×' : '☰'}
          </MobileMenuButton>
        </PanelHeader>
        <FilterSection>
          <SearchInput>
            <FaSearch />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchInput>
          
          <DropdownFilter className="dropdown-filter">
            <DropdownButton 
              isOpen={activeDropdown === 'difficulty'}
              onClick={() => toggleDropdown('difficulty')}
            >
              Difficulty Level {selectedDifficulties.length > 0 && `(${selectedDifficulties.length})`}
              <FaFilter />
            </DropdownButton>
            <DropdownContent isOpen={activeDropdown === 'difficulty'}>
              {difficulties.map(difficulty => (
                <DropdownOption
                  key={difficulty}
                  selected={selectedDifficulties.includes(difficulty)}
                  onClick={() => toggleDifficulty(difficulty)}
                >
                  {difficulty}
                </DropdownOption>
              ))}
            </DropdownContent>
          </DropdownFilter>

          <DropdownFilter className="dropdown-filter">
            <DropdownButton 
              isOpen={activeDropdown === 'timeLimit'}
              onClick={() => toggleDropdown('timeLimit')}
            >
              Time Limit {selectedTimeLimits.length > 0 && `(${selectedTimeLimits.length})`}
              <FaFilter />
            </DropdownButton>
            <DropdownContent isOpen={activeDropdown === 'timeLimit'}>
              {timeLimits.map(time => (
                <DropdownOption
                  key={time}
                  selected={selectedTimeLimits.includes(time)}
                  onClick={() => toggleTimeLimit(time)}
                >
                  {time} min
                </DropdownOption>
              ))}
            </DropdownContent>
          </DropdownFilter>

          <DropdownFilter className="dropdown-filter">
            <DropdownButton 
              isOpen={activeDropdown === 'tags'}
              onClick={() => toggleDropdown('tags')}
            >
              Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
              <FaFilter />
            </DropdownButton>
            <DropdownContent isOpen={activeDropdown === 'tags'}>
              {allTags.map(tag => (
                <DropdownOption
                  key={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </DropdownOption>
              ))}
            </DropdownContent>
          </DropdownFilter>

          {(searchQuery || selectedDifficulties.length > 0 || 
            selectedTimeLimits.length > 0 || selectedTags.length > 0) && (
            <ClearFilters onClick={clearAllFilters}>
              <FaTimes />
              Clear All Filters
            </ClearFilters>
          )}
        </FilterSection>
        <ProblemList>
          {problemsList.map((problem) => (
            <ProblemCard
              key={problem.slug}
              selected={selectedProblem.slug === problem.slug}
              onClick={() => !isLoading && handleProblemSelect(problem)}
              tabIndex={isLoading ? -1 : 0}
              aria-current={selectedProblem.slug === problem.slug ? 'page' : undefined}
              aria-label={problem.name}
              isDisabled={isLoading}
              role="button"
              aria-disabled={isLoading}
            >
              <ProblemIcon>{problem.icon}</ProblemIcon>
              <ProblemInfo>
                <ProblemTitle>{problem.name}</ProblemTitle>
                <BadgeRow>
                  <Badge color={problem.difficulty === 'Hard' ? '#e74c3c' : problem.difficulty === 'Medium' ? '#f39c12' : '#27ae60'}>
                    {problem.difficulty}
                  </Badge>
                  <Badge color={'#6c63ff'}>{problem.time_limit} min</Badge>
                </BadgeRow>
              </ProblemInfo>
            </ProblemCard>
          ))}
        </ProblemList>
      </LeftPanel>
      <MainPanel>
        <Header>
          <HeaderContent>
            <MainTitle>{selectedProblem.name}</MainTitle>
            <BadgeContainer>
              <HeaderBadge color={selectedProblem.difficulty === 'Hard' ? '#e74c3c' : selectedProblem.difficulty === 'Medium' ? '#f39c12' : '#27ae60'}>
                <FaBolt />
                {selectedProblem.difficulty}
              </HeaderBadge>
              <HeaderBadge color={'#6c63ff'}>
                <FaClock />
                {selectedProblem.time_limit} min
              </HeaderBadge>
            </BadgeContainer>
          </HeaderContent>
        </Header>
        <ContentCard ref={contentRef}>
          <Suspense fallback={<div>Loading...</div>}>
            <MDXContent>
              <DynamicMDX slug={selectedProblem.slug} />
            </MDXContent>
          </Suspense>

          <DesignSection>
            <h2>
              <FaBolt />
              High-Level Design (HLD)
            </h2>
            
            <DiagramContainer>
              <DiagramTitle>
                <FaServer />
                System Architecture
              </DiagramTitle>
              <SystemArchitectureDiagram />
              <DiagramDescription>
                The system architecture shows the main components and their interactions. The load balancer distributes traffic across multiple application servers, which interact with the cache layer, database, and message queue. Worker processes handle asynchronous tasks and background jobs.
              </DiagramDescription>
            </DiagramContainer>

            <DiagramContainer>
              <DiagramTitle>
                <FaNetworkWired />
                Data Flow
              </DiagramTitle>
              <DataFlowDiagram />
              <DiagramDescription>
                This diagram illustrates the data flow through the system. Requests from clients go through the API Gateway, which routes them to appropriate services. Services interact with cache and database layers, while asynchronous operations are handled through the message queue system.
              </DiagramDescription>
            </DiagramContainer>

            <DesignGrid>
              <DesignCard>
                <h3>
                  <FaBuilding />
                  System Components
                </h3>
                <ul>
                  <li>Client Applications</li>
                  <li>Load Balancer</li>
                  <li>Application Servers</li>
                  <li>Database Servers</li>
                  <li>Cache Layer</li>
                  <li>Message Queue</li>
                </ul>
              </DesignCard>
              <DesignCard>
                <h3>
                  <FaComments />
                  Communication Flow
                </h3>
                <ul>
                  <li>Client-Server Communication</li>
                  <li>Inter-service Communication</li>
                  <li>Data Flow Patterns</li>
                  <li>Error Handling</li>
                </ul>
              </DesignCard>
              <DesignCard>
                <h3>
                  <FaChartLine />
                  Performance Considerations
                </h3>
                <ul>
                  <li>Scalability Strategy</li>
                  <li>Load Distribution</li>
                  <li>Response Time Optimization</li>
                  <li>Resource Utilization</li>
                </ul>
              </DesignCard>
            </DesignGrid>
          </DesignSection>

          <DesignSection>
            <h2>
              <FaBolt />
              Low-Level Design (LLD)
            </h2>

            <DiagramContainer>
              <DiagramTitle>
                <FaCode />
                Component Design
              </DiagramTitle>
              <ComponentDesignDiagram />
              <DiagramDescription>
                The component design shows the main classes and their relationships. The Client class handles user interactions, while the Service class processes requests and manages business logic. The Database and Cache classes handle data persistence and caching respectively.
              </DiagramDescription>
            </DiagramContainer>

            <DiagramContainer>
              <DiagramTitle>
                <FaDatabase />
                Data Model
              </DiagramTitle>
              <DataModelDiagram />
              <DiagramDescription>
                The data model shows the relationships between different entities in the system. Users can send messages and join groups, while messages can have reactions. Each entity has its own attributes and relationships with other entities.
              </DiagramDescription>
            </DiagramContainer>

            <DesignGrid>
              <DesignCard>
                <h3>
                  <FaCode />
                  Implementation Details
                </h3>
                <ul>
                  <li>API Endpoints</li>
                  <li>Business Logic</li>
                  <li>Error Handling</li>
                  <li>Security Measures</li>
                </ul>
              </DesignCard>
              <DesignCard>
                <h3>
                  <FaDatabase />
                  Database Schema
                </h3>
                <ul>
                  <li>Table Structures</li>
                  <li>Relationships</li>
                  <li>Indexing Strategy</li>
                  <li>Query Optimization</li>
                </ul>
              </DesignCard>
              <DesignCard>
                <h3>
                  <FaCogs />
                  Technical Specifications
                </h3>
                <ul>
                  <li>API Documentation</li>
                  <li>Service Contracts</li>
                  <li>Data Validation</li>
                  <li>Error Codes</li>
                </ul>
              </DesignCard>
            </DesignGrid>

            <SystemDesignCode />
          </DesignSection>
        </ContentCard>
      </MainPanel>
      <RightPanel>
        <InfoSection>
          <InfoTitle>
            <FaComments />
            Problem Overview
          </InfoTitle>
          <CompanyList>
            {selectedProblem.company_asked.map(company => (
              <CompanyTag key={company}>
                <FaBuilding />
                {company}
              </CompanyTag>
            ))}
          </CompanyList>
          <InfoRow>
            <FaClock />
            Time Limit: {selectedProblem.time_limit} minutes
          </InfoRow>
          <InfoRow>
            <FaBolt />
            Difficulty: {selectedProblem.difficulty}
          </InfoRow>
          <InfoRow>
            <FaList />
            Tags:
          </InfoRow>
          <TagList>
            {selectedProblem.tags.map(tag => (
              <InfoTag key={tag}>{tag}</InfoTag>
            ))}
          </TagList>
        </InfoSection>

        <InfoSection>
          <InfoTitle>
            <FaCommentDots />
            Problem Description
          </InfoTitle>
          <div style={{ color: '#666', fontSize: '0.95em', lineHeight: 1.5 }}>
            {selectedProblem.description}
          </div>
        </InfoSection>

        <InfoSection>
          <InfoTitle>
            <FaBolt />
            Additional Challenge
          </InfoTitle>
          <div style={{ color: '#666', fontSize: '0.95em', lineHeight: 1.5 }}>
            {selectedProblem.twist}
          </div>
        </InfoSection>
      </RightPanel>
    </Layout>
  );
}

