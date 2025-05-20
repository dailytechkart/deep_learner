import React from 'react';
import styled from 'styled-components';
import Header from '../Header';
import { useTheme } from '../../context/ThemeContext';
import { useSearch } from '../../context/SearchContext';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

const MainContent = styled.main`
  min-height: calc(100vh - 64px);
  margin-top: 64px;
  padding: ${props => props.theme.spacing.xl};
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: ${props => props.theme.spacing.md};
  }
`;

const PageHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.h1.fontSize};
  font-weight: ${props => props.theme.typography.h1.fontWeight};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  line-height: 1.2;
`;

const PageDescription = styled.p`
  font-size: ${props => props.theme.typography.body1.fontSize};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all ${props => props.theme.transitions.default};

  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.lg};
  padding-bottom: ${props => props.theme.spacing.md};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.h2.fontSize};
  font-weight: ${props => props.theme.typography.h2.fontWeight};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const SectionContent = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.body1.fontSize};
  line-height: 1.6;

  p {
    margin-bottom: ${props => props.theme.spacing.md};
  }

  ul,
  ol {
    margin-bottom: ${props => props.theme.spacing.md};
    padding-left: ${props => props.theme.spacing.xl};
  }

  li {
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  h3 {
    font-size: ${props => props.theme.typography.h3.fontSize};
    color: ${props => props.theme.colors.text};
    margin: ${props => props.theme.spacing.lg} 0 ${props => props.theme.spacing.md};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <LayoutContainer>
      {/* <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      /> */}
      <MainContent>
        {(title || description) && (
          <PageHeader>
            {title && <PageTitle>{title}</PageTitle>}
            {description && <PageDescription>{description}</PageDescription>}
          </PageHeader>
        )}
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export { Section, SectionHeader, SectionTitle, SectionContent, Grid };
