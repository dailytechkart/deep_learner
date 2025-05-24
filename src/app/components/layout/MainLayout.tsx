'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';

const MainContainer = styled.main`
  min-height: 100vh;
  padding-top: 92px; // Height of header + promo strip
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <MainContainer>{children}</MainContainer>
    </>
  );
}
