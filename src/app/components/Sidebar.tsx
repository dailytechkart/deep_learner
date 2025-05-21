'use client';

import React, { useState, useEffect } from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarActions,
  FilterButton,
  SidebarTitle,
  CategoryList,
  CategoryButton,
  CategoryIcon,
  SidebarSection,
  SidebarSectionTitle,
  SidebarStats,
  SidebarStatItem,
  SidebarDivider,
  SidebarSearch,
  SidebarSearchInput,
  SidebarSearchIcon,
  SidebarFooter,
  SidebarFooterText,
  Logo,
  SidebarProgress,
  SidebarProgressBar,
  SidebarProgressText,
  SidebarProgressValue,
  SidebarProgressLabel,
  SidebarFilterGroup,
  SidebarFilterLabel,
  SidebarCategoryGroup,
  SidebarCategoryHeader,
  SidebarCategoryCount,
  SidebarQuickActions,
  SidebarQuickActionButton,
} from './StyledComponents';
import Loader from './Loader';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  selectedCategory: string;
  selectedFilter: string;
  onCategoryChange: (category: string) => void;
  onFilterChange: (filter: string) => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  selectedCategory,
  selectedFilter,
  onCategoryChange,
  onFilterChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();

  // Mock data - replace with actual data from your API
  const stats = [
    { icon: '📚', value: '12', label: 'Topics Completed' },
    { icon: '⏱️', value: '24h', label: 'Time Spent' },
    { icon: '🎯', value: '85%', label: 'Success Rate' },
  ];

  const categories = [
    { id: 'frontend', name: 'Frontend Development', icon: '🌐', count: 15 },
    { id: 'backend', name: 'Backend Development', icon: '⚙️', count: 12 },
    { id: 'database', name: 'Database', icon: '🗄️', count: 8 },
    { id: 'devops', name: 'DevOps', icon: '🚀', count: 10 },
    { id: 'system-design', name: 'System Design', icon: '🏗️', count: 6 },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 500);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar>
      <SidebarSection>
        <SidebarHeader>
          <Link href="/" passHref>
            <Logo>Frontendly</Logo>
          </Link>
        </SidebarHeader>
        <SidebarSearch>
          <SidebarSearchInput
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search categories"
          />
          <SidebarSearchIcon>
            {isSearching ? <Loader variant="spinner" size="sm" /> : '🔍'}
          </SidebarSearchIcon>
        </SidebarSearch>
      </SidebarSection>

      <SidebarDivider />

      <SidebarSection>
        <SidebarSectionTitle>Your Progress</SidebarSectionTitle>
        <SidebarProgress>
          <SidebarProgressBar progress={75} />
          <SidebarProgressText>
            <SidebarProgressValue>75%</SidebarProgressValue>
            <SidebarProgressLabel>Overall Completion</SidebarProgressLabel>
          </SidebarProgressText>
        </SidebarProgress>
        <SidebarStats>
          {stats.map((stat, index) => (
            <SidebarStatItem key={index}>
              <span>{stat.icon}</span>
              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </SidebarStatItem>
          ))}
        </SidebarStats>
      </SidebarSection>

      <SidebarDivider />

      <SidebarSection>
        <SidebarSectionTitle>Quick Actions</SidebarSectionTitle>
        <SidebarQuickActions>
          <SidebarQuickActionButton onClick={() => onFilterChange('in-progress')}>
            <span>▶️</span>
            Continue Learning
          </SidebarQuickActionButton>
          <SidebarQuickActionButton onClick={() => onFilterChange('completed')}>
            <span>📝</span>
            Review Completed
          </SidebarQuickActionButton>
          <SidebarQuickActionButton onClick={() => onFilterChange('bookmarked')}>
            <span>🔖</span>
            Bookmarked Topics
          </SidebarQuickActionButton>
        </SidebarQuickActions>
      </SidebarSection>

      <SidebarDivider />

      <SidebarSection>
        <SidebarSectionTitle>Filter Topics</SidebarSectionTitle>
        <SidebarFilterGroup>
          <SidebarFilterLabel>Status</SidebarFilterLabel>
          <SidebarActions>
            <FilterButton active={selectedFilter === 'all'} onClick={() => onFilterChange('all')}>
              All
            </FilterButton>
            <FilterButton
              active={selectedFilter === 'in-progress'}
              onClick={() => onFilterChange('in-progress')}
            >
              In Progress
            </FilterButton>
            <FilterButton
              active={selectedFilter === 'completed'}
              onClick={() => onFilterChange('completed')}
            >
              Completed
            </FilterButton>
          </SidebarActions>
        </SidebarFilterGroup>
      </SidebarSection>

      <SidebarDivider />

      <SidebarSection>
        <SidebarCategoryHeader>
          <SidebarSectionTitle>Categories</SidebarSectionTitle>
          <SidebarCategoryCount>{categories.length} Total</SidebarCategoryCount>
        </SidebarCategoryHeader>
        <SidebarCategoryGroup>
          {isSearching ? (
            <Loader variant="pulse" size="md" />
          ) : (
            filteredCategories.map(category => (
              <CategoryButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => onCategoryChange(category.id)}
              >
                <CategoryIcon>{category.icon}</CategoryIcon>
                <span>{category.name}</span>
                <span className="category-count">{category.count}</span>
              </CategoryButton>
            ))
          )}
        </SidebarCategoryGroup>
      </SidebarSection>

      <SidebarFooter>
        <SidebarFooterText>
          <span>🚀</span>
          Frontendly
        </SidebarFooterText>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
