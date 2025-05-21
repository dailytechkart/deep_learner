import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent1: string;
      accent2: string;
      background: string;
      backgroundAlt: string;
      backgroundHover: string;
      text: string;
      textSecondary: string;
      border: string;
      systemDesign: {
        architecture: string;
        patterns: string;
        scalability: string;
        security: string;
        performance: string;
        reliability: string;
        maintainability: string;
      };
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
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fonts: {
      body: string;
      heading: string;
      monospace: string;
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
