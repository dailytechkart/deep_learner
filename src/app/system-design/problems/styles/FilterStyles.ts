import styled from 'styled-components';

export const FiltersContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const FilterSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FilterTitle = styled.h3`
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const FilterButton = styled.button<{ selected?: boolean; difficulty?: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid
    ${({ theme, selected }) => (selected ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : theme.colors.backgroundAlt};
  color: ${({ theme, selected }) => (selected ? theme.colors.background : theme.colors.text)};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme, selected }) =>
      selected ? theme.colors.primary : theme.colors.backgroundHover};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  ${({ difficulty, theme }) => {
    if (difficulty === 'Easy') {
      return `
        &:hover {
          border-color: ${theme.colors.status.success};
          background-color: ${theme.colors.status.success}10;
        }
      `;
    }
    if (difficulty === 'Medium') {
      return `
        &:hover {
          border-color: ${theme.colors.status.warning};
          background-color: ${theme.colors.status.warning}10;
        }
      `;
    }
    if (difficulty === 'Hard') {
      return `
        &:hover {
          border-color: ${theme.colors.status.error};
          background-color: ${theme.colors.status.error}10;
        }
      `;
    }
    return '';
  }}
`;

export const FilterCount = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const FilterDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  margin: 1.5rem 0;
`;
