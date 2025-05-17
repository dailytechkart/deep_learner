'use client';

import { AuthProvider } from './context/AuthContext';
import ThemeWrapper from './components/ThemeWrapper';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeWrapper>
      <AuthProvider>{children}</AuthProvider>
    </ThemeWrapper>
  );
} 