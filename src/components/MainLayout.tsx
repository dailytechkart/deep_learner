'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '@/app/components/Header/Header';
import { AppFooter } from './Footer';
import { useAuth } from '@/app/context/AuthContext';
import OverlayScreen from './OverlayScreen';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  showBreadcrumb?: boolean;
  fullWidth?: boolean;
  showOverlay?: boolean;
  onOverlayClick?: () => void;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all ${props => props.theme.transitions.default};
  /* padding-top: 24px; // Push content below the fixed promo strip */

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

const ContentWrapper = styled.div<{ $fullWidth?: boolean }>`
  flex: 1;
  margin-top: 64px; // Height of the header
  transition: all ${props => props.theme.transitions.default};
  background: ${props => props.theme.colors.background};
  padding: 0 ${props => (props.$fullWidth ? '0' : '2rem')};
  max-width: ${props => (props.$fullWidth ? '100%' : '1400px')};
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 56px;
    padding: 0 ${props => (props.$fullWidth ? '0' : '1rem')};
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
`;

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  fullWidth,
  showOverlay = true,
  onOverlayClick,
}) => {
  const { isPremium } = useAuth();

  console.log(isPremium, 'profile');
  return (
    <LayoutContainer>
      <OverlayScreen isVisible={showOverlay && !isPremium} onClick={onOverlayClick} zIndex={999} />
      <Header />
      <ContentWrapper $fullWidth={fullWidth}>
        <Main>{children}</Main>
      </ContentWrapper>
      <AppFooter />
    </LayoutContainer>
  );
};

export default MainLayout;
