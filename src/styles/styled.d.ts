import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      backgroundAlt: string;
      text: string;
      textSecondary: string;
      border: string;
      primary: string;
      secondary: string;
      accent: string;
      success: string;
      error: string;
      warning: string;
      info: string;
      code: {
        background: string;
        text: string;
      };
      card: {
        background: string;
        border: string;
        hover: string;
      };
      badge: {
        premium: {
          background: string;
          text: string;
        };
        difficulty: {
          easy: {
            background: string;
            text: string;
          };
          medium: {
            background: string;
            text: string;
          };
          hard: {
            background: string;
            text: string;
          };
        };
      };
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    typography: {
      fontFamily: string;
      fontSize: {
        small: string;
        medium: string;
        large: string;
        xlarge: string;
        xxlarge: string;
      };
      lineHeight: {
        tight: number;
        normal: number;
        loose: number;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
    };
  }
} 