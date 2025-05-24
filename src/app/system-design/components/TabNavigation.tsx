import React from 'react';
import styled from 'styled-components';
import { FaServer, FaReact, FaCode, FaLaptopCode, FaShieldAlt } from 'react-icons/fa';

const TabContainer = styled.div`
  margin-bottom: 2rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabBar = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 0.5rem;
  min-width: max-content;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const StyledTab = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: 500;
  color: ${props => (props.active ? props.theme.colors.primary : props.theme.colors.textSecondary)};
  background: ${props => (props.active ? props.theme.colors.backgroundAlt : 'transparent')};
  border: 1px solid
    ${props => (props.active ? props.theme.colors.primary : props.theme.colors.border)};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${props => props.theme.colors.backgroundAlt};
    color: ${props => props.theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: ${props => props.theme.typography.fontSize.sm};
  }
`;

export type TabType = 'all' | 'frontend' | 'performance' | 'architecture' | 'security';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabContainer>
      <TabBar>
        <StyledTab active={activeTab === 'all'} onClick={() => onTabChange('all')}>
          <FaServer /> Topics
        </StyledTab>
        <StyledTab active={activeTab === 'frontend'} onClick={() => onTabChange('frontend')}>
          <FaReact /> Frontend
        </StyledTab>
        <StyledTab active={activeTab === 'performance'} onClick={() => onTabChange('performance')}>
          <FaCode /> Performance
        </StyledTab>
        <StyledTab
          active={activeTab === 'architecture'}
          onClick={() => onTabChange('architecture')}
        >
          <FaLaptopCode /> Architecture
        </StyledTab>
        <StyledTab active={activeTab === 'security'} onClick={() => onTabChange('security')}>
          <FaShieldAlt /> Security
        </StyledTab>
      </TabBar>
    </TabContainer>
  );
};
