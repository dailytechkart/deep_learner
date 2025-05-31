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
  hideHeader?: boolean;
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

const ContentWrapper = styled.div<{ $fullWidth?: boolean; $hideHeader?: boolean }>`
  flex: 1;
  margin-top: ${({ $hideHeader }) => ($hideHeader ? '0' : '64px')};
  transition: all ${props => props.theme.transitions.default};
  background: ${props => props.theme.colors.background};
  padding: 0;
  width: 100%;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */

  @media (max-width: 768px) {
    margin-top: ${({ $hideHeader }) => ($hideHeader ? '0' : '56px')};
    padding: 0;
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
`;

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  fullWidth,
  showOverlay = false,
  onOverlayClick,
  hideHeader = false,
}) => {
  const { isPremium } = useAuth();

  console.log(isPremium, 'profile');
  return (
    <LayoutContainer>
      <OverlayScreen isVisible={showOverlay && !isPremium} onClick={onOverlayClick} zIndex={999} />
      {!hideHeader && <Header />}
      <ContentWrapper $fullWidth={fullWidth} $hideHeader={hideHeader}>
        <Main>{children}</Main>
      </ContentWrapper>
      <AppFooter />
    </LayoutContainer>
  );
};

export default MainLayout;
