'use client';

import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import styled from 'styled-components';
import { learningTopics } from '../../data/learningTopics';
import { MainLayout } from '@/components/MainLayout';
import { useTheme } from '../context/ThemeContext';
import { FilterSidebar } from '@/components/FilterSidebar';
import type { FilterSection as FilterSectionType, FilterValue } from '@/components/FilterSidebar';
import { FaFilter } from 'react-icons/fa';
import { HeaderSection } from './components/HeaderSection';
import { StatsBar } from './components/StatsBar';
import { CourseList } from './components/CourseList';
import { SEO } from './components/SEO';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import ProtectedRoute from '@/app/components/ProtectedRoute';

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
type Role =
  | 'SDE1'
  | 'SDE2'
  | 'SDE3'
  | 'Frontend Specialist'
  | 'Frontend Architect'
  | 'UI/UX Developer'
  | 'Frontend Performance Engineer';

const MainContent = styled.main`
  max-width: 1400px;
  width: 100%;
  padding: 2rem;
  display: flex;
  gap: 2rem;

  @media (max-width: 1024px) {
    padding: 1.5rem;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

const CoursesSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const FilterButton = styled.button`
  display: none;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  position: fixed;
  bottom: 88px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  box-shadow: ${props => props.theme.shadows.md};

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
  }
`;

const BottomSheet = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.lg} ${props => props.theme.borderRadius.lg} 0 0;
  padding: 1.5rem;
  transform: translateY(${props => (props.isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  z-index: 1000;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${props => props.theme.shadows.lg};
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`;

const FilterSidebarFallback = styled.div`
  width: 280px;
  height: 100%;
  background: ${props => props.theme.colors.background};
  border-right: 1px solid ${props => props.theme.colors.border};
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.textSecondary};
`;

const LearnPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<FilterValue[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<FilterValue[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<FilterValue[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Memoize unique values
  const { categories, difficulties, roles } = useMemo(() => ({
    categories: Array.from(new Set(learningTopics.map(topic => topic.category))),
    difficulties: Array.from(new Set(learningTopics.map(topic => topic.difficulty))),
    roles: Array.from(new Set(learningTopics.map(topic => topic.role))),
  }), []);

  const handleFilterChange = useCallback((section: string, value: FilterValue) => {
    switch (section) {
      case 'categories':
        setSelectedCategories(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
      case 'difficulties':
        setSelectedDifficulties(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
      case 'roles':
        setSelectedRoles(prev =>
          prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
        break;
    }
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedRoles([]);
    setSearchQuery('');
  }, []);

  const filterSections = useMemo<FilterSectionType[]>(() => [
    {
      title: 'Categories',
      options: categories.map(category => ({
        id: category,
        label: category,
        count: learningTopics.filter(topic => topic.category === category).length,
      })),
      selected: selectedCategories,
      onSelect: (value: FilterValue) => handleFilterChange('categories', value),
    },
    {
      title: 'Difficulty',
      options: difficulties.map(difficulty => ({
        id: difficulty,
        label: difficulty,
        count: learningTopics.filter(topic => topic.difficulty === difficulty).length,
      })),
      selected: selectedDifficulties,
      onSelect: (value: FilterValue) => handleFilterChange('difficulties', value),
    },
    {
      title: 'Role',
      options: roles.map(role => ({
        id: role,
        label: role,
        count: learningTopics.filter(topic => topic.role === role).length,
      })),
      selected: selectedRoles,
      onSelect: (value: FilterValue) => handleFilterChange('roles', value),
    },
  ], [categories, difficulties, roles, selectedCategories, selectedDifficulties, selectedRoles, handleFilterChange]);

  // Memoize filtered topics
  const filteredTopics = useMemo(
    () =>
      learningTopics.filter(topic => {
        const categoryMatch =
          selectedCategories.length === 0 || selectedCategories.includes(topic.category);
        const difficultyMatch =
          selectedDifficulties.length === 0 || selectedDifficulties.includes(topic.difficulty);
        const roleMatch = selectedRoles.length === 0 || selectedRoles.includes(topic.role);
        const searchMatch =
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.difficulty.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.role.toLowerCase().includes(searchQuery.toLowerCase());

        return categoryMatch && difficultyMatch && roleMatch && searchMatch;
      }),
    [selectedCategories, selectedDifficulties, selectedRoles, searchQuery]
  );

  // Simulate loading state when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategories, selectedDifficulties, selectedRoles, searchQuery]);

  const handleBottomSheetToggle = useCallback(() => {
    setIsBottomSheetOpen(prev => !prev);
  }, []);

  const handleOverlayClick = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, []);

  console.log('LearnPage - Component Mounted');

  return (
    <ProtectedRoute>
      <MainLayout>
        <SEO
          title="Learn Frontend Development"
          description="Master frontend development with our comprehensive learning resources. From HTML to advanced React patterns, learn everything you need to become a frontend expert."
        />
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Learn', href: '/learn' }
          ]}
        />
        <HeaderSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <StatsBar />
        <div style={{ display: 'flex', height: 'calc(100vh - 300px)' }}>
          <Suspense fallback={<FilterSidebarFallback>Loading filters...</FilterSidebarFallback>}>
            <FilterSidebar sections={filterSections} onClearAll={clearAllFilters} />
          </Suspense>
          <CourseList
            topics={learningTopics}
            isLoading={isLoading}
            onClearFilters={clearAllFilters}
          />
        </div>
        <FilterButton onClick={() => setIsBottomSheetOpen(true)}>
          <FaFilter />
          Filters
        </FilterButton>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default LearnPage;
