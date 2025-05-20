import { ReactNode } from 'react';
import styled from 'styled-components';
import { Breadcrumb } from '@/components/Breadcrumb';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  showBreadcrumb?: boolean;
}

const PageContainer = styled.div`
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  max-width: 80rem;
  padding: 1.5rem 1rem;
`;

const MainContent = styled.main`
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`;

export const PageLayout = ({ children, className, showBreadcrumb = true }: PageLayoutProps) => {
  return (
    <PageContainer>
      <ContentWrapper>
        {showBreadcrumb && <Breadcrumb className="mb-6" />}
        <MainContent className={className}>{children}</MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};
