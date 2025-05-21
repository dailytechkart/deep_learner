import { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { setupTokenRefresh } from '../lib/client-auth';

export interface User {
  uid: string;
  email: string | null;
  emailVerified: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const auth = getAuth(getApp());
    const unsubscribe = setupTokenRefresh();

    const authListener = auth.onAuthStateChanged(
      user => {
        if (user) {
          setUser({
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      error => {
        console.error('Auth state change error:', error);
        setError(error as Error);
        setLoading(false);
      }
    );

    return () => {
      authListener();
      unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const auth = getAuth(getApp());
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error as Error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setError(null);
      const auth = getAuth(getApp());
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      setError(error as Error);
      throw error;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    logout,
  };
}
