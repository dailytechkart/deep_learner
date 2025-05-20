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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  align-content: start;
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
  gap: ${props => props.theme.spacing.md};
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
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
  position: relative;
  padding-right: 100px;
`;

const CardTitle = styled.h3<{ theme: Theme }>`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: ${props => props.theme.colors.text.primary};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const CardDescription = styled.p<{ theme: Theme }>`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.text.secondary};
  margin: 0;
  line-height: 1.6;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  flex-wrap: wrap;
`;

const PremiumBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  white-space: nowrap;
`;

const PopularityBadge = styled.div<{ theme: Theme }>`
  position: absolute;
  top: 0;
  right: 0;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 1;
  white-space: nowrap;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span<{
  type?: 'beginner' | 'intermediate' | 'advanced' | 'technology' | 'role';
  color?: string;
  bgColor?: string;
}>`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${({ type, bgColor }) =>
    bgColor
      ? bgColor
      : type === 'beginner'
        ? tagColors.beginner.bg
        : type === 'intermediate'
          ? tagColors.intermediate.bg
          : type === 'advanced'
            ? tagColors.advanced.bg
            : type === 'technology'
              ? tagColors.technology.bg
              : type === 'role'
                ? tagColors.role.bg
                : tagColors.beginner.bg};
  color: ${({ type, color }) =>
    color
      ? color
      : type === 'beginner'
        ? tagColors.beginner.color
        : type === 'intermediate'
          ? tagColors.intermediate.color
          : type === 'advanced'
            ? tagColors.advanced.color
            : type === 'technology'
              ? tagColors.technology.color
              : type === 'role'
                ? tagColors.role.color
                : tagColors.beginner.color};
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.08);
  }
`;

const CompanyTag = styled(Tag)<{ company: string }>`
  background: ${({ company }) => getCompanyTagColor(company).bg};
  color: ${({ company }) => getCompanyTagColor(company).color};
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`;

const Badge = styled.span<{ difficulty: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.875rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${({ difficulty }) =>
    difficulty === 'Easy'
      ? tagColors.beginner.bg
      : difficulty === 'Medium'
        ? tagColors.intermediate.bg
        : difficulty === 'Hard'
          ? tagColors.advanced.bg
          : tagColors.beginner.bg};
  color: ${({ difficulty }) =>
    difficulty === 'Easy'
      ? tagColors.beginner.color
      : difficulty === 'Medium'
        ? tagColors.intermediate.color
        : difficulty === 'Hard'
          ? tagColors.advanced.color
          : tagColors.beginner.color};
`;

const TimeEstimate = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-top: 0.5rem;
`;

const LastUpdated = styled.div<{ theme: Theme }>`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.secondary};
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const Prerequisites = styled.div<{ theme: Theme }>`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const PrerequisitesTitle = styled.h4<{ theme: Theme }>`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const PrerequisitesList = styled.ul<{ theme: Theme }>`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PrerequisiteItem = styled.li<{ theme: Theme }>`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.secondary};
  background: ${props => props.theme.colors.background.hover};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const NoResults = styled.div<{ theme: Theme }>`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background: ${props => props.theme.colors.background.secondary};
  border-radius: 12px;
  color: ${props => props.theme.colors.text.secondary};
  border: 1px dashed ${props => props.theme.colors.border};
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

// Data
const systemDesignProblems: Problem[] = [
  {
    id: 'design-url-shortener',
    title: 'Design a URL Shortener Service',
    description: 'Design a service that takes long URLs and converts them into shorter, more manageable URLs. Consider scalability, availability, and performance.',
    difficulty: 'Medium',
    tags: ['Distributed Systems', 'Caching', 'Database Design', 'API Design'],
    category: 'Backend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/url-shortener',
    companies: ['Google', 'Amazon', 'Microsoft'],
    popularity: 95,
    lastUpdated: '2024-03-15',
    prerequisites: ['Basic understanding of distributed systems', 'Knowledge of caching strategies'],
    keyConcepts: ['Hash Functions', 'Database Sharding', 'Cache Invalidation', 'Rate Limiting'],
    isPremium: true,
  },
  {
    id: 'design-chat-system',
    title: 'Design a Real-time Chat System',
    description: 'Design a scalable real-time chat system that supports millions of concurrent users with features like message delivery, read receipts, and typing indicators.',
    difficulty: 'Hard',
    tags: ['WebSockets', 'Real-time', 'Scalability', 'Message Queues'],
    category: 'Full Stack',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/chat-system',
    companies: ['Meta', 'Google', 'Microsoft'],
    popularity: 90,
    lastUpdated: '2024-03-10',
    prerequisites: ['WebSocket protocol', 'Message queue systems', 'Real-time data handling'],
    keyConcepts: ['WebSocket', 'Pub/Sub', 'Message Persistence', 'Load Balancing'],
    isPremium: true,
  },
  {
    id: 'design-payment-system',
    title: 'Design a Payment Processing System',
    description: 'Design a secure and reliable payment processing system that can handle multiple payment methods, currencies, and ensure transaction consistency.',
    difficulty: 'Hard',
    tags: ['Security', 'Transactions', 'Microservices', 'Compliance'],
    category: 'Backend',
    estimatedTime: '90-120 mins',
    link: '/system-design/problems/payment-system',
    companies: ['Stripe', 'PayPal', 'Square'],
    popularity: 88,
    lastUpdated: '2024-03-12',
    prerequisites: ['Understanding of payment protocols', 'Knowledge of security best practices'],
    keyConcepts: ['ACID Transactions', 'Idempotency', 'Fraud Detection', 'Payment Gateway Integration'],
    isPremium: true,
  },
  {
    id: 'design-search-engine',
    title: 'Design a Search Engine',
    description: 'Design a search engine that can efficiently index and search through billions of web pages while providing relevant results quickly.',
    difficulty: 'Hard',
    tags: ['Search', 'Indexing', 'Distributed Systems', 'Caching'],
    category: 'Backend',
    estimatedTime: '90-120 mins',
    link: '/system-design/problems/search-engine',
    companies: ['Google', 'Microsoft', 'Amazon'],
    popularity: 92,
    lastUpdated: '2024-03-14',
    prerequisites: ['Understanding of search algorithms', 'Knowledge of distributed systems'],
    keyConcepts: ['Inverted Index', 'PageRank', 'Distributed Crawling', 'Result Ranking'],
    isPremium: true,
  },
  {
    id: 'design-ride-sharing',
    title: 'Design a Ride-Sharing System',
    description: 'Design a system that matches riders with drivers in real-time, handles payments, and provides location tracking and ETA calculations.',
    difficulty: 'Hard',
    tags: ['Real-time', 'Location Services', 'Matching Algorithm', 'Payment Processing'],
    category: 'Full Stack',
    estimatedTime: '75-90 mins',
    link: '/system-design/problems/ride-sharing',
    companies: ['Uber', 'Lyft', 'Grab'],
    popularity: 85,
    lastUpdated: '2024-03-13',
    prerequisites: ['Understanding of geospatial queries', 'Real-time systems'],
    keyConcepts: ['Geospatial Indexing', 'Real-time Matching', 'Payment Processing', 'Location Tracking'],
    isPremium: true,
  },
  {
    id: 'design-social-network',
    title: 'Design a Social Network',
    description: 'Design a social networking platform that can handle user connections, news feeds, and real-time updates for millions of users.',
    difficulty: 'Hard',
    tags: ['Social Graph', 'News Feed', 'Real-time', 'Content Delivery'],
    category: 'Full Stack',
    estimatedTime: '90-120 mins',
    link: '/system-design/problems/social-network',
    companies: ['Meta', 'LinkedIn', 'Twitter'],
    popularity: 87,
    lastUpdated: '2024-03-11',
    prerequisites: ['Graph databases', 'Real-time systems', 'Content delivery networks'],
    keyConcepts: ['Graph Database', 'News Feed Algorithm', 'Content Distribution', 'Real-time Updates'],
    isPremium: true,
  },
  {
    id: 'design-file-storage',
    title: 'Design a File Storage System',
    description: 'Design a distributed file storage system that can handle large files, provide high availability, and ensure data durability.',
    difficulty: 'Hard',
    tags: ['Storage', 'Distributed Systems', 'Data Replication', 'Consistency'],
    category: 'Backend',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/file-storage',
    companies: ['Dropbox', 'Google', 'Amazon'],
    popularity: 84,
    lastUpdated: '2024-03-09',
    prerequisites: ['Understanding of distributed storage', 'Data replication strategies'],
    keyConcepts: ['Data Sharding', 'Replication', 'Consistency Models', 'Storage Optimization'],
    isPremium: true,
  },
  {
    id: 'design-notification-system',
    title: 'Design a Notification System',
    description: 'Design a system that can deliver notifications to users across multiple channels (email, push, SMS) with high reliability and low latency.',
    difficulty: 'Medium',
    tags: ['Message Queues', 'Push Notifications', 'Email Service', 'SMS Gateway'],
    category: 'Backend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/notification-system',
    companies: ['Amazon', 'Microsoft', 'Google'],
    popularity: 82,
    lastUpdated: '2024-03-08',
    prerequisites: ['Understanding of message queues', 'Push notification protocols'],
    keyConcepts: ['Message Queues', 'Push Notifications', 'Email Delivery', 'SMS Integration'],
    isPremium: true,
  },
  {
    id: 'design-infinite-scroll',
    title: 'Design an Infinite Scroll System',
    description: 'Design a system that efficiently loads and renders large lists of content with infinite scrolling, handling memory management, performance optimization, and smooth user experience.',
    difficulty: 'Medium',
    tags: ['Virtualization', 'Performance', 'Memory Management', 'DOM Optimization'],
    category: 'Frontend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/infinite-scroll',
    companies: ['Meta', 'Google', 'Twitter'],
    popularity: 89,
    lastUpdated: '2024-03-16',
    prerequisites: ['Understanding of DOM manipulation', 'Knowledge of browser rendering'],
    keyConcepts: ['Virtual DOM', 'Window Technique', 'Intersection Observer', 'Memory Management'],
    isPremium: true,
  },
  {
    id: 'design-state-management',
    title: 'Design a Global State Management System',
    description: 'Design a scalable state management system that can handle complex application state, support time-travel debugging, and maintain performance with large state trees.',
    difficulty: 'Hard',
    tags: ['State Management', 'Performance', 'Architecture', 'Debugging'],
    category: 'Frontend',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/state-management',
    companies: ['Meta', 'Google', 'Microsoft'],
    popularity: 91,
    lastUpdated: '2024-03-17',
    prerequisites: ['Understanding of state management patterns', 'Knowledge of React/Vue/Angular'],
    keyConcepts: ['Immutability', 'Middleware', 'Time-travel Debugging', 'State Normalization'],
    isPremium: true,
  },
  {
    id: 'design-micro-frontends',
    title: 'Design a Micro Frontend Architecture',
    description: 'Design a micro frontend architecture that enables multiple teams to work independently on different parts of a large application while maintaining consistency and performance.',
    difficulty: 'Hard',
    tags: ['Micro Frontends', 'Module Federation', 'Team Collaboration', 'Build System'],
    category: 'Frontend',
    estimatedTime: '90-120 mins',
    link: '/system-design/problems/micro-frontends',
    companies: ['Amazon', 'Microsoft', 'Spotify'],
    popularity: 86,
    lastUpdated: '2024-03-18',
    prerequisites: ['Understanding of microservices', 'Knowledge of build tools'],
    keyConcepts: ['Module Federation', 'Build-time Integration', 'Runtime Integration', 'Shared Dependencies'],
    isPremium: true,
  },
  {
    id: 'design-real-time-dashboard',
    title: 'Design a Real-time Dashboard',
    description: 'Design a real-time dashboard system that can handle multiple data sources, provide live updates, and maintain performance with complex visualizations.',
    difficulty: 'Hard',
    tags: ['Real-time', 'Data Visualization', 'WebSocket', 'Performance'],
    category: 'Frontend',
    estimatedTime: '75-90 mins',
    link: '/system-design/problems/real-time-dashboard',
    companies: ['Google', 'Meta', 'Netflix'],
    popularity: 88,
    lastUpdated: '2024-03-19',
    prerequisites: ['Understanding of WebSocket', 'Knowledge of data visualization'],
    keyConcepts: ['WebSocket', 'Data Streaming', 'Canvas Rendering', 'Performance Optimization'],
    isPremium: true,
  },
  {
    id: 'design-offline-first-app',
    title: 'Design an Offline-First Application',
    description: 'Design a web application that works seamlessly offline, handles data synchronization, and provides a consistent user experience across different network conditions.',
    difficulty: 'Hard',
    tags: ['PWA', 'Offline Support', 'Data Sync', 'Service Workers'],
    category: 'Frontend',
    estimatedTime: '60-90 mins',
    link: '/system-design/problems/offline-first-app',
    companies: ['Google', 'Microsoft', 'Twitter'],
    popularity: 85,
    lastUpdated: '2024-03-20',
    prerequisites: ['Understanding of Service Workers', 'Knowledge of IndexedDB'],
    keyConcepts: ['Service Workers', 'IndexedDB', 'Background Sync', 'Conflict Resolution'],
    isPremium: true,
  },
  {
    id: 'design-component-library',
    title: 'Design a Component Library System',
    description: 'Design a scalable component library system that supports theming, accessibility, performance optimization, and easy integration across different projects.',
    difficulty: 'Medium',
    tags: ['Component Design', 'Accessibility', 'Theming', 'Documentation'],
    category: 'Frontend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/component-library',
    companies: ['Google', 'Microsoft', 'Meta'],
    popularity: 87,
    lastUpdated: '2024-03-21',
    prerequisites: ['Understanding of component design', 'Knowledge of accessibility standards'],
    keyConcepts: ['Design Tokens', 'Component Architecture', 'Accessibility', 'Performance Testing'],
    isPremium: true,
  },
  {
    id: 'design-form-system',
    title: 'Design a Form Management System',
    description: 'Design a form management system that handles complex form validation, dynamic fields, multi-step forms, and maintains performance with large datasets.',
    difficulty: 'Medium',
    tags: ['Form Management', 'Validation', 'Performance', 'UX'],
    category: 'Frontend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/form-system',
    companies: ['Google', 'Microsoft', 'Salesforce'],
    popularity: 84,
    lastUpdated: '2024-03-22',
    prerequisites: ['Understanding of form validation', 'Knowledge of form UX patterns'],
    keyConcepts: ['Form Validation', 'Field Dependencies', 'Performance Optimization', 'Error Handling'],
    isPremium: true,
  },
  {
    id: 'design-image-optimization',
    title: 'Design an Image Optimization System',
    description: 'Design a system that efficiently handles image loading, optimization, and delivery across different devices and network conditions while maintaining visual quality.',
    difficulty: 'Medium',
    tags: ['Image Optimization', 'Performance', 'CDN', 'Responsive Images'],
    category: 'Frontend',
    estimatedTime: '45-60 mins',
    link: '/system-design/problems/image-optimization',
    companies: ['Google', 'Meta', 'Netflix'],
    popularity: 86,
    lastUpdated: '2024-03-23',
    prerequisites: ['Understanding of image formats', 'Knowledge of CDN'],
    keyConcepts: ['Lazy Loading', 'Responsive Images', 'Image Compression', 'CDN Integration'],
    isPremium: true,
  },
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

  return (
    <MainLayout>
      <SEO
        title="System Design Problems"
        description="Practice system design problems with real-world scenarios. Filter by difficulty, category, and tags. Learn from industry examples and improve your system design skills."
        keywords={[
          'system design',
          'practice problems',
          'frontend architecture',
          'backend architecture',
          'scalability',
          'performance',
          'interview preparation',
        ]}
      />
      <PageContainer>
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
                {['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple'].map(company => (
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
