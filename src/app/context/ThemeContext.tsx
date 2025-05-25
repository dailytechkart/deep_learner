'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '@/app/theme';
import { setPromoStripVisibility } from '@/app/actions/promoStrip';
import { setTheme } from '@/app/actions/theme';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  promoStripVisible: boolean;
  setPromoStripVisible: (visible: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialPromoStripVisible: boolean;
  initialTheme: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children,
  initialPromoStripVisible,
  initialTheme
}) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return initialTheme === 'dark';
    }
    return initialTheme === 'dark';
  });
  const [promoStripVisible, setPromoStripVisible] = useState(initialPromoStripVisible);
  const [mounted, setMounted] = useState(false);

  // Handle initial mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle theme changes
  useEffect(() => {
    if (mounted) {
      const theme = isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      document.cookie = `theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year
    }
  }, [isDarkMode, mounted]);

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      const themeValue = newTheme ? 'dark' : 'light';
      await setTheme(themeValue);
    } catch (error) {
      console.error('Error toggling theme:', error);
      // Revert the state if the server action fails
      setIsDarkMode(!isDarkMode);
    }
  };

  const handlePromoStripVisibility = async (visible: boolean) => {
    setPromoStripVisible(visible);
    await setPromoStripVisibility(visible);
  };

  const theme = {
    ...(isDarkMode ? darkTheme : lightTheme),
    promoStripVisible,
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        promoStripVisible,
        setPromoStripVisible: handlePromoStripVisibility,
      }}
    >
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
