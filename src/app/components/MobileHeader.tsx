import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/app/context/ThemeContext';
import { useAuth } from '@/app/context/AuthContext';
import { FaMoon, FaSun, FaBars } from 'react-icons/fa';
import CompactLogo from './CompactLogo';

const MobileHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: ${props => props.theme.colors.background}dd;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${props => props.theme.colors.border};
  z-index: 9999;
  display: none;
  padding-top: env(safe-area-inset-top);

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileHeaderContent = styled.div`
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 360px) {
    padding: 0 0.75rem;
  }
`;

const MobileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  padding: 0.5rem;
  border-radius: ${props => props.theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: ${props => props.theme.colors.text};
    background: ${props => props.theme.colors.backgroundAlt};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 360px) {
    padding: 0.375rem;
  }
`;

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <MobileHeaderContainer>
      <MobileHeaderContent>
        <CompactLogo />
        <MobileActions>
          <IconButton
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </IconButton>
          <IconButton onClick={onMenuClick} aria-label="Open menu">
            <FaBars />
          </IconButton>
        </MobileActions>
      </MobileHeaderContent>
    </MobileHeaderContainer>
  );
};

export default MobileHeader;
