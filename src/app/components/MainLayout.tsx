import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding-top: 64px;

  @media (max-width: 768px) {
    padding-top: 56px;
    padding-bottom: 64px; /* Add padding for bottom navigation */
  }
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <LayoutContainer>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default MainLayout;
