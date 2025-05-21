import styled from 'styled-components';

export const SearchContainer = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  background: none;
  border: none;
  padding: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus {
    outline: none;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ProblemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
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
