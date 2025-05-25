import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase/config';

// Types
export interface AuthError {
  code: string;
  message: string;
}

export interface SignUpData {
  email: string;
  password: string;
  displayName?: string;
}

export interface UserData {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isPremium: boolean;
  role: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}

// Create or update user data in Firestore
const createUserData = async (user: User, data: Partial<UserData>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Create new user document
      const userData: UserData = {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || undefined,
        photoURL: user.photoURL || undefined,
        isPremium: false, // Default to false for new users
        role: 'user', // Default role
        provider: user.providerData[0]?.providerId || 'email',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        ...data,
      };
      await setDoc(userRef, userData);
    } else {
      // Update existing user document
      const updateData = {
        ...data,
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(userRef, updateData, { merge: true });
    }
  } catch (error: any) {
    console.error('Error creating/updating user data:', error);
    throw {
      code: 'auth/user-data-error',
      message: 'Failed to create/update user data',
    };
  }
};

// Email/Password Sign Up
export const signUp = async (data: SignUpData): Promise<UserCredential> => {
  try {
    const { email, password, displayName } = data;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update profile if displayName is provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }

    // Create user data in Firestore
    await createUserData(userCredential.user, {
      displayName,
      isPremium: false,
    });

    return userCredential;
  } catch (error: any) {
    throw {
      code: error.code,
      message: getAuthErrorMessage(error.code),
    };
  }
};

// Email/Password Sign In
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw {
      code: error.code,
      message: getAuthErrorMessage(error.code),
    };
  }
};

// Google Sign In
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    const userCredential = await signInWithPopup(auth, provider);

    // Create or update user data in Firestore
    await createUserData(userCredential.user, {
      displayName: userCredential.user.displayName || undefined,
      photoURL: userCredential.user.photoURL || undefined,
    });

    return userCredential;
  } catch (error: any) {
    throw {
      code: error.code,
      message: getAuthErrorMessage(error.code),
    };
  }
};

// GitHub Sign In
export const signInWithGithub = async (): Promise<UserCredential> => {
  try {
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    const userCredential = await signInWithPopup(auth, provider);

    // Create or update user data in Firestore
    await createUserData(userCredential.user, {
      displayName: userCredential.user.displayName || undefined,
      photoURL: userCredential.user.photoURL || undefined,
    });

    return userCredential;
  } catch (error: any) {
    throw {
      code: error.code,
      message: getAuthErrorMessage(error.code),
    };
  }
};

// Sign Out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw {
      code: error.code,
      message: getAuthErrorMessage(error.code),
    };
  }
};

// Password Reset
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw {
      code: error.code,
      message: getAuthErrorMessage(error.code),
    };
  }
};

// Update User Profile
export const updateUserProfile = async (
  user: User,
  data: { displayName?: string; photoURL?: string }
): Promise<void> => {
  try {
    await updateProfile(user, data);
  } catch (error: any) {
    throw {
      code: error.code,
      message: getAuthErrorMessage(error.code),
    };
  }
};

// Update Premium Status
export const updatePremiumStatus = async (userId: string, isPremium: boolean): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(
      userRef,
      {
        isPremium,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error: any) {
    console.error('Error updating premium status:', error);
    throw {
      code: 'auth/premium-update-error',
      message: 'Failed to update premium status',
    };
  }
};

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please use a different email or sign in.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed. Please try again.';
    case 'auth/popup-blocked':
      return 'Pop-up was blocked by your browser. Please allow pop-ups for this site.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was cancelled. Please try again.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address but different sign-in credentials.';
    default:
      return 'An error occurred. Please try again.';
  }
};
