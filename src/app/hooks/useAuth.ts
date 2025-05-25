import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, db } from '../lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import {
  signIn,
  signUp,
  signInWithGoogle,
  signInWithGithub,
  signOutUser,
  resetPassword,
  updateUserProfile,
  SignUpData,
  AuthError,
} from '../services/auth';

export interface UserWithPremium extends User {
  isPremium?: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<UserWithPremium | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserPremiumStatus = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData.premium || false;
      }
      return false;
    } catch (error) {
      console.error('Error fetching premium status:', error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const isPremium = await fetchUserPremiumStatus(user.uid);
        setUser({ ...user, isPremium });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthError = (error: AuthError) => {
    setError(error.message);
    setLoading(false);
    throw error;
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await signIn(email, password);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleSignUp = async (data: SignUpData) => {
    try {
      setLoading(true);
      setError(null);
      await signUp(data);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGoogle();
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await signInWithGithub();
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await signOutUser();
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handlePasswordReset = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await resetPassword(email);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const handleUpdateProfile = async (data: { displayName?: string; photoURL?: string }) => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      await updateUserProfile(user, data);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  return {
    user,
    loading,
    error,
    isPremium: user?.isPremium || false,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signInWithGoogle: handleGoogleSignIn,
    signInWithGithub: handleGithubSignIn,
    signOut: handleSignOut,
    resetPassword: handlePasswordReset,
    updateProfile: handleUpdateProfile,
  };
};
