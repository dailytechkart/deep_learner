import styled from 'styled-components';

export const Sidebar = styled.aside`
  width: 280px;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow-y: auto;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const SidebarActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FilterButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, active }) => (active ? theme.colors.primary : 'transparent')};
  color: ${({ theme, active }) => (active ? 'white' : theme.colors.textSecondary)};
  border: 1px solid ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.border)};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.colors.primary : theme.colors.backgroundAlt};
  }
`;

export const SidebarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SidebarSectionTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const SidebarStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

export const SidebarStatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.875rem;

  span:first-child {
    font-size: 1.25rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    strong {
      color: ${({ theme }) => theme.colors.text};
    }

    span {
      color: ${({ theme }) => theme.colors.textSecondary};
      font-size: 0.75rem;
    }
  }
`;

export const SidebarDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0;
`;

export const SidebarSearch = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const SidebarSearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
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

export const SidebarSearchIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

export const SidebarFooter = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SidebarFooterText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;

  span {
    font-size: 1rem;
  }
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export const SidebarProgress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SidebarProgressBar = styled.div<{ progress: number }>`
  height: 4px;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    transition: width 0.3s ease;
  }
`;

export const SidebarProgressText = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
`;

export const SidebarProgressValue = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const SidebarProgressLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SidebarFilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SidebarFilterLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SidebarCategoryGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SidebarCategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const SidebarCategoryCount = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SidebarQuickActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SidebarQuickActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundHover};
  }

  span {
    font-size: 1rem;
  }
`;

export const CategoryButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${({ theme, active }) => (active ? theme.colors.primary : 'transparent')};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme, active }) => (active ? 'white' : theme.colors.text)};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;

  &:hover {
    background: ${({ theme, active }) =>
      active ? theme.colors.primary : theme.colors.backgroundAlt};
  }

  .category-count {
    margin-left: auto;
    font-size: 0.75rem;
    color: ${({ theme, active }) => (active ? 'white' : theme.colors.textSecondary)};
  }
`;

export const CategoryIcon = styled.span`
  font-size: 1rem;
`;
