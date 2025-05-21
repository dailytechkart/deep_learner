'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '@/app/components/Header';
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
  showBreadcrumb = true,
}) => {
  return (
    <LayoutContainer>
      <Header />
      <ContentWrapper>
        <Main>{children}</Main>
      </ContentWrapper>
      <AppFooter />
    </LayoutContainer>
  );
};

export default MainLayout;
