import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      // Primary colors
      primary: string;
      primaryDark: string;
      secondary: string;
      background: string;
      backgroundAlt: string;
      sidebar: string;
      text: string;
      textSecondary: string;
      
      // UI Element colors
      codeBackground: string;
      border: string;
      practiceBackground: string;
      problemBackground: string;
      solutionBackground: string;
      
      // Status colors
      success: string;
      error: string;
      warning: string;
      info: string;
      
      // Code snippet colors
      codeText: string;
      codeComment: string;
      codeKeyword: string;
      codeString: string;
      codeNumber: string;
      codeFunction: string;
      codeVariable: string;
      codeOperator: string;
      borderLight: string;
    };
    fonts: {
      body: string;
      code: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    typography: {
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
      };
      fontWeight: {
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;
    };
  }
}

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#007AFF',
    primaryDark: '#2563eb',
    secondary: '#6c757d',
    background: '#ffffff',
    backgroundAlt: '#f8fafc',
    sidebar: '#f8f9fa',
    text: '#212529',
    textSecondary: '#64748b',
    codeBackground: '#f8f9fa',
    border: '#dee2e6',
    practiceBackground: '#f8f9fa',
    problemBackground: '#ffffff',
    solutionBackground: '#f8f9fa',
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    codeKeyword: '#d73a49',
    codeString: '#032f62',
    codeComment: '#6a737d',
    codeFunction: '#6f42c1',
    codeVariable: '#e36209',
    codeOperator: '#d73a49',
    codeText: '#24292e',
    codeNumber: '#005cc5',
    borderLight: '#e2e8f0'
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    code: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '4rem',
    '5xl': '5rem',
    '6xl': '6rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  },
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.5rem',
    h4: '1.25rem',
    h5: '1.125rem',
    h6: '1rem'
  }
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#0d6efd',
    primaryDark: '#3b82f6',
    secondary: '#6c757d',
    background: '#212529',
    backgroundAlt: '#1e293b',
    sidebar: '#2c3034',
    text: '#f8f9fa',
    textSecondary: '#94a3b8',
    codeBackground: '#2c3034',
    border: '#495057',
    practiceBackground: '#2c3034',
    problemBackground: '#212529',
    solutionBackground: '#2c3034',
    success: '#4ade80',
    error: '#f87171',
    warning: '#fbbf24',
    info: '#60a5fa',
    codeKeyword: '#ff7b72',
    codeString: '#a5d6ff',
    codeComment: '#8b949e',
    codeFunction: '#d2a8ff',
    codeVariable: '#ffa657',
    codeOperator: '#ff7b72',
    codeText: '#e6edf3',
    codeNumber: '#79c0ff',
    borderLight: '#334155'
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    code: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem',
    '3xl': '3rem',
    '4xl': '4rem',
    '5xl': '5rem',
    '6xl': '6rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.5rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  },
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.5rem',
    h4: '1.25rem',
    h5: '1.125rem',
    h6: '1rem'
  }
}; 