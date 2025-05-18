'use client';

import React from 'react';
import Header from './Header';
import { DashboardContainer } from './StyledComponents';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <DashboardContainer>
      <Header />
      {children}
    </DashboardContainer>
  );
} 