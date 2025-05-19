import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      secondary: string;
      background: string;
      backgroundAlt: string;
      backgroundHover: string;
      sidebar: string;
      text: string;
      textSecondary: string;
      codeBackground: string;
      border: string;
      borderLight: string;
      practiceBackground: string;
      problemBackground: string;
      solutionBackground: string;
      success: string;
      error: string;
      warning: string;
      info: string;
      codeKeyword: string;
      codeString: string;
      codeComment: string;
      codeFunction: string;
      codeVariable: string;
      codeOperator: string;
      codeText: string;
      codeNumber: string;
    };
    fonts: {
      body: string;
      heading: string;
      code: string;
    };
    typography: {
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
      };
      fontWeight: {
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      h1: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      h2: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      h3: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      h4: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      h5: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      h6: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      body1: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      body2: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      caption: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
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
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
} 