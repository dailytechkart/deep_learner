'use client';

import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import { useSearch } from '../context/SearchContext';

const MainContent = styled.main`
  min-height: calc(100vh - 64px); // Subtract header height
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

export default function SystemDesignLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <>
      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <MainContent>{children}</MainContent>
    </>
  );
}
