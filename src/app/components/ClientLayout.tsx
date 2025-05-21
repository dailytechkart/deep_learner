'use client';

import { useTheme } from '../context/ThemeContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
