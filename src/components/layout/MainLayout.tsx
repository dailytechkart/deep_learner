'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '@/app/components/Header/Header';
import { useTheme } from '@/app/context/ThemeContext';

const MainContainer = styled.main<{ promoStripVisible: boolean }>`
  min-height: 100vh;
  padding-top: ${({ promoStripVisible }) => (promoStripVisible ? '92px' : '72px')}; // Height of header + promo strip (if visible)
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  transition: padding-top ${({ theme }) => theme.transitions.default};
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { promoStripVisible } = useTheme();

  return (
    <MainContainer promoStripVisible={promoStripVisible}>
      <Header />
      {children}
    </MainContainer>
  );
};

export default MainLayout; 