'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider } from './context/ThemeContext';
import { lightTheme, darkTheme } from './theme';
import { useTheme } from './context/ThemeContext';
import { createGlobalStyle } from 'styled-components';
import StyledComponentsRegistry from './registry';

const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: light dark;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <ThemeWrapper>
          <SessionProvider>{children}</SessionProvider>
        </ThemeWrapper>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}
