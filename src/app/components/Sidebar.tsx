'use client';

import React, { useState, useEffect } from 'react';
import {
  Sidebar as StyledSidebar,
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
  SidebarFooterText
} from './StyledComponents';
import Loader from './Loader';

interface SidebarProps {
  selectedCategory: string;
  selectedFilter: string;
  onCategoryChange: (category: string) => void;
  onFilterChange: (filter: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  selectedFilter,
  onCategoryChange,
  onFilterChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚', count: 12 },
    { id: 'ml', name: 'Machine Learning', icon: '🤖', count: 4 },
    { id: 'dl', name: 'Deep Learning', icon: '🧠', count: 3 },
    { id: 'nlp', name: 'NLP', icon: '💬', count: 2 },
    { id: 'cv', name: 'Computer Vision', icon: '👁️', count: 2 },
    { id: 'rl', name: 'Reinforcement Learning', icon: '🎮', count: 1 }
  ];

  const stats = [
    { label: 'In Progress', value: '4', icon: '⏳' },
    { label: 'Completed', value: '3', icon: '✅' },
    { label: 'Total Hours', value: '24', icon: '⏱️' }
  ];

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate search delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <StyledSidebar>
        <SidebarSection>
          <Loader variant="shimmer" size="lg" />
        </SidebarSection>
        <SidebarDivider />
        <SidebarSection>
          <Loader variant="shimmer" size="md" />
          <Loader variant="shimmer" size="md" />
          <Loader variant="shimmer" size="md" />
        </SidebarSection>
      </StyledSidebar>
    );
  }

  return (
    <StyledSidebar>
      <SidebarSection>
        <SidebarHeader>
          <SidebarTitle>Learning Dashboard</SidebarTitle>
        </SidebarHeader>
        <SidebarSearch>
          <SidebarSearchInput
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <SidebarSearchIcon>
            {isSearching ? <Loader variant="spinner" size="sm" /> : '🔍'}
          </SidebarSearchIcon>
        </SidebarSearch>
      </SidebarSection>

      <SidebarDivider />

      <SidebarSection>
        <SidebarSectionTitle>Your Progress</SidebarSectionTitle>
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
        <SidebarSectionTitle>Filter Topics</SidebarSectionTitle>
        <SidebarActions>
          <FilterButton
            active={selectedFilter === 'all'}
            onClick={() => onFilterChange('all')}
          >
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
      </SidebarSection>

      <SidebarDivider />

      <SidebarSection>
        <SidebarSectionTitle>Categories</SidebarSectionTitle>
        <CategoryList>
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
        </CategoryList>
      </SidebarSection>

      <SidebarFooter>
        <SidebarFooterText>
          <span>🎓</span>
          Deep Learner
        </SidebarFooterText>
      </SidebarFooter>
    </StyledSidebar>
  );
};

export default Sidebar; 