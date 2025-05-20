import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '@/app/components/Header';
import { PageLayout } from '@/app/components/PageLayout';
import { useTheme } from '@/app/context/ThemeContext';
import { AppFooter } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  showBreadcrumb?: boolean;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all ${props => props.theme.transitions.default};
`;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.theme.colors.background}dd;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  height: 64px;
  transition: all ${props => props.theme.transitions.default};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-top: 64px; // Height of the header
  transition: all ${props => props.theme.transitions.default};
  background: ${props => props.theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
`;

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  className,
  showBreadcrumb = true 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useTheme();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <LayoutContainer>
      <HeaderWrapper>
        <Header 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
      </HeaderWrapper>
      <ContentWrapper>
        <Main>
          <PageLayout className={className} showBreadcrumb={showBreadcrumb}>
            {children}
          </PageLayout>
        </Main>
      </ContentWrapper>
      <AppFooter />
    </LayoutContainer>
  );
}; 