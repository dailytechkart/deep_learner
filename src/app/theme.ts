import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      // Primary colors
      primary: string;
      secondary: string;
      background: string;
      sidebar: string;
      text: string;
      
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
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}

export const lightTheme: DefaultTheme = {
  colors: {
    // Primary colors
    primary: '#2563EB', // Blue 600 - Professional and trustworthy
    secondary: '#64748B', // Slate 500 - Muted secondary text
    background: '#F8FAFC', // Slate 50 - Soft white for better eye comfort
    sidebar: '#FFFFFF', // Pure white for sidebar
    text: '#0F172A', // Slate 900 - Deep blue-gray for better readability
    
    // UI Element colors
    codeBackground: '#F8FAFC', // Slate 50 - Light background for code blocks
    border: '#E2E8F0', // Slate 200 - Softer borders
    practiceBackground: '#FFFFFF', // Pure white for practice sections
    problemBackground: '#F1F5F9', // Slate 100 - Light gray for problems
    solutionBackground: '#FFFFFF', // Pure white for solutions
    
    // Status colors
    success: '#059669', // Emerald 600 - Success states
    error: '#DC2626', // Red 600 - Error states
    warning: '#D97706', // Amber 600 - Warning states
    info: '#2563EB', // Blue 600 - Info states
    
    // Code snippet colors
    codeText: '#334155', // Slate 700 - Main code text
    codeComment: '#94A3B8', // Slate 400 - Comments
    codeKeyword: '#7C3AED', // Violet 600 - Keywords
    codeString: '#059669', // Emerald 600 - Strings
    codeNumber: '#DC2626', // Red 600 - Numbers
    codeFunction: '#2563EB', // Blue 600 - Functions
    codeVariable: '#0F172A', // Slate 900 - Variables
    codeOperator: '#64748B', // Slate 500 - Operators
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
    xl: '2rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)'
  }
};

export const darkTheme: DefaultTheme = {
  colors: {
    // Primary colors
    primary: '#3B82F6', // Blue 500 - Brighter for dark mode
    secondary: '#94A3B8', // Slate 400 - Muted secondary text
    background: '#0F172A', // Slate 900 - Deep dark blue
    sidebar: '#1E293B', // Slate 800 - Slightly lighter than background
    text: '#F8FAFC', // Slate 50 - Off-white for better readability
    
    // UI Element colors
    codeBackground: '#1E293B', // Slate 800 - Dark gray for code blocks
    border: '#334155', // Slate 700 - Darker borders
    practiceBackground: '#1E293B', // Slate 800 - Dark background for practice
    problemBackground: '#334155', // Slate 700 - Slightly lighter for problems
    solutionBackground: '#1E293B', // Slate 800 - Dark background for solutions
    
    // Status colors
    success: '#10B981', // Emerald 500 - Success states
    error: '#EF4444', // Red 500 - Error states
    warning: '#F59E0B', // Amber 500 - Warning states
    info: '#3B82F6', // Blue 500 - Info states
    
    // Code snippet colors
    codeText: '#E2E8F0', // Slate 200 - Light text for dark mode
    codeComment: '#64748B', // Slate 500 - Muted comments
    codeKeyword: '#A78BFA', // Violet 400 - Brighter keywords
    codeString: '#34D399', // Emerald 400 - Brighter strings
    codeNumber: '#F87171', // Red 400 - Brighter numbers
    codeFunction: '#60A5FA', // Blue 400 - Brighter functions
    codeVariable: '#F8FAFC', // Slate 50 - Light variables
    codeOperator: '#94A3B8', // Slate 400 - Muted operators
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
    xl: '2rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.4)'
  }
}; 