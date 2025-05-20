'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { useTheme } from '@/app/context/ThemeContext';
import { FaSearch, FaFilter, FaChevronDown, FaStar, FaClock, FaUsers, FaBook, FaReact, FaNodeJs, FaDatabase, FaServer, FaMobile, FaShieldAlt, FaChartLine, FaCode, FaSpinner, FaLock, FaRocket, FaBrain, FaLaptopCode, FaList, FaLaptop, FaQuestionCircle, FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss, SiRedux, SiWebpack } from 'react-icons/si';

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
  max-height: ${props => props.isOpen ? '500px' : '0'};
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
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
  background: ${props => props.active ? props.theme.colors.primary + '15' : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary};
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

const Tag = styled.span<{ type?: 'beginner' | 'intermediate' | 'advanced' | 'technology' | 'role' }>`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.type) {
      case 'beginner':
        return 'rgba(34, 197, 94, 0.15)';
      case 'intermediate':
        return 'rgba(234, 179, 8, 0.15)';
      case 'advanced':
        return 'rgba(239, 68, 68, 0.15)';
      case 'technology':
        return 'rgba(59, 130, 246, 0.15)';
      case 'role':
        return 'rgba(139, 92, 246, 0.15)';
      default:
        return props.theme.colors.primary + '15';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'beginner':
        return '#22c55e';
      case 'intermediate':
        return '#eab308';
      case 'advanced':
        return '#ef4444';
      case 'technology':
        return '#3b82f6';
      case 'role':
        return '#8b5cf6';
      default:
        return props.theme.colors.primary;
    }
  }};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
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
  padding: 1rem 0;
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary};
  border-bottom: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: ${props => props.theme.colors.primary};
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
  background: ${props => props.active ? props.theme.colors.primary + '15' : props.theme.colors.backgroundAlt};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : props.theme.colors.border};
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

const CompanyTag = styled.div<{ company: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => {
    switch (props.company.toLowerCase()) {
      case 'google':
        return 'rgba(66, 133, 244, 0.15)';
      case 'meta':
        return 'rgba(24, 119, 242, 0.15)';
      case 'amazon':
        return 'rgba(255, 153, 0, 0.15)';
      case 'microsoft':
        return 'rgba(0, 120, 212, 0.15)';
      case 'apple':
        return 'rgba(0, 0, 0, 0.15)';
      default:
        return props.theme.colors.primary + '15';
    }
  }};
  color: ${props => {
    switch (props.company.toLowerCase()) {
      case 'google':
        return '#4285F4';
      case 'meta':
        return '#1877F2';
      case 'amazon':
        return '#FF9900';
      case 'microsoft':
        return '#0078D4';
      case 'apple':
        return '#000000';
      default:
        return props.theme.colors.primary;
    }
  }};
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

const RoleTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.875rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  background: ${props => props.theme.colors.secondary + '15'};
  color: ${props => props.theme.colors.secondary};
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
    description: 'Master essential frontend concepts, HTML, CSS, and JavaScript fundamentals for technical interviews.',
    icon: <FaCode />,
    tags: ['beginner'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    roles: ['Frontend Developer', 'Web Developer']
  },
  // ... rest of the interview topics ...
];

const dsaCategories: Category[] = [
  { id: 'arrays', title: 'Arrays', count: 45 },
  { id: 'linked-lists', title: 'Linked Lists', count: 30 },
  { id: 'trees', title: 'Trees', count: 35 },
  { id: 'graphs', title: 'Graphs', count: 25 },
  { id: 'dynamic-programming', title: 'Dynamic Programming', count: 20 }
];

const machineCodingCategories: Category[] = [
  { id: 'react', title: 'React', count: 15 },
  { id: 'javascript', title: 'JavaScript', count: 20 },
  { id: 'css', title: 'CSS', count: 10 },
  { id: 'typescript', title: 'TypeScript', count: 12 }
];

const quizCategories: Category[] = [
  { id: 'react', title: 'React', count: 8 },
  { id: 'javascript', title: 'JavaScript', count: 10 },
  { id: 'css', title: 'CSS', count: 6 },
  { id: 'typescript', title: 'TypeScript', count: 7 }
];

const dsaProblems: DSAProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
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
          'How would you handle edge cases?'
        ]
      }
    ]
  },
  // ... rest of the DSA problems ...
];

const machineCodingProblems: MachineCodingProblem[] = [
  {
    id: 'infinite-scroll',
    title: 'Infinite Scroll Implementation',
    description: 'Implement an infinite scroll component that loads more content as the user scrolls down.',
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
          'How would you optimize performance?'
        ]
      }
    ]
  },
  // ... rest of the machine coding problems ...
];

const frontendQuizzes: QuizProblem[] = [
  {
    id: 'react-hooks',
    title: 'React Hooks Quiz',
    description: 'Test your knowledge of React Hooks including useState, useEffect, and custom hooks.',
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
          'What are the common pitfalls with hooks?'
        ]
      }
    ]
  },
  // ... rest of the frontend quizzes ...
];

const InterviewPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'topics' | 'dsa' | 'machine-coding' | 'quizzes'>('topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'difficulty' | 'popularity'>('difficulty');
  const [openFilterSections, setOpenFilterSections] = useState<Record<string, boolean>>({
    difficulty: true,
    technologies: true,
    roles: true
  });

  const allTechnologies = Array.from(new Set(interviewTopics.flatMap(topic => topic.technologies)));
  const allRoles = Array.from(new Set(interviewTopics.flatMap(topic => topic.roles)));

  const filteredTopics = interviewTopics.filter(topic => {
    const matchesDifficulty = selectedDifficulty.length === 0 || topic.tags.some(tag => selectedDifficulty.includes(tag));
    const matchesTechnology = selectedTechnologies.length === 0 || topic.technologies.some(tech => selectedTechnologies.includes(tech));
    const matchesRole = selectedRoles.length === 0 || topic.roles.some(role => selectedRoles.includes(role));
    return matchesDifficulty && matchesTechnology && matchesRole;
  });

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies(prev => 
      prev.includes(tech) 
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const toggleFilterSection = (section: string) => {
    setOpenFilterSections(prev => ({
      ...prev,
      [section]: !prev[section]
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
    const categories = type === 'dsa' ? dsaCategories : 
                      type === 'machine-coding' ? machineCodingCategories : 
                      quizCategories;

    const items = type === 'dsa' ? dsaProblems :
                 type === 'machine-coding' ? machineCodingProblems :
                 frontendQuizzes;

    const filteredItems = items.filter((item: ProblemItem) => 
      selectedCategory === 'all' || item.category.toLowerCase() === selectedCategory
    );

    return (
      <ListContainer>
        <ListSidebar>
          <CategoryCard 
            active={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
          >
            <CategoryTitle>All {type === 'dsa' ? 'Problems' : type === 'machine-coding' ? 'Challenges' : 'Quizzes'}</CategoryTitle>
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
            <SearchIcon><FaSearch /></SearchIcon>
            <SearchInput 
              placeholder={`Search ${type === 'dsa' ? 'DSA problems' : type === 'machine-coding' ? 'machine coding problems' : 'quizzes'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SortButton onClick={() => setSortBy(sortBy === 'difficulty' ? 'popularity' : 'difficulty')}>
              <FaChevronDown />
              Sort by {sortBy === 'difficulty' ? 'Difficulty' : 'Popularity'}
            </SortButton>
          </SearchBar>

          {filteredItems.map((item: ProblemItem) => (
            <ProblemCard key={item.id}>
              <ProblemHeader>
                <ProblemIcon className="problem-icon">
                  {type === 'dsa' ? <FaCode /> : 
                   type === 'machine-coding' ? <FaLaptop /> : 
                   <FaQuestionCircle />}
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

                  {item.roleSpecific && item.roleSpecific.map((roleInfo: { role: string; questions: string[] }) => (
                    <RoleSpecificSection key={roleInfo.role}>
                      <RoleSpecificTitle>
                        <FaUsers size={14} />
                        {roleInfo.role} Questions
                      </RoleSpecificTitle>
                      <RoleSpecificList>
                        {roleInfo.questions.map((question: string, index: number) => (
                          <RoleSpecificItem key={index}>
                            {question}
                          </RoleSpecificItem>
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
                      <StatIcon><FaUsers /></StatIcon>
                      <span>Acceptance: {item.acceptance}</span>
                    </StatItem>
                    <StatItem>
                      <StatIcon><FaCode /></StatIcon>
                      <span>Submissions: {item.submissions}</span>
                    </StatItem>
                  </>
                )}
                {type === 'machine-coding' && 'timeLimit' in item && (
                  <>
                    <StatItem>
                      <StatIcon><FaClock /></StatIcon>
                      <span>Time Limit: {item.timeLimit}</span>
                    </StatItem>
                    <StatItem>
                      <StatIcon><FaCode /></StatIcon>
                      <span>Tech Stack: {'techStack' in item ? item.techStack.join(', ') : ''}</span>
                    </StatItem>
                  </>
                )}
                {type === 'quizzes' && 'questions' in item && (
                  <>
                    <StatItem>
                      <StatIcon><FaQuestionCircle /></StatIcon>
                      <span>{item.questions} Questions</span>
                    </StatItem>
                    <StatItem>
                      <StatIcon><FaClock /></StatIcon>
                      <span>Time Limit: {item.timeLimit}</span>
                    </StatItem>
                    <StatItem>
                      <StatIcon><FaBook /></StatIcon>
                      <span>Category: {item.category}</span>
                    </StatItem>
                  </>
                )}
              </ProblemMeta>
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
          <TopicsGrid>
            {interviewTopics.map((topic: InterviewTopic) => (
              <TopicCard key={topic.id}>
                <TopicIcon>{topic.icon}</TopicIcon>
                <TopicContent>
                  <TopicTitle>{topic.title}</TopicTitle>
                  <TopicDescription>{topic.description}</TopicDescription>
                  <TagGroup>
                    {topic.tags.map((tag: string) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagGroup>
                  <TechStack>
                    {topic.technologies.map((tech: string) => (
                      <TechItem key={tech}>
                        {getTechIcon(tech)}
                        {tech}
                      </TechItem>
                    ))}
                  </TechStack>
                  <RoleGroup>
                    {topic.roles.map((role: string) => (
                      <RoleTag key={role}>{role}</RoleTag>
                    ))}
                  </RoleGroup>
                </TopicContent>
              </TopicCard>
            ))}
          </TopicsGrid>
        );

      case 'dsa':
        return renderListContent('dsa');

      case 'machine-coding':
        return renderListContent('machine-coding');

      case 'quizzes':
        return renderListContent('quizzes');
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
        <FilterSidebar>
          <FilterTitle>
            <FaFilter />
            Filters
            {getActiveFiltersCount() > 0 && (
              <FilterCount>{getActiveFiltersCount()}</FilterCount>
            )}
          </FilterTitle>

          <FilterPresets>
            <PresetButton onClick={() => applyPreset('beginner')}>
              <span>Beginner Friendly</span>
              <FaPlus size={14} />
            </PresetButton>
            <PresetButton onClick={() => applyPreset('intermediate')}>
              <span>Intermediate Level</span>
              <FaPlus size={14} />
            </PresetButton>
            <PresetButton onClick={() => applyPreset('advanced')}>
              <span>Advanced Topics</span>
              <FaPlus size={14} />
            </PresetButton>
            <PresetButton onClick={() => applyPreset('frontend')}>
              <span>Frontend Focus</span>
              <FaPlus size={14} />
            </PresetButton>
            <PresetButton onClick={() => applyPreset('react')}>
              <span>React Specialized</span>
              <FaPlus size={14} />
            </PresetButton>
          </FilterPresets>
          
          <FilterSection>
            <FilterSectionHeader onClick={() => toggleFilterSection('difficulty')}>
              <FilterSectionTitle>Difficulty Level</FilterSectionTitle>
              {openFilterSections.difficulty ? <FaMinus size={14} /> : <FaPlus size={14} />}
            </FilterSectionHeader>
            <FilterSectionContent isOpen={openFilterSections.difficulty}>
              <FilterChipGroup>
                <FilterChip 
                  active={selectedDifficulty.includes('beginner')}
                  onClick={() => toggleDifficulty('beginner')}
                >
                  <span>Beginner</span>
                </FilterChip>
                <FilterChip 
                  active={selectedDifficulty.includes('intermediate')}
                  onClick={() => toggleDifficulty('intermediate')}
                >
                  <span>Intermediate</span>
                </FilterChip>
                <FilterChip 
                  active={selectedDifficulty.includes('advanced')}
                  onClick={() => toggleDifficulty('advanced')}
                >
                  <span>Advanced</span>
                </FilterChip>
              </FilterChipGroup>
            </FilterSectionContent>
          </FilterSection>

          <FilterSection>
            <FilterSectionHeader onClick={() => toggleFilterSection('technologies')}>
              <FilterSectionTitle>Technologies</FilterSectionTitle>
              {openFilterSections.technologies ? <FaMinus size={14} /> : <FaPlus size={14} />}
            </FilterSectionHeader>
            <FilterSectionContent isOpen={openFilterSections.technologies}>
              <FilterChipGroup>
                {allTechnologies.map(tech => (
                  <FilterChip 
                    key={tech}
                    active={selectedTechnologies.includes(tech)}
                    onClick={() => toggleTechnology(tech)}
                  >
                    <span>{tech}</span>
                  </FilterChip>
                ))}
              </FilterChipGroup>
            </FilterSectionContent>
          </FilterSection>

          <FilterSection>
            <FilterSectionHeader onClick={() => toggleFilterSection('roles')}>
              <FilterSectionTitle>Frontend Roles</FilterSectionTitle>
              {openFilterSections.roles ? <FaMinus size={14} /> : <FaPlus size={14} />}
            </FilterSectionHeader>
            <FilterSectionContent isOpen={openFilterSections.roles}>
              <FilterChipGroup>
                {allRoles.map(role => (
                  <FilterChip 
                    key={role}
                    active={selectedRoles.includes(role)}
                    onClick={() => toggleRole(role)}
                  >
                    <span>{role}</span>
                  </FilterChip>
                ))}
              </FilterChipGroup>
            </FilterSectionContent>
          </FilterSection>

          {(selectedDifficulty.length > 0 || selectedTechnologies.length > 0 || selectedRoles.length > 0) && (
            <ClearFiltersButton onClick={() => {
              setSelectedDifficulty([]);
              setSelectedTechnologies([]);
              setSelectedRoles([]);
            }}>
              Clear All Filters
            </ClearFiltersButton>
          )}
        </FilterSidebar>

        <ContentSection>
          <Header>
            <Title>Frontend Interview Prep</Title>
            <Description>
              Master frontend interview preparation with our comprehensive collection of topics, questions, and best practices.
              From fundamentals to advanced concepts, we've got you covered.
            </Description>

            <StatsBar>
              <StatItem>
                <StatIcon><FaStar /></StatIcon>
                <span>500+ Interview Questions</span>
              </StatItem>
              <StatItem>
                <StatIcon><FaClock /></StatIcon>
                <span>50+ Hours of Content</span>
              </StatItem>
              <StatItem>
                <StatIcon><FaUsers /></StatIcon>
                <span>10k+ Success Stories</span>
              </StatItem>
            </StatsBar>
          </Header>

          {renderActiveFilters()}

          <TabContainer>
            <TabList>
              <Tab 
                active={activeTab === 'topics'} 
                onClick={() => setActiveTab('topics')}
              >
                <FaBook />
                Topics
              </Tab>
              <Tab 
                active={activeTab === 'dsa'} 
                onClick={() => setActiveTab('dsa')}
              >
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
              <Tab 
                active={activeTab === 'quizzes'} 
                onClick={() => setActiveTab('quizzes')}
              >
                <FaQuestionCircle />
                Quizzes
              </Tab>
            </TabList>
          </TabContainer>

          <TabContent>
            {renderTabContent()}
          </TabContent>
        </ContentSection>
      </PageContainer>
    </MainLayout>
  );
};

export default InterviewPage; 