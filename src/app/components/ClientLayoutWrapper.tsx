"use client";

import { AuthProvider } from '../context/AuthContext';
import { SearchProvider } from '../context/SearchContext';
import { ThemeProvider } from '../context/ThemeContext';
import ClientLayout from './ClientLayout';
import StyledComponentsRegistry from '../registry';
import ThemeWrapper from './ThemeWrapper';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <ThemeWrapper>
          <AuthProvider>
            <SearchProvider>
              <ClientLayout>{children}</ClientLayout>
            </SearchProvider>
          </AuthProvider>
        </ThemeWrapper>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
} 