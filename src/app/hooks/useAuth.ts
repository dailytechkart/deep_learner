import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthUser extends User {
  role?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(user, 'user');
  useEffect(() => {
    let mounted = true;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (mounted) {
          if (session?.user) {
            try {
              // Get user role from profiles table
              const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .maybeSingle();

              // If profile doesn't exist, create one with default role
              if (!profile) {
                const { error: insertError } = await supabase
                  .from('profiles')
                  .insert({
                    id: session.user.id,
                    role: 'user', // Default role
                    email: session.user.email,
                    created_at: new Date().toISOString(),
                  })
                  .select()
                  .single();

                if (insertError) {
                  console.error('Error creating profile:', insertError);
                }

                setUser({
                  ...session.user,
                  role: 'user', // Set default role
                });
              } else {
                setUser({
                  ...session.user,
                  role: profile.role,
                });
              }

              // If user is on login page and has a 'from' parameter, redirect them
              const from = searchParams.get('from');
              if (from && window.location.pathname === '/login') {
                router.replace(from);
              }
            } catch (err) {
              console.error('Error handling user profile:', err);
              // Still set the user even if profile handling fails
              setUser(session.user);
            }
          } else {
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Error getting initial session:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Authentication error');
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        if (session?.user) {
          try {
            // Get user role from profiles table
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .maybeSingle();

            // If profile doesn't exist, create one with default role
            if (!profile) {
              const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                  id: session.user.id,
                  role: 'user', // Default role
                  email: session.user.email,
                  created_at: new Date().toISOString(),
                })
                .select()
                .single();

              if (insertError) {
                console.error('Error creating profile:', insertError);
              }

              setUser({
                ...session.user,
                role: 'user', // Set default role
              });
            } else {
              setUser({
                ...session.user,
                role: profile.role,
              });
            }

            // If user is on login page and has a 'from' parameter, redirect them
            const from = searchParams.get('from');
            if (from && window.location.pathname === '/login') {
              router.replace(from);
            }
          } catch (err) {
            console.error('Error handling user profile:', err);
            // Still set the user even if profile handling fails
            setUser(session.user);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, searchParams]);

  const signInWithGithub = async () => {
    try {
      const from = searchParams.get('from') || '/';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(from)}`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('GitHub sign in error:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign in with GitHub');
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const from = searchParams.get('from') || '/';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(from)}`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign in with Google');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      router.replace('/login');
    } catch (err) {
      console.error('Error signing out:', err);
      setError(err instanceof Error ? err.message : 'Sign out failed');
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGithub,
    signInWithGoogle,
    signOut,
  };
}
