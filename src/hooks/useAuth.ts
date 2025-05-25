import { useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { app } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        setAuthState({
          user,
          loading: false,
          error: null,
        });
      },
      error => {
        setAuthState({
          user: null,
          loading: false,
          error: error.message,
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.message,
      }));
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.message,
      }));
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const auth = getAuth(app);
      await firebaseSignOut(auth);
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.message,
      }));
      throw error;
    }
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    signIn,
    signUp,
    signOut,
  };
};
