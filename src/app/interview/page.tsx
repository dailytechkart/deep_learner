'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { useTheme } from '@/app/context/ThemeContext';
import {
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaStar,
  FaClock,
  FaUsers,
  FaBook,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaServer,
  FaMobile,
  FaShieldAlt,
  FaChartLine,
  FaCode,
  FaSpinner,
  FaLock,
  FaRocket,
  FaBrain,
  FaLaptopCode,
  FaList,
  FaLaptop,
  FaQuestionCircle,
  FaTimes,
  FaPlus,
  FaMinus,
  FaCheck,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiWebpack,
} from 'react-icons/si';

const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  gap: 3rem;
  position: relative;
`;

const FilterSidebar = styled.div`
  width: 320px;
  flex-shrink: 0;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 84px;
  border: 1px solid ${props => props.theme.colors.border};
  align-self: flex-start;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const FilterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  padding-bottom: 1rem;
  border-bottom: 2px solid ${props => props.theme.colors.primary + '20'};
`;

const FilterSection = styled.div`
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const FilterSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const FilterSectionTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    display: block;
    width: 4px;
    height: 16px;
    background: ${props => props.theme.colors.primary};
    border-radius: ${props => props.theme.borderRadius.full};
  }
`;

const FilterSectionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${props => (props.isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const FilterChip = styled.button<{ active?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: 500;
  margin: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid
    ${props => (props.active ? props.theme.colors.primary : props.theme.colors.border)};
  background: ${props => (props.active ? props.theme.colors.primary + '15' : 'transparent')};
  color: ${props => (props.active ? props.theme.colors.primary : props.theme.colors.textSecondary)};
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${props => props.theme.colors.primary + '15'};
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const FilterChipGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ContentSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 4rem;
  padding: 0;
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.fontSize['4xl']};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 800px;
  line-height: 1.7;
`;

const StatsBar = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const StatIcon = styled.div`
  color: ${props => props.theme.colors.primary};
`;

const TopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  margin-top: 2rem;
  position: relative;
  padding-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TopicCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 2.5rem;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.sm};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.lg};
    border-color: ${props => props.theme.colors.primary};

    .topic-icon {
      transform: scale(1.1);
    }
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

const TopicIcon = styled.div`
  font-size: 2.75rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
`;

const TopicTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.xl};
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  line-height: 1.3;
`;

const TopicDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

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

// Helper for company tag colors
const getCompanyTagColor = (company: string) => {
  return tagColors.company[company as keyof typeof tagColors.company] || tagColors.company.default;
};

// Update Tag styled component
const Tag = styled.span<{
  type?: 'beginner' | 'intermediate' | 'advanced' | 'technology' | 'role';
  color?: string;
  bgColor?: string;
}>`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
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
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  &:hover {
    transform: translateY(-1px) scale(1.05);
    filter: brightness(1.08);
  }
`;

const TechIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  color: inherit;
  opacity: 0.9;
`;

const ClearFiltersButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: 500;
  color: ${props => props.theme.colors.textSecondary};
  background: transparent;
  border: 1px solid ${props => props.theme.colors.border};
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  width: 100%;

  &:hover {
    background: ${props => props.theme.colors.primary + '15'};
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const TabContainer = styled.div`
  margin-top: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const TabList = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: -1px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => (props.active ? props.theme.colors.primary : props.theme.colors.textSecondary)};
  border-bottom: 3px solid ${props => (props.active ? props.theme.colors.primary : 'transparent')};
  background: ${props => (props.active ? props.theme.colors.primary + '08' : 'transparent')};
  border-radius: 1.5rem 1.5rem 0 0;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  box-shadow: ${props => (props.active ? `0 2px 12px ${props.theme.colors.primary}11` : 'none')};
  &:hover {
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.primary + '10'};
    transform: translateY(-2px) scale(1.03);
  }
`;

const TabContent = styled.div`
  margin-top: 2rem;
`;

const ListContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const ListSidebar = styled.div`
  width: 280px;
  flex-shrink: 0;
`;

const ListContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const CategoryCard = styled.div<{ active?: boolean }>`
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props =>
    props.active ? props.theme.colors.primary + '15' : props.theme.colors.backgroundAlt};
  border: 1px solid
    ${props => (props.active ? props.theme.colors.primary : props.theme.colors.border)};
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(4px);
    border-color: ${props => props.theme.colors.primary};
  }
`;

const CategoryTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.25rem;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const CategoryCount = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

const ProblemCard = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
    border-color: ${props => props.theme.colors.primary};

    .problem-icon {
      transform: scale(1.1);
    }
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

const ProblemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProblemIcon = styled.div`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  transition: transform 0.3s ease;
`;

const ProblemInfo = styled.div`
  flex: 1;
`;

const ProblemTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProblemDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ProblemMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const ProblemDifficulty = styled.span<{ difficulty: 'easy' | 'medium' | 'hard' }>`
  padding: 0.25rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: 500;
  background: ${props => {
    switch (props.difficulty) {
      case 'easy':
        return 'rgba(34, 197, 94, 0.15)';
      case 'medium':
        return 'rgba(234, 179, 8, 0.15)';
      case 'hard':
        return 'rgba(239, 68, 68, 0.15)';
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'easy':
        return '#22c55e';
      case 'medium':
        return '#eab308';
      case 'hard':
        return '#ef4444';
    }
  }};
`;

const ProblemStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  padding-left: 3rem;
  border-radius: ${props => props.theme.borderRadius.full};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.md};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary + '20'};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.textSecondary};
`;

const SortButton = styled.button`
  padding: 0 1.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  border: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.md};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
`;

const ActiveFilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${props => props.theme.colors.primary + '15'};
  color: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: 500;
`;

const RemoveFilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary + '30'};
  color: ${props => props.theme.colors.primary};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.primary + '40'};
  }
`;

const FilterPresets = styled.div`
  margin-bottom: 2rem;
`;

const PresetButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.backgroundAlt};
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: 500;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: ${props => props.theme.colors.primary + '15'};
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const FilterCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 0.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  background: ${props => props.theme.colors.primary + '15'};
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: 600;
`;

// Update CompanyTag styled component
const CompanyTag = styled.div<{ company: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ company }) => getCompanyTagColor(company).bg};
  color: ${({ company }) => getCompanyTagColor(company).color};
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
`;

const RoleSpecificSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const RoleSpecificTitle = styled.h4`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RoleSpecificList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RoleSpecificItem = styled.li`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    color: ${props => props.theme.colors.primary};
  }
`;

const TopicContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.theme.colors.primary + '15'};
  color: ${props => props.theme.colors.primary};
`;

const RoleGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

// Update RoleTag styled component
const RoleTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${tagColors.role.bg};
  color: ${tagColors.role.color};
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
`;

const ActionBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.25rem;
`;

const StartButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: ${props => props.theme.borderRadius.full};
  padding: 0.5rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px ${props => props.theme.colors.primary}22;
  transition:
    background 0.2s,
    transform 0.15s;
  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px) scale(1.04);
  }
`;

const CompletedBadge = styled.span`
  background: #e0ffe0;
  color: #1b7e1b;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
`;

const SectionHeading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SectionDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

interface InterviewTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  technologies: string[];
  roles: string[];
}

interface Category {
  id: string;
  title: string;
  count: number;
}

interface BaseProblem {
  id: string;
  title: string;
  description: string;
  category: string;
  companies?: string[];
  roleSpecific?: {
    role: string;
    questions: string[];
  }[];
}

interface DSAProblem extends BaseProblem {
  difficulty: 'easy' | 'medium' | 'hard';
  acceptance: string;
  submissions: string;
}

interface MachineCodingProblem extends BaseProblem {
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: string;
  techStack: string[];
}

interface QuizProblem extends BaseProblem {
  questions: number;
  timeLimit: string;
}

type ProblemItem = DSAProblem | MachineCodingProblem | QuizProblem;

const interviewTopics: InterviewTopic[] = [
  {
    id: 'frontend-basics',
    title: 'Frontend Fundamentals',
    description:
      'Master essential frontend concepts, HTML, CSS, and JavaScript fundamentals for technical interviews.',
    icon: <FaCode />,
    tags: ['beginner'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    roles: ['Frontend Developer', 'Web Developer'],
  },
  {
    id: 'react-advanced',
    title: 'Advanced React',
    description: 'Deep dive into React patterns, hooks, context, and performance optimization.',
    icon: <FaReact />,
    tags: ['intermediate', 'advanced'],
    technologies: ['React', 'TypeScript', 'Redux'],
    roles: ['React Developer', 'Frontend Developer'],
  },
  {
    id: 'css-architecture',
    title: 'CSS Architecture',
    description: 'Learn BEM, CSS-in-JS, and scalable CSS patterns for large projects.',
    icon: <FaCode />,
    tags: ['intermediate'],
    technologies: ['CSS', 'Sass', 'Styled Components'],
    roles: ['Frontend Developer', 'UI Engineer'],
  },
  {
    id: 'performance',
    title: 'Web Performance',
    description: 'Optimize web apps for speed: lazy loading, code splitting, and Lighthouse.',
    icon: <FaRocket />,
    tags: ['advanced'],
    technologies: ['JavaScript', 'React', 'Webpack'],
    roles: ['Frontend Developer', 'Performance Engineer'],
  },
  {
    id: 'testing',
    title: 'Testing & QA',
    description: 'Unit, integration, and E2E testing with Jest, RTL, and Cypress.',
    icon: <FaShieldAlt />,
    tags: ['intermediate'],
    technologies: ['Jest', 'Cypress', 'React Testing Library'],
    roles: ['Frontend Developer', 'QA Engineer'],
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'Design scalable frontend systems, micro-frontends, and SSR.',
    icon: <FaServer />,
    tags: ['advanced'],
    technologies: ['React', 'Next.js', 'Micro-frontends'],
    roles: ['Frontend Architect', 'Senior Developer'],
  },
  // ...add more as needed...
];

const dsaCategories: Category[] = [
  { id: 'arrays', title: 'Arrays', count: 45 },
  { id: 'linked-lists', title: 'Linked Lists', count: 30 },
  { id: 'trees', title: 'Trees', count: 35 },
  { id: 'graphs', title: 'Graphs', count: 25 },
  { id: 'dynamic-programming', title: 'Dynamic Programming', count: 20 },
];

const machineCodingCategories: Category[] = [
  { id: 'react', title: 'React', count: 15 },
  { id: 'javascript', title: 'JavaScript', count: 20 },
  { id: 'css', title: 'CSS', count: 10 },
  { id: 'typescript', title: 'TypeScript', count: 12 },
];

const quizCategories: Category[] = [
  { id: 'react', title: 'React', count: 8 },
  { id: 'javascript', title: 'JavaScript', count: 10 },
  { id: 'css', title: 'CSS', count: 6 },
  { id: 'typescript', title: 'TypeScript', count: 7 },
];

const dsaProblems: DSAProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy',
    category: 'arrays',
    acceptance: '85%',
    submissions: '1.2M',
    companies: ['Google', 'Meta', 'Amazon'],
    roleSpecific: [
      {
        role: 'Frontend Developer',
        questions: [
          'How would you implement this in JavaScript?',
          'What is the time complexity of your solution?',
          'How would you handle edge cases?',
        ],
      },
    ],
  },
  // ... rest of the DSA problems ...
];

const machineCodingProblems: MachineCodingProblem[] = [
  {
    id: 'infinite-scroll',
    title: 'Infinite Scroll Implementation',
    description:
      'Implement an infinite scroll component that loads more content as the user scrolls down.',
    difficulty: 'medium',
    category: 'react',
    timeLimit: '45 mins',
    techStack: ['React', 'TypeScript'],
    companies: ['Meta', 'Google', 'Amazon'],
    roleSpecific: [
      {
        role: 'Frontend Developer',
        questions: [
          'How would you handle loading states?',
          'What is your approach to error handling?',
          'How would you optimize performance?',
        ],
      },
    ],
  },
  {
    id: 'autocomplete',
    title: 'Search Autocomplete',
    description: 'Build a search input with autocomplete functionality and debouncing.',
    difficulty: 'medium',
    category: 'javascript',
    timeLimit: '30 mins',
    techStack: ['JavaScript', 'HTML', 'CSS'],
    companies: ['Google', 'Microsoft', 'Apple'],
    roleSpecific: [
      {
        role: 'Frontend Developer',
        questions: [
          'How would you implement debouncing?',
          "What's your approach to accessibility?",
          'How would you handle API rate limiting?',
        ],
      },
    ],
  },
  {
    id: 'kanban-board',
    title: 'Kanban Board',
    description: 'Build a drag-and-drop Kanban board with columns and cards.',
    difficulty: 'hard',
    category: 'react',
    timeLimit: '90 mins',
    techStack: ['React', 'TypeScript', 'HTML', 'CSS'],
    companies: ['Atlassian', 'Meta'],
    roleSpecific: [
      {
        role: 'Frontend Developer',
        questions: [
          'How would you implement drag-and-drop?',
          'How would you persist board state?',
          'How would you optimize for large boards?',
        ],
      },
    ],
  },
  {
    id: 'file-uploader',
    title: 'File Uploader',
    description: 'Create a file uploader with progress bar and error handling.',
    difficulty: 'medium',
    category: 'javascript',
    timeLimit: '40 mins',
    techStack: ['JavaScript', 'HTML', 'CSS'],
    companies: ['Dropbox', 'Google'],
    roleSpecific: [
      {
        role: 'Frontend Developer',
        questions: [
          'How would you show upload progress?',
          'How would you handle file validation?',
          'How would you handle upload errors?',
        ],
      },
    ],
  },
  // ...add more as needed...
];

const frontendQuizzes: QuizProblem[] = [
  {
    id: 'react-hooks',
    title: 'React Hooks Quiz',
    description:
      'Test your knowledge of React Hooks including useState, useEffect, and custom hooks.',
    category: 'react',
    questions: 20,
    timeLimit: '15 mins',
    companies: ['Meta', 'Google', 'Microsoft'],
    roleSpecific: [
      {
        role: 'React Developer',
        questions: [
          'Explain the difference between useEffect and useLayoutEffect',
          'How would you optimize a custom hook?',
          'What are the common pitfalls with hooks?',
        ],
      },
    ],
  },
  {
    id: 'css-layout',
    title: 'CSS Layout Quiz',
    description:
      'Challenge yourself with questions about CSS Grid, Flexbox, and modern layout techniques.',
    category: 'css',
    questions: 15,
    timeLimit: '10 mins',
    companies: ['Apple', 'Google', 'Meta'],
    roleSpecific: [
      {
        role: 'Frontend Developer',
        questions: [
          'When would you choose Grid over Flexbox?',
          'How would you create a responsive layout?',
          "What's your approach to CSS architecture?",
        ],
      },
    ],
  },
  {
    id: 'js-advanced',
    title: 'Advanced JavaScript Quiz',
    description: 'Closures, async/await, event loop, and tricky JS interview questions.',
    category: 'javascript',
    questions: 18,
    timeLimit: '12 mins',
    companies: ['Google', 'Amazon'],
    roleSpecific: [
      {
        role: 'Frontend Developer',
        questions: [
          'Explain event delegation in JS.',
          'What is a closure and where would you use it?',
          'How does the event loop work?',
        ],
      },
    ],
  },
  {
    id: 'typescript-basics',
    title: 'TypeScript Basics Quiz',
    description: 'Types, interfaces, generics, and type guards in TypeScript.',
    category: 'typescript',
    questions: 14,
    timeLimit: '10 mins',
    companies: ['Microsoft', 'Meta'],
    roleSpecific: [
      {
        role: 'Frontend Developer',
        questions: [
          'What is the difference between interface and type?',
          'How do you use generics in TS?',
          'What are type guards?',
        ],
      },
    ],
  },
  // ...add more as needed...
];

const InterviewPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'topics' | 'dsa' | 'machine-coding' | 'quizzes'>(
    'topics'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'difficulty' | 'popularity'>('difficulty');
  const [openFilterSections, setOpenFilterSections] = useState<Record<string, boolean>>({
    difficulty: true,
    technologies: true,
    roles: true,
  });

  const allTechnologies = Array.from(new Set(interviewTopics.flatMap(topic => topic.technologies)));
  const allRoles = Array.from(new Set(interviewTopics.flatMap(topic => topic.roles)));

  const filteredTopics = interviewTopics.filter(topic => {
    const matchesDifficulty =
      selectedDifficulty.length === 0 || topic.tags.some(tag => selectedDifficulty.includes(tag));
    const matchesTechnology =
      selectedTechnologies.length === 0 ||
      topic.technologies.some(tech => selectedTechnologies.includes(tech));
    const matchesRole =
      selectedRoles.length === 0 || topic.roles.some(role => selectedRoles.includes(role));
    return matchesDifficulty && matchesTechnology && matchesRole;
  });

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty(prev =>
      prev.includes(difficulty) ? prev.filter(d => d !== difficulty) : [...prev, difficulty]
    );
  };

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const toggleRole = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const toggleFilterSection = (section: string) => {
    setOpenFilterSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getActiveFiltersCount = () => {
    return selectedDifficulty.length + selectedTechnologies.length + selectedRoles.length;
  };

  const removeFilter = (type: 'difficulty' | 'technology' | 'role', value: string) => {
    switch (type) {
      case 'difficulty':
        setSelectedDifficulty(prev => prev.filter(d => d !== value));
        break;
      case 'technology':
        setSelectedTechnologies(prev => prev.filter(t => t !== value));
        break;
      case 'role':
        setSelectedRoles(prev => prev.filter(r => r !== value));
        break;
    }
  };

  const applyPreset = (preset: 'beginner' | 'intermediate' | 'advanced' | 'frontend' | 'react') => {
    switch (preset) {
      case 'beginner':
        setSelectedDifficulty(['beginner']);
        setSelectedTechnologies([]);
        setSelectedRoles([]);
        break;
      case 'intermediate':
        setSelectedDifficulty(['intermediate']);
        setSelectedTechnologies([]);
        setSelectedRoles([]);
        break;
      case 'advanced':
        setSelectedDifficulty(['advanced']);
        setSelectedTechnologies([]);
        setSelectedRoles([]);
        break;
      case 'frontend':
        setSelectedDifficulty([]);
        setSelectedTechnologies(['React', 'JavaScript', 'CSS']);
        setSelectedRoles(['Frontend Developer']);
        break;
      case 'react':
        setSelectedDifficulty([]);
        setSelectedTechnologies(['React', 'TypeScript', 'Redux']);
        setSelectedRoles(['React Developer']);
        break;
    }
  };

  const renderListContent = (type: 'dsa' | 'machine-coding' | 'quizzes') => {
    const categories =
      type === 'dsa'
        ? dsaCategories
        : type === 'machine-coding'
          ? machineCodingCategories
          : quizCategories;

    const items =
      type === 'dsa'
        ? dsaProblems
        : type === 'machine-coding'
          ? machineCodingProblems
          : frontendQuizzes;

    const filteredItems = items.filter(
      (item: ProblemItem) =>
        selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory
    );

    return (
      <ListContainer>
        <ListSidebar>
          <CategoryCard
            active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
          >
            <CategoryTitle>
              All{' '}
              {type === 'dsa' ? 'Problems' : type === 'machine-coding' ? 'Challenges' : 'Quizzes'}
            </CategoryTitle>
            <CategoryCount>{items.length} items</CategoryCount>
          </CategoryCard>
          {categories.map((category: Category) => (
            <CategoryCard
              key={category.id}
              active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CategoryTitle>{category.title}</CategoryTitle>
              <CategoryCount>{category.count} items</CategoryCount>
            </CategoryCard>
          ))}
        </ListSidebar>

        <ListContent>
          <SearchBar>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput
              placeholder={`Search ${type === 'dsa' ? 'DSA problems' : type === 'machine-coding' ? 'machine coding problems' : 'quizzes'}...`}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <SortButton
              onClick={() => setSortBy(sortBy === 'difficulty' ? 'popularity' : 'difficulty')}
            >
              <FaChevronDown />
              Sort by {sortBy === 'difficulty' ? 'Difficulty' : 'Popularity'}
            </SortButton>
          </SearchBar>

          {filteredItems.map((item: ProblemItem) => (
            <ProblemCard key={item.id}>
              <ProblemHeader>
                <ProblemIcon className="problem-icon">
                  {type === 'dsa' ? (
                    <FaCode />
                  ) : type === 'machine-coding' ? (
                    <FaLaptop />
                  ) : (
                    <FaQuestionCircle />
                  )}
                </ProblemIcon>
                <ProblemInfo>
                  <ProblemTitle>
                    {item.title}
                    {type === 'dsa' && 'difficulty' in item && (
                      <ProblemDifficulty difficulty={item.difficulty}>
                        {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                      </ProblemDifficulty>
                    )}
                  </ProblemTitle>
                  <ProblemDescription>{item.description}</ProblemDescription>

                  {item.companies && item.companies.length > 0 && (
                    <TagGroup style={{ marginTop: '1rem' }}>
                      {item.companies.map((company: string) => (
                        <CompanyTag key={company} company={company}>
                          {company}
                        </CompanyTag>
                      ))}
                    </TagGroup>
                  )}

                  {item.roleSpecific &&
                    item.roleSpecific.map((roleInfo: { role: string; questions: string[] }) => (
                      <RoleSpecificSection key={roleInfo.role}>
                        <RoleSpecificTitle>
                          <FaUsers size={14} />
                          {roleInfo.role} Questions
                        </RoleSpecificTitle>
                        <RoleSpecificList>
                          {roleInfo.questions.map((question: string, index: number) => (
                            <RoleSpecificItem key={index}>{question}</RoleSpecificItem>
                          ))}
                        </RoleSpecificList>
                      </RoleSpecificSection>
                    ))}
                </ProblemInfo>
              </ProblemHeader>

              <ProblemMeta>
                {type === 'dsa' && 'acceptance' in item && (
                  <>
                    <StatItem>
                      <StatIcon>
                        <FaUsers />
                      </StatIcon>
                      <span>Acceptance: {item.acceptance}</span>
                    </StatItem>
                    <StatItem>
                      <StatIcon>
                        <FaCode />
                      </StatIcon>
                      <span>Submissions: {item.submissions}</span>
                    </StatItem>
                  </>
                )}
                {type === 'machine-coding' && 'timeLimit' in item && (
                  <>
                    <StatItem>
                      <StatIcon>
                        <FaClock />
                      </StatIcon>
                      <span>Time Limit: {item.timeLimit}</span>
                    </StatItem>
                    <StatItem>
                      <StatIcon>
                        <FaCode />
                      </StatIcon>
                      <span>
                        Tech Stack: {'techStack' in item ? item.techStack.join(', ') : ''}
                      </span>
                    </StatItem>
                  </>
                )}
                {type === 'quizzes' && 'questions' in item && (
                  <>
                    <StatItem>
                      <StatIcon>
                        <FaQuestionCircle />
                      </StatIcon>
                      <span>{item.questions} Questions</span>
                    </StatItem>
                    <StatItem>
                      <StatIcon>
                        <FaClock />
                      </StatIcon>
                      <span>Time Limit: {item.timeLimit}</span>
                    </StatItem>
                    <StatItem>
                      <StatIcon>
                        <FaBook />
                      </StatIcon>
                      <span>Category: {item.category}</span>
                    </StatItem>
                  </>
                )}
              </ProblemMeta>
              <ActionBar>
                <StartButton>
                  {type === 'quizzes'
                    ? 'Start Quiz'
                    : type === 'machine-coding'
                      ? 'Solve'
                      : 'Solve'}
                </StartButton>
                {/* Mocked completed badge for demo; replace with real logic if available */}
                {Math.random() > 0.7 && (
                  <CompletedBadge>
                    <FaCheck /> Completed
                  </CompletedBadge>
                )}
              </ActionBar>
            </ProblemCard>
          ))}
        </ListContent>
      </ListContainer>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'topics':
        return (
          <>
            <SectionHeading>
              <FaBook /> Interview Topics
            </SectionHeading>
            <SectionDescription>
              Explore all the essential frontend interview topics. Click a topic to start learning
              or practicing questions.
            </SectionDescription>
            <TopicsGrid>
              {filteredTopics.map(topic => (
                <TopicCard key={topic.id}>
                  <TopicIcon className="topic-icon">{topic.icon}</TopicIcon>
                  <TopicTitle>{topic.title}</TopicTitle>
                  <TopicDescription>{topic.description}</TopicDescription>
                  <TagGroup>
                    {topic.tags.map(tag => (
                      <Tag key={tag} type={tag as 'beginner' | 'intermediate' | 'advanced'}>
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </Tag>
                    ))}
                    {topic.technologies.map(tech => (
                      <Tag key={tech} type="technology">
                        <TechIcon>{getTechIcon(tech)}</TechIcon>
                        {tech}
                      </Tag>
                    ))}
                    {topic.roles.map(role => (
                      <Tag key={role} type="role">
                        {role}
                      </Tag>
                    ))}
                  </TagGroup>
                  <ActionBar>
                    <StartButton>Start</StartButton>
                  </ActionBar>
                </TopicCard>
              ))}
            </TopicsGrid>
          </>
        );
      case 'dsa':
        return (
          <>
            <SectionHeading>
              <FaList /> DSA Blind 75
            </SectionHeading>
            <SectionDescription>
              Practice the most frequently asked DSA problems for frontend interviews. Click a
              problem to solve it!
            </SectionDescription>
            {renderListContent('dsa')}
          </>
        );
      case 'machine-coding':
        return (
          <>
            <SectionHeading>
              <FaLaptop /> Machine Coding Rounds
            </SectionHeading>
            <SectionDescription>
              Tackle real-world frontend machine coding challenges. Click a challenge to get
              started.
            </SectionDescription>
            {renderListContent('machine-coding')}
          </>
        );
      case 'quizzes':
        return (
          <>
            <SectionHeading>
              <FaQuestionCircle /> Frontend Quizzes
            </SectionHeading>
            <SectionDescription>
              Test your knowledge with quick quizzes on frontend topics, frameworks, and best
              practices.
            </SectionDescription>
            {renderListContent('quizzes')}
          </>
        );
    }
  };

  const renderActiveFilters = () => {
    if (getActiveFiltersCount() === 0) return null;

    return (
      <ActiveFiltersContainer>
        {selectedDifficulty.map(difficulty => (
          <ActiveFilterTag key={`difficulty-${difficulty}`}>
            <span>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span>
            <RemoveFilterButton onClick={() => removeFilter('difficulty', difficulty)}>
              <FaTimes size={12} />
            </RemoveFilterButton>
          </ActiveFilterTag>
        ))}
        {selectedTechnologies.map(tech => (
          <ActiveFilterTag key={`tech-${tech}`}>
            <span>{tech}</span>
            <RemoveFilterButton onClick={() => removeFilter('technology', tech)}>
              <FaTimes size={12} />
            </RemoveFilterButton>
          </ActiveFilterTag>
        ))}
        {selectedRoles.map(role => (
          <ActiveFilterTag key={`role-${role}`}>
            <span>{role}</span>
            <RemoveFilterButton onClick={() => removeFilter('role', role)}>
              <FaTimes size={12} />
            </RemoveFilterButton>
          </ActiveFilterTag>
        ))}
      </ActiveFiltersContainer>
    );
  };

  const getTechIcon = (tech: string): React.ReactNode => {
    switch (tech) {
      case 'React':
        return <FaReact />;
      case 'TypeScript':
        return <SiTypescript />;
      case 'Next.js':
        return <SiNextdotjs />;
      case 'Redux':
        return <SiRedux />;
      case 'Tailwind':
        return <SiTailwindcss />;
      case 'Webpack':
        return <SiWebpack />;
      case 'JavaScript':
        return <SiJavascript />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <PageContainer>
        <ContentSection>
          <Header>
            <Title>Frontend Interview Prep</Title>
            <Description>
              Master frontend interview preparation with our comprehensive collection of topics,
              questions, and best practices. From fundamentals to advanced concepts, we've got you
              covered.
            </Description>

            <StatsBar>
              <StatItem>
                <StatIcon>
                  <FaStar />
                </StatIcon>
                <span>500+ Interview Questions</span>
              </StatItem>
              <StatItem>
                <StatIcon>
                  <FaClock />
                </StatIcon>
                <span>50+ Hours of Content</span>
              </StatItem>
              <StatItem>
                <StatIcon>
                  <FaUsers />
                </StatIcon>
                <span>10k+ Success Stories</span>
              </StatItem>
            </StatsBar>
          </Header>

          {renderActiveFilters()}

          <TabContainer>
            <TabList>
              <Tab active={activeTab === 'topics'} onClick={() => setActiveTab('topics')}>
                <FaBook />
                Topics
              </Tab>
              <Tab active={activeTab === 'dsa'} onClick={() => setActiveTab('dsa')}>
                <FaList />
                DSA Blind 75
              </Tab>
              <Tab
                active={activeTab === 'machine-coding'}
                onClick={() => setActiveTab('machine-coding')}
              >
                <FaLaptop />
                Machine Coding
              </Tab>
              <Tab active={activeTab === 'quizzes'} onClick={() => setActiveTab('quizzes')}>
                <FaQuestionCircle />
                Quizzes
              </Tab>
            </TabList>
          </TabContainer>

          <TabContent>{renderTabContent()}</TabContent>
        </ContentSection>
      </PageContainer>
    </MainLayout>
  );
};

export default InterviewPage;
