'use client';

import ClientLayout from './ClientLayout';
import StyledComponentsRegistry from '../registry';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ClientLayout>{children}</ClientLayout>
    </StyledComponentsRegistry>
  );
}
