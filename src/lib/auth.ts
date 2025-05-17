import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminAuth } from './firebaseAdmin';

export async function getServerSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return null;
  }

  try {
    // Verify the token with Firebase Admin
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

export async function requireAuth() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }
  
  return session;
}

export async function requireGuest() {
  const session = await getServerSession();
  
  if (session) {
    redirect('/dashboard');
  }
  
  return null;
}

export async function getAuthRedirect(pathname: string) {
  const session = await getServerSession();
  
  // If user is logged in and trying to access auth pages
  if (session && ['/login', '/signup', '/forgot-password', '/reset-password'].includes(pathname)) {
    redirect('/dashboard');
  }
  
  // If user is not logged in and trying to access protected pages
  if (!session && ['/dashboard', '/profile', '/settings', '/practice', '/learn'].includes(pathname)) {
    const loginUrl = new URL('/login', process.env.NEXT_PUBLIC_APP_URL);
    loginUrl.searchParams.set('from', pathname);
    redirect(loginUrl.toString());
  }
  
  return session;
} 