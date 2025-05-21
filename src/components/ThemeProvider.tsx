'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider, DefaultTheme } from 'styled-components';

const lightTheme: DefaultTheme = {
  colors: {
    primary: '#0070f3',
    primaryDark: '#0051a2',
    secondary: '#666666',
    background: '#f5f5f3',
    backgroundAlt: '#ffffff',
    backgroundHover: '#f0f0f0',
    sidebar: '#f5f5f3',
    text: '#222222',
    textSecondary: '#666666',
    border: '#e5e5e5',
    borderLight: '#e5e5e5',
    practiceBackground: '#ffffff',
    problemBackground: '#ffffff',
    solutionBackground: '#ffffff',
    status: {
      success: '#0070f3',
      error: '#ff0000',
      warning: '#f5a623',
      info: '#0070f3',
    },
    code: {
      background: '#f6f8fa',
      text: '#24292e',
      comment: '#6A9955',
      keyword: '#569CD6',
      string: '#CE9178',
      function: '#DCDCAA',
      variable: '#9CDCFE',
      number: '#B5CEA8',
      operator: '#D4D4D4',
    },
    accent1: '#FF6B6B',
    accent2: '#4ECDC4',
    accent3: '#FFD93D',
    accent4: '#95E1D3',
    accent5: '#6C5CE7',
    accent6: '#00B894',
    accent7: '#FDCB6E',
    accent8: '#E17055',
    gradient1: 'linear-gradient(135deg, #007acc 0%, #6C5CE7 100%)',
    gradient2: 'linear-gradient(135deg, #4ECDC4 0%, #00B894 100%)',
    gradient3: 'linear-gradient(135deg, #FF6B6B 0%, #E17055 100%)',
    gradient4: 'linear-gradient(135deg, #FFD93D 0%, #FDCB6E 100%)',
    systemDesign: {
      architecture: '#6C5CE7',
      patterns: '#00B894',
      scalability: '#FF6B6B',
      security: '#4ECDC4',
      performance: '#FFD93D',
      reliability: '#95E1D3',
      microservices: '#E17055',
      cloud: '#3498DB',
    },
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    code: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
    '4xl': '8rem',
    '5xl': '10rem',
    '6xl': '12rem',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
  },
};

const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    primary: '#0070f3',
    primaryDark: '#4a8cd2',
    secondary: '#666666',
    background: '#1a1a1a',
    backgroundAlt: '#2d2d2d',
    backgroundHover: '#3d3d3d',
    sidebar: '#2d2d2d',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    border: '#404040',
    borderLight: '#505050',
    practiceBackground: '#2d2d2d',
    problemBackground: '#2d2d2d',
    solutionBackground: '#2d2d2d',
    status: {
      success: '#0070f3',
      error: '#ff4444',
      warning: '#ffb74d',
      info: '#64b5f6',
    },
    code: {
      background: '#2d2d2d',
      text: '#d4d4d4',
      comment: '#6A9955',
      keyword: '#569CD6',
      string: '#CE9178',
      function: '#DCDCAA',
      variable: '#9CDCFE',
      number: '#B5CEA8',
      operator: '#D4D4D4',
    },
    accent1: '#FF6B6B',
    accent2: '#4ECDC4',
    accent3: '#FFD93D',
    accent4: '#95E1D3',
    accent5: '#6C5CE7',
    accent6: '#00B894',
    accent7: '#FDCB6E',
    accent8: '#E17055',
    gradient1: 'linear-gradient(135deg, #007acc 0%, #6C5CE7 100%)',
    gradient2: 'linear-gradient(135deg, #4ECDC4 0%, #00B894 100%)',
    gradient3: 'linear-gradient(135deg, #FF6B6B 0%, #E17055 100%)',
    gradient4: 'linear-gradient(135deg, #FFD93D 0%, #FDCB6E 100%)',
    systemDesign: {
      architecture: '#6C5CE7',
      patterns: '#00B894',
      scalability: '#FF6B6B',
      security: '#4ECDC4',
      performance: '#FFD93D',
      reliability: '#95E1D3',
      microservices: '#E17055',
      cloud: '#3498DB',
    },
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
  },
};

type Theme = typeof lightTheme;

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(savedTheme === 'dark' || (!savedTheme && prefersDark));
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};
