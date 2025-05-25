'use client';

import React from 'react';
import styled from 'styled-components';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`;

const Header = styled.header`
  background: ${props => props.theme.colors.backgroundAlt};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.full};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }
`;

const HeaderTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <BackButton onClick={() => router.back()}>
            <FaArrowLeft size={16} />
            Back
          </BackButton>
          <HeaderTitle>Premium Subscription</HeaderTitle>
          <div style={{ width: 100 }} /> {/* Spacer for alignment */}
        </HeaderContent>
      </Header>
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
}
