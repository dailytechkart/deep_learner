'use client';

import React, { useState } from 'react';
import Header from './Header';
import { DashboardContainer } from './StyledComponents';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <DashboardContainer>
      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      {children}
    </DashboardContainer>
  );
} 