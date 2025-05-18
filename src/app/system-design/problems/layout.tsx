'use client';

import styled from 'styled-components';
import {
  PageContainer,
  Section,
  SectionHeader,
  SectionTitle,
  SectionContent,
} from '../../components/StyledComponents';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

function ProblemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContainer>
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
}

export default ProblemsLayout; 