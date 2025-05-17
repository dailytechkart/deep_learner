import { requireGuest } from '@/lib/auth';
import LoginClient from './LoginClient';

export default async function LoginPage() {
  // This will redirect if user is already logged in
  await requireGuest();

  return <LoginClient />;
} 