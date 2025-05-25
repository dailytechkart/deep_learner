import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ThemeSwitcherContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
  background: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.full};
  border: 1px solid ${props => props.theme.colors.border};
`;

const ThemeButton = styled(motion.button)<{ $active: boolean }>`
  padding: 0.375rem 0.75rem;
  border: none;
  background: ${props => props.$active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.background : props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? props.theme.colors.primary : props.theme.colors.backgroundAlt};
  }
`;

interface ThemeSwitcherProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <ThemeSwitcherContainer>
      <ThemeButton
        $active={currentTheme === 'vs-dark'}
        onClick={() => onThemeChange('vs-dark')}
        whileTap={{ scale: 0.95 }}
      >
        Dark
      </ThemeButton>
      <ThemeButton
        $active={currentTheme === 'light'}
        onClick={() => onThemeChange('light')}
        whileTap={{ scale: 0.95 }}
      >
        Light
      </ThemeButton>
    </ThemeSwitcherContainer>
  );
}; 