'use client';

import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { useTheme } from '../context/ThemeContext';
import { useSearch } from '../context/SearchContext';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 64px;
`;

export default function SystemDesignLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearchChange: Dispatch<SetStateAction<string>> = value => {
    if (typeof value === 'function') {
      setSearchQuery(value(searchQuery));
    } else {
      setSearchQuery(value);
    }
  };

  return (
    <Container>
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <MainContent>{children}</MainContent>
    </Container>
  );
}
