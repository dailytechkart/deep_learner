import React from 'react';
import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { usePathname } from 'next/navigation';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: ${props => props.theme.colors.background};
`;

const MainWrapper = styled.main`
  flex: 1;
  margin-left: 280px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    margin-left: 240px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const excludedPaths = ['/', '/dashboard', '/login', '/signup'];

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const showSidebar = !excludedPaths.includes(pathname);

  return (
    <LayoutContainer>
      {showSidebar && <Sidebar />}
      <MainWrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </MainWrapper>
    </LayoutContainer>
  );
};
