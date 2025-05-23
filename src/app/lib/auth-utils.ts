import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

export type AuthUser = User;

export async function getServerSession() {
  const supabase = createServerComponentClient({ cookies });
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error || !session) {
      return null;
    }

    // Get user role from profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    return {
      user: {
        ...session.user,
        role: profile?.role,
      },
    };
  } catch (error) {
    console.error('Error getting session:', error);
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

export async function getAuthRedirect(pathname: string) {
  const session = await getServerSession();

  // If user is logged in and trying to access auth pages
  if (session && ['/login', '/signup', '/forgot-password', '/reset-password'].includes(pathname)) {
    redirect('/dashboard');
  }

  // If user is not logged in and trying to access protected pages
  if (
    !session &&
    [
      '/dashboard',
      '/profile',
      '/settings',
      '/practice',
      '/learn',
      '/interview',
      '/courses',
      '/system-design',
      '/blog',
      '/about',
      '/contact',
      '/help',
      '/faq',
      '/terms',
      '/privacy',
    ].includes(pathname)
  ) {
    const loginUrl = new URL('/login', process.env.NEXT_PUBLIC_APP_URL);
    loginUrl.searchParams.set('from', pathname);
    redirect(loginUrl.toString());
  }

  return session;
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
}; 