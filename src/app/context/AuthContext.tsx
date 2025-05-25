'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  created_at: Timestamp;
  last_login: Timestamp;
  premium: boolean;
  premium_activated_at?: Timestamp;
  premium_expires_at?: Timestamp;
}

interface AuthContextType {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async user => {
      try {
        if (user) {
          setUser(user);

          // Get or create user profile
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            // Update last login
            await updateDoc(userRef, {
              last_login: serverTimestamp(),
            });
            console.log('Updated last login timestamp');

            // Get updated profile
            const updatedDoc = await getDoc(userRef);
            setProfile(updatedDoc.data() as UserProfile);
          } else {
            // Create new profile
            const newProfile: UserProfile = {
              id: user.uid,
              email: user.email || '',
              full_name: user.displayName || '',
              created_at: Timestamp.now(),
              last_login: Timestamp.now(),
              premium: false,
            };

            await setDoc(userRef, newProfile);
            setProfile(newProfile);
          }

          // Get the ID token and set it in a cookie
          const idToken = await user.getIdToken();
          document.cookie = `auth-token=${idToken}; path=/; max-age=3600; secure; samesite=strict`;
        } else {
          setUser(null);
          setProfile(null);
          // Clear the auth token cookie
          document.cookie =
            'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict';
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign in');
      throw error;
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setError(null);
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update display name
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      // Create user profile
      const userRef = doc(db, 'users', userCredential.user.uid);
      const newProfile: UserProfile = {
        id: userCredential.user.uid,
        email: email,
        full_name: fullName,
        created_at: Timestamp.now(),
        last_login: Timestamp.now(),
        premium: false,
      };

      await setDoc(userRef, newProfile);
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign up error:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign up');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const auth = getAuth();
      await firebaseSignOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign out');
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Reset password error:', error);
      setError(error instanceof Error ? error.message : 'Failed to reset password');
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
