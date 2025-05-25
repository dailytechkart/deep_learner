import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Section = styled.section`
  margin: 2rem 0;
`;

export const SectionHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const SectionContent = styled.div`
  margin-top: 1rem;
`;

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 1}, 1fr);
  gap: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;
