import React, { ReactNode } from 'react';
import styled from 'styled-components';

// Layout containers
const Layout = styled.div`
  display: flex;
  height: 100vh;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  font-family: "Charter", "Georgia", "Cambria", "Times New Roman", "Times", serif;
`;

const LeftPanel = styled.nav<{ isOpen?: boolean }>`
  width: 320px;
  min-width: 280px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  margin-top: 80px;
  transition: all 0.3s ease;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    position: fixed;
    left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    z-index: 1000;
  }
`;

const MainPanel = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  height: 100vh;
  margin-top: 80px;
  transition: all 0.3s ease;
  position: relative;
  overflow-y: auto;
`;

const RightPanel = styled.aside`
  width: 300px;
  min-width: 250px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  margin-top: 80px;
  transition: all 0.3s ease;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  overflow-y: auto;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const BreadcrumbContainer = styled.nav`
  width: 100%;
  padding: 16px 36px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 80px;
  position: sticky;
  top: 80px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

interface SystemDesignLayoutProps {
  leftPanel?: ReactNode;
  mainPanel: ReactNode;
  rightPanel?: ReactNode;
  breadcrumbs?: ReactNode;
}

const SystemDesignLayout: React.FC<SystemDesignLayoutProps> = ({
  leftPanel,
  mainPanel,
  rightPanel,
  breadcrumbs
}) => {
  return (
    <>
      {breadcrumbs && <BreadcrumbContainer aria-label="Breadcrumb">{breadcrumbs}</BreadcrumbContainer>}
      <Layout>
        {leftPanel && <LeftPanel>{leftPanel}</LeftPanel>}
        <MainPanel>{mainPanel}</MainPanel>
        {rightPanel && <RightPanel>{rightPanel}</RightPanel>}
      </Layout>
    </>
  );
};

export default SystemDesignLayout; 