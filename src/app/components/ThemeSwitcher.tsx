'use client';

import { useTheme } from '../context/ThemeContext';
import { ThemeProviderWrapper } from './StyledComponents';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './StyledComponents';

export default function ThemeSwitcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useTheme();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
    </ThemeProvider>
  );
} 