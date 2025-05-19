import { requireAuth } from '@/lib/auth';
import AuthenticatedLayout from '../components/AuthenticatedLayout';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will redirect if user is not logged in
  await requireAuth();

  return (
    <AuthenticatedLayout>
      {children}
    </AuthenticatedLayout>
  );
} 