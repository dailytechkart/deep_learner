import { ReactNode } from 'react';
import styled from 'styled-components';
import { Breadcrumb } from './Breadcrumb';

interface DesktopLayoutProps {
  children: ReactNode;
  className?: string;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  max-width: 80rem;
  padding: 1.5rem 1rem;
`;

const MainContent = styled.main`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

export const DesktopLayout = ({ children, className }: DesktopLayoutProps) => {
  return (
    <LayoutContainer>
      <ContentWrapper>
        <Breadcrumb className="mb-6" />
        <MainContent className={className}>{children}</MainContent>
      </ContentWrapper>
    </LayoutContainer>
  );
};
