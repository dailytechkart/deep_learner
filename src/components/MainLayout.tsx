'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '@/app/components/Header';
import { AppFooter } from './Footer';
import { useTheme } from '@/app/context/ThemeContext';

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
  padding-top: 24px; // Push content below the fixed promo strip

  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-top: 64px; // Height of the header
  transition: all ${props => props.theme.transitions.default};
  background: ${props => props.theme.colors.background};
  padding: 0 2rem;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 56px;
    padding: 0 1rem;
  }
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
`;

const PromoStripText = styled.span`
  width: 100%;
  text-align: center;
  font-size: 0.92rem;
  font-weight: 700;
  color: #7c4a00;
  letter-spacing: 0.04em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow:
    0 1px 2px #fff8,
    0 0px 1px #ffd54f99;
  padding: 0 1rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 0 0.5rem;
  }
`;

const PromoStrip = styled.div`
  width: 100vw;
  height: 24px;
  background: linear-gradient(90deg, #ffe082 0%, #ffd54f 100%);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    height: 20px;
  }
`;

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <LayoutContainer>
      <PromoStrip>
        <PromoStripText>Get Premium Content Access at 90% OFF – Only ₹499!</PromoStripText>
      </PromoStrip>
      <Header />
      <ContentWrapper>
        <Main>{children}</Main>
      </ContentWrapper>
      <AppFooter />
    </LayoutContainer>
  );
};

export default MainLayout;
