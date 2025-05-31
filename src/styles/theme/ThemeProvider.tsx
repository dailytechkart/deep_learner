import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { typography } from './typography';

const theme = {
  typography,
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};
