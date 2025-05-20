'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const lightTheme = {
  colors: {
    background: '#f5f5f3',
    backgroundAlt: '#ffffff',
    text: '#222222',
    textSecondary: '#666666',
    border: '#e5e5e5',
    primary: '#0070f3',
    secondary: '#666666',
    accent: '#0070f3',
    success: '#0070f3',
    error: '#ff0000',
    warning: '#f5a623',
    info: '#0070f3',
    code: {
      background: '#f6f8fa',
      text: '#24292e',
    },
    card: {
      background: '#ffffff',
      border: '#e5e5e5',
      hover: '#f8f8f8',
    },
    badge: {
      premium: {
        background: 'linear-gradient(135deg, #ffd700 0%, #ffa500 100%)',
        text: '#000000',
      },
      difficulty: {
        easy: {
          background: '#e6f4ea',
          text: '#1e7e34',
        },
        medium: {
          background: '#fff3cd',
          text: '#856404',
        },
        hard: {
          background: '#f8d7da',
          text: '#721c24',
        },
      },
    },
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.05)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  typography: {
    fontFamily: "'Charter', 'Georgia', 'Cambria', 'Times New Roman', 'Times', serif",
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem',
      xxlarge: '2rem',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.8,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
};

const darkTheme = {
  colors: {
    background: '#1a1a1a',
    backgroundAlt: '#2d2d2d',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    border: '#404040',
    primary: '#0070f3',
    secondary: '#a0a0a0',
    accent: '#0070f3',
    success: '#0070f3',
    error: '#ff4444',
    warning: '#ffb74d',
    info: '#64b5f6',
    code: {
      background: '#2d2d2d',
      text: '#e0e0e0',
    },
    card: {
      background: '#2d2d2d',
      border: '#404040',
      hover: '#363636',
    },
    badge: {
      premium: {
        background: 'linear-gradient(135deg, #ffd700 0%, #ffa500 100%)',
        text: '#000000',
      },
      difficulty: {
        easy: {
          background: '#1b5e20',
          text: '#81c784',
        },
        medium: {
          background: '#f57f17',
          text: '#fff176',
        },
        hard: {
          background: '#b71c1c',
          text: '#ef9a9a',
        },
      },
    },
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.2)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.3)',
    large: '0 8px 16px rgba(0, 0, 0, 0.4)',
  },
  typography: {
    fontFamily: "'Charter', 'Georgia', 'Cambria', 'Times New Roman', 'Times', serif",
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.25rem',
      xlarge: '1.5rem',
      xxlarge: '2rem',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      loose: 1.8,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
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
    setIsDark((prev) => {
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