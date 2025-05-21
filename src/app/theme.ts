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
      backgroundHover: string;
      sidebar: string;
      text: string;
      textSecondary: string;

      // UI Element colors
      border: string;
      borderLight: string;
      practiceBackground: string;
      problemBackground: string;
      solutionBackground: string;

      // Status colors
      status: {
        success: string;
        error: string;
        warning: string;
        info: string;
      };

      // Code snippet colors
      code: {
        background: string;
        text: string;
        comment: string;
        keyword: string;
        string: string;
        function: string;
        variable: string;
        number: string;
        operator: string;
      };

      // Accent colors
      accent1: string;
      accent2: string;
      accent3: string;
      accent4: string;
      accent5: string;
      accent6: string;
      accent7: string;
      accent8: string;

      // Gradient colors
      gradient1: string;
      gradient2: string;
      gradient3: string;
      gradient4: string;

      // System Design specific colors
      systemDesign: {
        architecture: string;
        patterns: string;
        scalability: string;
        security: string;
        performance: string;
        reliability: string;
        microservices: string;
        cloud: string;
      };
    };
    fonts: {
      body: string;
      heading: string;
      code: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
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

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#20c997',
    primaryDark: '#357abd',
    secondary: '#666666',
    background: '#ffffff',
    backgroundAlt: '#f5f5f5',
    backgroundHover: '#f0f0f0',
    sidebar: '#f5f5f5',
    text: '#1e1e1e',
    textSecondary: '#666666',
    border: '#e0e0e0',
    borderLight: '#e0e0e0',
    practiceBackground: '#ffffff',
    problemBackground: '#ffffff',
    solutionBackground: '#ffffff',
    status: {
      success: '#2ECC71',
      error: '#E74C3C',
      warning: '#F1C40F',
      info: '#3498DB',
    },
    code: {
      background: '#f8f8f8',
      text: '#333333',
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

export const darkTheme: DefaultTheme = {
  colors: {
    primary: '#20c997',
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
      success: '#2ECC71',
      error: '#E74C3C',
      warning: '#F1C40F',
      info: '#3498DB',
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
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
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
