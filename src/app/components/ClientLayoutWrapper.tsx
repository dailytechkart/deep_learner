"use client";

import { AuthProvider } from '../context/AuthContext';
import { SearchProvider } from '../context/SearchContext';
import { ThemeProvider } from '../context/ThemeContext';
import ClientLayout from './ClientLayout';
import StyledComponentsRegistry from '../registry';
import ThemeSwitcher from './ThemeSwitcher';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <AuthProvider>
          <SearchProvider>
            <ThemeSwitcher>
              <ClientLayout>{children}</ClientLayout>
            </ThemeSwitcher>
          </SearchProvider>
        </AuthProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
} 