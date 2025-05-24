'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { CustomUser, UserProfile } from '@/types/auth';

interface AuthContextType {
  user: CustomUser | null;
  loading: boolean;
  error: string | null;
  signInWithGithub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Handle auth state changes and redirections
  useEffect(() => {
    console.log('Setting up auth state listener');
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'No user');
      try {
        if (firebaseUser) {
          console.log('User details:', {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            provider: firebaseUser.providerData[0]?.providerId,
            isAnonymous: firebaseUser.isAnonymous,
            emailVerified: firebaseUser.emailVerified,
            metadata: {
              creationTime: firebaseUser.metadata.creationTime,
              lastSignInTime: firebaseUser.metadata.lastSignInTime,
            },
          });

          // Get user role from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data() as UserProfile | undefined;

          console.log('User data from Firestore:', userData);

          if (!userData) {
            console.log('No user data found in Firestore, creating new profile');
            await createUserProfile(firebaseUser);
          } else {
            // Update last login timestamp
            await setDoc(
              doc(db, 'users', firebaseUser.uid),
              {
                lastLogin: serverTimestamp(),
              },
              { merge: true }
            );
            console.log('Updated last login timestamp');
          }

          setUser({
            ...firebaseUser,
            role: userData?.role || 'user',
          } as CustomUser);

          // Get the ID token and set it in a cookie
          const idToken = await firebaseUser.getIdToken();
          document.cookie = `auth-token=${idToken}; path=/; max-age=3600; secure; samesite=strict`;

          // Redirect to dashboard if on login page
          if (pathname === '/login') {
            console.log('Redirecting to dashboard');
            router.push('/dashboard');
          }
        } else {
          console.log('No user, clearing state');
          setUser(null);
          // Clear the auth token cookie
          document.cookie = 'auth-token=; path=/; max-age=0; secure; samesite=strict';
          // Redirect to login if on protected route
          if (pathname.startsWith('/dashboard')) {
            console.log('Redirecting to login');
            router.push('/login');
          }
        }
      } catch (err) {
        console.error('Error in auth state change:', err);
        setError(err instanceof Error ? err.message : 'Authentication error occurred');
      } finally {
        setLoading(false);
      }
    });

    return () => {
      console.log('Cleaning up auth state listener');
      unsubscribe();
    };
  }, [pathname, router]);

  const createUserProfile = async (user: FirebaseUser): Promise<void> => {
    console.log('Creating/updating user profile for:', user.uid);
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.log('Creating new user profile');
      // Create new user profile
      const userProfile: Omit<UserProfile, 'createdAt' | 'lastLogin'> = {
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        role: 'user',
        provider: user.providerData[0]?.providerId || 'unknown',
      };

      await setDoc(userRef, {
        ...userProfile,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
      console.log('New user profile created');
    } else {
      console.log('Updating existing user profile');
      // Update existing user profile
      await setDoc(
        userRef,
        {
          lastLogin: serverTimestamp(),
          displayName: user.displayName || userDoc.data().displayName,
          photoURL: user.photoURL || userDoc.data().photoURL,
        },
        { merge: true }
      );
      console.log('User profile updated');
    }
  };

  const signInWithGithub = async () => {
    try {
      console.log('Starting GitHub sign in');
      setError(null);
      setLoading(true);

      const provider = new GithubAuthProvider();
      provider.addScope('read:user');
      provider.addScope('user:email');

      // Set custom parameters for GitHub authentication
      const callbackUrl = process.env.NEXT_PUBLIC_FIREBASE_GITHUB_CALLBACK_URL;
      console.log('GitHub callback URL:', callbackUrl);

      if (!callbackUrl) {
        throw new Error('GitHub callback URL is not configured');
      }

      provider.setCustomParameters({
        redirect_uri: callbackUrl,
      });

      console.log('Initiating GitHub sign in popup');
      const result = await signInWithPopup(auth, provider);
      console.log('GitHub sign in successful');

      await createUserProfile(result.user);
      console.log('User profile created/updated after GitHub sign in');

      // Force navigation to dashboard after successful login
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      console.error('GitHub sign in error:', error);
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('Starting Google sign in');
      setError(null);
      setLoading(true);

      const provider = new GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      console.log('Initiating Google sign in popup');
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign in successful');

      await createUserProfile(result.user);
      console.log('User profile created/updated after Google sign in');

      // Force navigation to dashboard after successful login
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      console.error('Google sign in error:', error);
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error: any) => {
    console.error('Auth error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack,
    });

    if (error.code === 'auth/account-exists-with-different-credential') {
      setError(
        'An account already exists with the same email address but different sign-in credentials.'
      );
    } else if (error.code === 'auth/popup-closed-by-user') {
      setError('Sign-in popup was closed before completing the sign-in.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      setError('Multiple popup requests were made. Only the latest one will be processed.');
    } else if (error.code === 'auth/popup-blocked') {
      setError('The popup was blocked by the browser. Please allow popups for this site.');
    } else if (error.code === 'auth/network-request-failed') {
      setError('Network error occurred. Please check your internet connection.');
    } else if (error.code === 'auth/too-many-requests') {
      setError('Too many unsuccessful login attempts. Please try again later.');
    } else {
      setError(error.message || 'Failed to sign in. Please try again.');
    }
  };

  const signOut = async () => {
    try {
      console.log('Starting sign out');
      setLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
      console.log('Sign out successful, redirecting to login');
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Starting logout');
      setLoading(true);
      await firebaseSignOut(auth);
      console.log('Logout successful, redirecting to home');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error instanceof Error ? error.message : 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signInWithGithub,
        signInWithGoogle,
        signOut,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
