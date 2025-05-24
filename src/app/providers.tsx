'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import StyledComponentsRegistry from './registry';
import { createGlobalStyle, ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';

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
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <ThemeProvider>
          <ThemeWrapper>
            <AuthProvider>{children}</AuthProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </NextThemesProvider>
    </StyledComponentsRegistry>
  );
}
