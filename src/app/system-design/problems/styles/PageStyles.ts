import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`;

export const MainContent = styled.main`
  max-width: 1400px;
  width: 100%;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const FiltersSection = styled.div`
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FilterGroup = styled.div`
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
`;

export const FilterHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${props => props.theme.colors.backgroundHover};
  }
`;

export const FilterTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const FilterContent = styled.div<{ isExpanded: boolean }>`
  padding: ${props => (props.isExpanded ? '1rem' : '0 1rem')};
  max-height: ${props => (props.isExpanded ? '500px' : '0')};
  overflow: hidden;
  transition: all 0.3s ease;
`;

export const FilterOptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
`;

export const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  color: ${props => props.theme.colors.textSecondary};
  transition: all 0.2s;
  background: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.md};
  border: 1px solid ${props => props.theme.colors.border};
  min-width: 100px;
  font-size: ${props => props.theme.typography.fontSize.sm};

  &:hover {
    color: ${props => props.theme.colors.text};
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.backgroundAlt};
  }

  input {
    margin: 0;
    width: 14px;
    height: 14px;
  }
`;

export const ExpandIcon = styled.span<{ isExpanded: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  position: relative;
  transition: transform 0.3s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    background: ${props => props.theme.colors.textSecondary};
    transition: background 0.2s;
  }

  &::before {
    width: 2px;
    height: 16px;
    left: 7px;
    top: 0;
  }

  &::after {
    width: 16px;
    height: 2px;
    left: 0;
    top: 7px;
  }

  ${props =>
    props.isExpanded &&
    `
    transform: rotate(45deg);
  `}

  ${FilterHeader}:hover & {
    &::before,
    &::after {
      background: ${props => props.theme.colors.text};
    }
  }
`;

export const ProblemsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PageHeader = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.sm} 0;
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const HeaderContent = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: 700;
`;

export const ProblemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.lg};
  color: ${props => props.theme.colors.textSecondary};
  border: 1px dashed ${props => props.theme.colors.border};

  h3 {
    font-size: ${props => props.theme.typography.fontSize.lg};
    color: ${props => props.theme.colors.text};
    margin: 0 0 ${props => props.theme.spacing.sm};
  }

  p {
    margin: 0;
    font-size: ${props => props.theme.typography.fontSize.md};
  }
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  width: 100%;
`;

export const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${props => props.theme.colors.backgroundAlt};
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SortContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

export const ResultsCount = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    font-size: 0.875rem;
  }
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
