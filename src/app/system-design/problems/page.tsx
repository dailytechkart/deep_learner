'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FaFilter,
  FaSearch,
  FaTimes,
  FaClock,
  FaCode,
  FaServer,
  FaLaptopCode,
  FaGoogle,
  FaAmazon,
  FaMicrosoft,
  FaFacebook,
  FaApple,
  FaPlay,
  FaStar,
  FaBuilding,
  FaChevronDown,
  FaUsers,
  FaBook,
  FaRocket,
  FaChartLine,
  FaSpinner,
  FaLock,
} from 'react-icons/fa';
import Breadcrumbs from '@/components/Breadcrumbs';
import SEO from '@/components/SEO';
import { MainLayout } from '@/components/MainLayout';
import { useTheme } from '@/app/context/ThemeContext';

// Types
interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'Distributed Systems' | 'Cloud' | 'Database' | 'Security';
  estimatedTime: string;
  link: string;
  companies?: string[];
  popularity: number;
  lastUpdated: string;
  prerequisites?: string[];
  keyConcepts?: string[];
  isPremium?: boolean;
}

interface Theme {
  colors: {
    background: {
      primary: string;
      secondary: string;
      hover: string;
    };
    text: {
      primary: string;
      secondary: string;
    };
    border: string;
    primary: string;
    success: string;
    warning: string;
    error: string;
  };
}

// Color palette for tags
const tagColors = {
  beginner: { bg: '#E0F7FA', color: '#00796B' },
  intermediate: { bg: '#FFF3E0', color: '#F57C00' },
  advanced: { bg: '#FCE4EC', color: '#C2185B' },
  technology: { bg: '#E3F2FD', color: '#1976D2' },
  role: { bg: '#EDE7F6', color: '#512DA8' },
  company: {
    Google: { bg: '#E8F0FE', color: '#4285F4' },
    Meta: { bg: '#E7F3FF', color: '#1877F2' },
    Amazon: { bg: '#FFF7E0', color: '#FF9900' },
    Microsoft: { bg: '#EAF1FB', color: '#0078D4' },
    Apple: { bg: '#F5F5F7', color: '#000000' },
    default: { bg: '#F3E5F5', color: '#8E24AA' },
  },
};

const getCompanyTagColor = (company: string) => {
  return tagColors.company[company as keyof typeof tagColors.company] || tagColors.company.default;
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const MainContent = styled.main`
  max-width: 1400px;
  width: 100%;
  padding: 2rem;
  display: flex;
  gap: 2rem;
`;

const FilterSidebar = styled.aside`
  width: 320px;
  flex-shrink: 0;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  height: fit-content;
  position: sticky;
  top: 2rem;
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.xl};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const FilterIcon = styled(FaFilter)`
    color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
`;

const FilterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const FilterSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.border};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.sm};
    border-color: ${props => props.theme.colors.primary}40;
  }
`;

const FilterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ClearAllButton = styled.button`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  background: transparent;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  &:hover {
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: ${props => props.theme.spacing.xl};

  input {
    width: 100%;
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.lg};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.fontSize.md};
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
    }
  }

  svg {
    position: absolute;
    left: ${props => props.theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const ProblemsGrid = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  align-content: start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.lg};
`;

const Card = styled(motion.div)`
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  overflow: hidden;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${props => props.theme.colors.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  line-height: 1.3;
`;

const CardDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
`;

const Badge = styled.span<{ difficulty: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  background: ${props => 
    props.difficulty === 'Easy' 
      ? '#4CAF50'
      : props.difficulty === 'Medium'
      ? '#FF9800'
      : '#F44336'};
  color: white;
`;

const TimeEstimate = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
`;

const Tag = styled.span`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  background: ${props => props.theme.colors.primary}15;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  border: 1px solid ${props => props.theme.colors.primary}30;
`;

const CompanyTag = styled.span<{ company: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  border: 1px solid ${props => props.theme.colors.border};

  svg {
    font-size: ${props => props.theme.typography.fontSize.xs};
  }
`;

const LastUpdated = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  margin-top: ${props => props.theme.spacing.xs};
`;

const Prerequisites = styled.div`
  margin-top: ${props => props.theme.spacing.sm};
  padding-top: ${props => props.theme.spacing.sm};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const PrerequisitesTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.xs};
`;

const PrerequisitesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const PrerequisiteItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.xs};

  svg {
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => props.theme.colors.primary};
  }
`;

const PremiumBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const PopularityBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  background: linear-gradient(135deg, #4CAF50, #2196F3);
  color: white;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.theme.colors.textSecondary};
  border: 1px dashed ${props => props.theme.colors.border};

  h3 {
    font-size: ${props => props.theme.typography.fontSize.lg};
    color: ${props => props.theme.colors.text};
    margin: 0 0 ${props => props.theme.spacing.sm};
  }

  p {
    margin: 0;
    font-size: ${props => props.theme.typography.fontSize.md};
  }
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => (props.active ? props.theme.colors.primary : 'transparent')};
  background: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.background};
  color: ${props => (props.active ? '#FFFFFF' : props.theme.colors.text)};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  width: 100%;
  margin-bottom: ${props => props.theme.spacing.xs};

  &:hover {
    transform: translateX(4px);
    border-color: ${props => props.theme.colors.primary};
    background: ${props =>
      props.active ? props.theme.colors.primary : props.theme.colors.backgroundAlt};
  }

  &:active {
    transform: translateX(2px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const FilterButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const FilterButtonIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.primary};
  font-size: 0.9rem;
`;

const FilterButtonText = styled.span`
  flex: 1;
`;

const FilterButtonCount = styled.span`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.textSecondary};
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  min-width: 24px;
  text-align: center;
`;

const FilterButtonChevron = styled(FaChevronDown)<{ isOpen?: boolean }>`
  transition: transform 0.2s ease;
  transform: rotate(${props => (props.isOpen ? '180deg' : '0')});
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.8rem;
`;

const FilterGroup = styled.div<{ isOpen: boolean }>`
  max-height: ${props => (props.isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  margin-top: ${props => (props.isOpen ? props.theme.spacing.sm : '0')};
`;

const FilterSectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
  }
`;

const FilterSectionTitleText = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const CompanyFilterSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border};
`;

const CompanyFilterBadge = styled.button<{ active: boolean; company: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.active ? 'transparent' : props.theme.colors.border};
  background: ${props => {
    if (props.active) {
      switch (props.company.toLowerCase()) {
        case 'google':
          return '#4285F4';
        case 'amazon':
          return '#FF9900';
        case 'microsoft':
          return '#0078D4';
        case 'meta':
          return '#1877F2';
        case 'apple':
          return '#000000';
        default:
          return props.theme.colors.primary;
      }
    }
    return props.theme.colors.background;
  }};
  color: ${props => props.active ? '#FFFFFF' : props.theme.colors.text};
  box-shadow: ${props => props.active ? props.theme.shadows.sm : 'none'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  svg {
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

const PageHeader = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.sm} 0;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  line-height: 1.2;
`;

// Data
const systemDesignProblems: Problem[] = [
  {
    id: 'design-chat-app',
    title: 'Design a Chat Application',
    description: 'Build a real-time chat app with message delivery, read receipts, and typing indicators.',
    difficulty: 'Hard',
    tags: ['WebSockets', 'State Management', 'Real-time', 'Scalability'],
    category: 'Frontend',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/chat-app',
    companies: ['Meta', 'Microsoft', 'Uber'],
    popularity: 95,
    lastUpdated: '2024-05-01',
    prerequisites: ['WebSocket protocol', 'Real-time data handling'],
    keyConcepts: ['WebSockets', 'Message Queues', 'Presence', 'Optimistic UI'],
    isPremium: true,
  },
  {
    id: 'design-news-feed',
    title: 'Design a News Feed System',
    description: 'Create a scrollable news feed with ranking, caching, and real-time updates.',
    difficulty: 'Hard',
    tags: ['Pagination', 'Caching', 'Feed Ranking', 'Virtual Scroll'],
    category: 'Frontend',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/news-feed',
    companies: ['Meta', 'Google'],
    popularity: 94,
    lastUpdated: '2024-05-02',
    prerequisites: ['DOM rendering', 'Browser performance'],
    keyConcepts: ['Infinite Scroll', 'Content Ranking', 'Memoization', 'Batch Fetching'],
    isPremium: true,
  },
  {
    id: 'design-file-explorer',
    title: 'Design a File Explorer UI',
    description: 'Design a file explorer that supports folders, preview, and actions like delete or move.',
    difficulty: 'Medium',
    tags: ['Tree Structure', 'Lazy Loading', 'Context Menu', 'Drag and Drop'],
    category: 'Frontend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/file-explorer',
    companies: ['Google', 'Dropbox'],
    popularity: 90,
    lastUpdated: '2024-05-03',
    prerequisites: ['Tree traversal', 'Event handling'],
    keyConcepts: ['Recursive Components', 'Tree Flattening', 'Optimistic UI', 'Keyboard Navigation'],
    isPremium: true,
  },
  {
    id: 'design-spreadsheet',
    title: 'Design a Spreadsheet App',
    description: 'Build a spreadsheet application that supports formulas, cells dependency, and bulk updates.',
    difficulty: 'Hard',
    tags: ['Data Grid', 'Formula Engine', 'DOM Virtualization', 'Performance'],
    category: 'Frontend',
    estimatedTime: '90-120 mins',
    link: '/system-design/problems/spreadsheet',
    companies: ['Google', 'Microsoft'],
    popularity: 92,
    lastUpdated: '2024-05-04',
    prerequisites: ['Formula parsing', 'Data grids'],
    keyConcepts: ['Recalculation Engine', 'Dependency Graph', 'Virtual Scrolling', 'Undo/Redo'],
    isPremium: true,
  },
  {
    id: 'design-collaborative-editor',
    title: 'Design a Collaborative Editor',
    description: 'Create a real-time collaborative document editing tool like Google Docs.',
    difficulty: 'Hard',
    tags: ['CRDT', 'WebSockets', 'Real-time', 'Text Sync'],
    category: 'Frontend',
    estimatedTime: '90-120 mins',
    link: '/system-design/problems/collaborative-editor',
    companies: ['Google', 'Figma'],
    popularity: 91,
    lastUpdated: '2024-05-05',
    prerequisites: ['CRDT or OT knowledge', 'Conflict resolution'],
    keyConcepts: ['CRDT', 'Presence', 'Sync Engine', 'Cursor Sharing'],
    isPremium: true,
  },
  {
    id: 'design-video-platform-ui',
    title: 'Design a Video Streaming Platform UI',
    description: 'Build the frontend for a video platform like YouTube or Netflix.',
    difficulty: 'Medium',
    tags: ['Video Player', 'Lazy Loading', 'Responsive UI'],
    category: 'Frontend',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/video-ui',
    companies: ['Netflix', 'Hotstar', 'Amazon'],
    popularity: 88,
    lastUpdated: '2024-05-06',
    prerequisites: ['Video playback', 'Responsive design'],
    keyConcepts: ['Custom Player Controls', 'Adaptive Streaming', 'Virtual DOM', 'Skeleton Screens'],
    isPremium: true,
  },
  {
    id: 'design-dashboard',
    title: 'Design a Dashboard with Filters and Widgets',
    description: 'Build an analytics dashboard that supports multiple widgets and data filters.',
    difficulty: 'Medium',
    tags: ['Filters', 'Charts', 'Component Composition'],
    category: 'Frontend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/dashboard',
    companies: ['Salesforce', 'Amazon'],
    popularity: 87,
    lastUpdated: '2024-05-07',
    prerequisites: ['Chart libraries', 'State sync'],
    keyConcepts: ['Drill-down Views', 'Filter Context', 'Component Lazy Load'],
    isPremium: true,
  },
  {
    id: 'design-calendar-app',
    title: 'Design a Calendar Scheduling UI',
    description: 'Create a calendar UI to manage events with drag and drop capabilities.',
    difficulty: 'Medium',
    tags: ['Time Slot Management', 'Drag and Drop', 'Event Handling'],
    category: 'Frontend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/calendar-ui',
    companies: ['Google', 'Zoom'],
    popularity: 85,
    lastUpdated: '2024-05-08',
    prerequisites: ['Time math', 'DOM events'],
    keyConcepts: ['Calendar Grid', 'Overlap Resolution', 'Auto Reschedule'],
    isPremium: true,
  },
  {
    id: 'design-checkout-flow',
    title: 'Design a Multi-step Checkout Flow',
    description: 'Create a secure and intuitive multi-step checkout form.',
    difficulty: 'Medium',
    tags: ['Form Management', 'Validation', 'UX'],
    category: 'Frontend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/checkout-flow',
    companies: ['Amazon', 'Shopify'],
    popularity: 86,
    lastUpdated: '2024-05-09',
    prerequisites: ['Form libraries', 'State transitions'],
    keyConcepts: ['Stepper UI', 'Validation Schema', 'Auto Save'],
    isPremium: true,
  },
  {
    id: 'design-code-editor',
    title: 'Design a Web Code Editor',
    description: 'Build an in-browser code editor with syntax highlighting and tab management.',
    difficulty: 'Hard',
    tags: ['Syntax Highlighting', 'Editor', 'Performance'],
    category: 'Frontend',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/code-editor',
    companies: ['GitHub', 'Replit'],
    popularity: 89,
    lastUpdated: '2024-05-10',
    prerequisites: ['Codemirror/Monaco knowledge'],
    keyConcepts: ['Debouncing', 'Tab Layout', 'Hot Reload'],
    isPremium: true,
  },
  {
    id: 'design-image-editor',
    title: 'Design an Image Editor UI',
    description: 'Build a tool for image cropping, filtering, and drawing.',
    difficulty: 'Medium',
    tags: ['Canvas', 'Image Manipulation', 'UI Controls'],
    category: 'Frontend',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/image-editor',
    companies: ['Canva', 'Adobe'],
    popularity: 88,
    lastUpdated: '2024-05-11',
    prerequisites: ['Canvas API', 'Event listeners'],
    keyConcepts: ['Zoom/Pan', 'Undo Stack', 'Toolbar Management'],
    isPremium: true,
  },
  {
    id: 'design-issue-tracker',
    title: 'Design an Issue Tracker UI',
    description: 'Design a ticket management UI with labels, filters, and drag/drop status.',
    difficulty: 'Medium',
    tags: ['Drag and Drop', 'Status Filters', 'Task View'],
    category: 'Frontend',
    estimatedTime: '60 mins',
    link: '/system-design/problems/issue-tracker',
    companies: ['GitHub', 'Atlassian'],
    popularity: 87,
    lastUpdated: '2024-05-12',
    prerequisites: ['Board layouts', 'State sync'],
    keyConcepts: ['Kanban UI', 'Bulk Actions', 'Collapsible Panels'],
    isPremium: true,
  },
  {
    id: 'design-notification-system',
    title: 'Design a Notification System UI',
    description: 'Create a frontend for real-time user notifications.',
    difficulty: 'Medium',
    tags: ['WebSockets', 'Toast UI', 'Unread Count'],
    category: 'Frontend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/notifications',
    companies: ['Meta', 'Twitter'],
    popularity: 84,
    lastUpdated: '2024-05-13',
    prerequisites: ['Polling vs WebSocket'],
    keyConcepts: ['Toast Queue', 'Read State', 'Reconnection Handling'],
    isPremium: true,
  },
  {
    id: 'design-whiteboard',
    title: 'Design a Real-time Whiteboard',
    description: 'Build a whiteboard app that supports drawing and real-time sync.',
    difficulty: 'Hard',
    tags: ['Canvas', 'WebRTC', 'Real-time', 'Drawing Tools'],
    category: 'Frontend',
    estimatedTime: '90-120 mins',
    link: '/system-design/problems/whiteboard',
    companies: ['Zoom', 'Figma', 'Miro'],
    popularity: 90,
    lastUpdated: '2024-05-14',
    prerequisites: ['Canvas basics', 'WebRTC'],
    keyConcepts: ['Stroke Sync', 'Tool Palettes', 'Lag Compensation'],
    isPremium: true,
  },
  {
    id: 'design-pbac-dashboard',
    title: 'Design a PBAC Admin Dashboard',
    description: 'Build a permission-based access control system for UI elements.',
    difficulty: 'Medium',
    tags: ['RBAC', 'PBAC', 'Conditional Rendering'],
    category: 'Frontend',
    estimatedTime: '60 mins',
    link: '/system-design/problems/pbac-dashboard',
    companies: ['Stripe', 'Salesforce'],
    popularity: 83,
    lastUpdated: '2024-05-15',
    prerequisites: ['Permission APIs'],
    keyConcepts: ['Permission Mapping', 'Role Hierarchy', 'UI Toggles'],
    isPremium: true,
  }
];

const getCompanyIcon = (company: string) => {
  switch (company.toLowerCase()) {
    case 'google':
      return <FaGoogle />;
    case 'amazon':
      return <FaAmazon />;
    case 'microsoft':
      return <FaMicrosoft />;
    case 'meta':
      return <FaFacebook />;
    case 'apple':
      return <FaApple />;
    case 'netflix':
      return <FaPlay />;
    default:
      return null;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Frontend':
      return <FaCode />;
    case 'Backend':
      return <FaServer />;
    case 'Full Stack':
      return <FaLaptopCode />;
    default:
      return null;
  }
};

export default function SystemDesignProblemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState({
    difficulty: true,
    category: true,
    companies: true,
    tags: true,
  });
  const { isDarkMode } = useTheme();

  const allTags = Array.from(new Set(systemDesignProblems.flatMap(p => p.tags)));

  const filteredProblems = systemDesignProblems.filter(problem => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      selectedDifficulties.length === 0 || selectedDifficulties.includes(problem.difficulty);
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(problem.category);
    const matchesCompany = selectedCompanies.length === 0 || 
      (problem.companies && problem.companies.some(company => selectedCompanies.includes(company)));
    const matchesTags =
      selectedTags.length === 0 || selectedTags.some(tag => problem.tags.includes(tag));

    return matchesSearch && matchesDifficulty && matchesCategory && matchesCompany && matchesTags;
  });

  const toggleFilter = (
    filter: string,
    currentFilters: string[],
    setFilters: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setFilters(
      currentFilters.includes(filter)
        ? currentFilters.filter(f => f !== filter)
        : [...currentFilters, filter]
    );
  };

  const clearAllFilters = () => {
    setSelectedDifficulties([]);
    setSelectedCategories([]);
    setSelectedCompanies([]);
    setSelectedTags([]);
    setSearchQuery('');
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getFilterCount = (type: string, value: string) => {
    return systemDesignProblems.filter(problem => {
      switch (type) {
        case 'difficulty':
          return problem.difficulty === value;
        case 'category':
          return problem.category === value;
        case 'companies':
          return problem.companies?.includes(value);
        case 'tags':
          return problem.tags.includes(value);
        default:
          return false;
      }
    }).length;
  };

  const companies = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'System Design', href: '/system-design' },
    { label: 'Problems', href: '/system-design/problems' },
  ];

  return (
    <MainLayout>
      <SEO
        title="System Design Problems | Practice Real-World System Design Challenges"
        description="Master system design with our curated collection of real-world problems. Practice designing scalable, efficient systems with problems from top tech companies like Google, Amazon, and Microsoft."
        keywords={[
          'system design',
          'practice problems',
          'frontend architecture',
          'backend architecture',
          'scalability',
          'performance',
          'interview preparation',
          'tech interview',
          'software architecture',
          'distributed systems',
        ]}
        ogImage="/images/system-design-problems-og.jpg"
        ogType="website"
        twitterCard="summary_large_image"
      />
      <PageContainer>
        <PageHeader>
          <HeaderContent>
            <Breadcrumbs items={breadcrumbItems} />
            <PageTitle>System Design Problems</PageTitle>
          </HeaderContent>
        </PageHeader>
        <MainContent>
          <FilterSidebar>
            <FilterHeader>
              <FilterIcon />
              <FilterTitle>Filters</FilterTitle>
            </FilterHeader>

          <SearchBar>
            <FaSearch />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </SearchBar>

            <FilterActions>
              <span>Active Filters</span>
              <ClearAllButton onClick={clearAllFilters}>
                <FaTimes /> Clear All
              </ClearAllButton>
            </FilterActions>

            <FilterSection>
              <FilterSectionTitle onClick={() => toggleSection('difficulty')}>
                <FilterSectionTitleText>
                  <FaChartLine /> Difficulty
                </FilterSectionTitleText>
                <FilterButtonChevron isOpen={openSections.difficulty} />
              </FilterSectionTitle>
              <FilterGroup isOpen={openSections.difficulty}>
            {['Easy', 'Medium', 'Hard'].map(difficulty => (
                  <FilterButton
                    key={difficulty}
                    active={selectedDifficulties.includes(difficulty)}
                    onClick={() => toggleFilter(difficulty, selectedDifficulties, setSelectedDifficulties)}
                  >
                    <FilterButtonContent>
                      <FilterButtonIcon>
                        {difficulty === 'Easy' ? <FaRocket /> : difficulty === 'Medium' ? <FaChartLine /> : <FaSpinner />}
                      </FilterButtonIcon>
                      <FilterButtonText>{difficulty}</FilterButtonText>
                    </FilterButtonContent>
                    <FilterButtonCount>{getFilterCount('difficulty', difficulty)}</FilterButtonCount>
                  </FilterButton>
            ))}
          </FilterGroup>
            </FilterSection>

            <FilterSection>
              <FilterSectionTitle onClick={() => toggleSection('category')}>
                <FilterSectionTitleText>
                  <FaBook /> Category
                </FilterSectionTitleText>
                <FilterButtonChevron isOpen={openSections.category} />
              </FilterSectionTitle>
              <FilterGroup isOpen={openSections.category}>
                {['Frontend', 'Backend', 'Full Stack', 'Distributed Systems', 'Cloud', 'Database', 'Security'].map(category => (
                  <FilterButton
                    key={category}
                    active={selectedCategories.includes(category)}
                    onClick={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
                  >
                    <FilterButtonContent>
                      <FilterButtonIcon>
                {getCategoryIcon(category)}
                      </FilterButtonIcon>
                      <FilterButtonText>{category}</FilterButtonText>
                    </FilterButtonContent>
                    <FilterButtonCount>{getFilterCount('category', category)}</FilterButtonCount>
                  </FilterButton>
            ))}
          </FilterGroup>
            </FilterSection>

            <FilterSection>
              <FilterSectionTitle onClick={() => toggleSection('companies')}>
                <FilterSectionTitleText>
                  <FaBuilding /> Companies
                </FilterSectionTitleText>
                <FilterButtonChevron isOpen={openSections.companies} />
              </FilterSectionTitle>
              <FilterGroup isOpen={openSections.companies}>
                {companies.map(company => (
                  <FilterButton
                    key={company}
                    active={selectedCompanies.includes(company)}
                    onClick={() => toggleFilter(company, selectedCompanies, setSelectedCompanies)}
                  >
                    <FilterButtonContent>
                      <FilterButtonIcon>
                        {getCompanyIcon(company)}
                      </FilterButtonIcon>
                      <FilterButtonText>{company}</FilterButtonText>
                    </FilterButtonContent>
                    <FilterButtonCount>{getFilterCount('companies', company)}</FilterButtonCount>
                  </FilterButton>
                ))}
              </FilterGroup>
            </FilterSection>

            <FilterSection>
              <FilterSectionTitle onClick={() => toggleSection('tags')}>
                <FilterSectionTitleText>
                  <FaCode /> Tags
                </FilterSectionTitleText>
                <FilterButtonChevron isOpen={openSections.tags} />
              </FilterSectionTitle>
              <FilterGroup isOpen={openSections.tags}>
            {allTags.map(tag => (
                  <FilterButton
                    key={tag}
                    active={selectedTags.includes(tag)}
                    onClick={() => toggleFilter(tag, selectedTags, setSelectedTags)}
                  >
                    <FilterButtonContent>
                      <FilterButtonText>{tag}</FilterButtonText>
                    </FilterButtonContent>
                    <FilterButtonCount>{getFilterCount('tags', tag)}</FilterButtonCount>
                  </FilterButton>
            ))}
          </FilterGroup>
            </FilterSection>
          </FilterSidebar>

        <ProblemsGrid>
          <CompanyFilterSection>
            {companies.map(company => (
              <CompanyFilterBadge
                key={company}
                active={selectedCompanies.includes(company)}
                company={company}
                onClick={() => toggleFilter(company, selectedCompanies, setSelectedCompanies)}
              >
                {getCompanyIcon(company)}
                {company}
              </CompanyFilterBadge>
            ))}
          </CompanyFilterSection>

          {filteredProblems.length > 0 ? (
            filteredProblems.map(problem => (
              <Card
                key={problem.id}
                whileHover={{ y: -5 }}
                  onClick={() => window.location.href = problem.link}
              >
                  <CardHeader>
                <CardTitle>{problem.title}</CardTitle>
                    {problem.isPremium ? (
                      <PremiumBadge>
                        <FaLock /> Premium
                      </PremiumBadge>
                    ) : (
                      <PopularityBadge>
                        <FaStar /> {problem.popularity}% Popular
                      </PopularityBadge>
                    )}
                  </CardHeader>
                <CardDescription>{problem.description}</CardDescription>
                <CardFooter>
                    <CardMeta>
                      <Badge difficulty={problem.difficulty}>
                        {problem.difficulty === 'Easy' ? <FaRocket /> : problem.difficulty === 'Medium' ? <FaChartLine /> : <FaSpinner />}
                        {problem.difficulty}
                      </Badge>
                      <TimeEstimate>
                        <FaClock />
                        {problem.estimatedTime}
                      </TimeEstimate>
                    </CardMeta>
                  <TagList>
                    {problem.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagList>
                  {problem.companies && (
                    <TagList>
                      {problem.companies.map(company => (
                        <CompanyTag key={company} company={company}>
                          {getCompanyIcon(company)}
                          {company}
                        </CompanyTag>
                      ))}
                    </TagList>
                  )}
                    <LastUpdated>
                    <FaClock />
                      Last updated: {problem.lastUpdated}
                    </LastUpdated>
                    {problem.prerequisites && (
                      <Prerequisites>
                        <PrerequisitesTitle>
                          <FaBook />
                          Prerequisites:
                        </PrerequisitesTitle>
                        <PrerequisitesList>
                          {problem.prerequisites.map((prerequisite, index) => (
                            <PrerequisiteItem key={index}>
                              <FaChevronDown />
                              {prerequisite}
                            </PrerequisiteItem>
                          ))}
                        </PrerequisitesList>
                      </Prerequisites>
                    )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <NoResults>
              <h3>No problems found</h3>
              <p>Try adjusting your filters or search query</p>
            </NoResults>
          )}
        </ProblemsGrid>
        </MainContent>
      </PageContainer>
    </MainLayout>
  );
}
