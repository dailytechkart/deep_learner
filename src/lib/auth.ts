import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth, db } from './firebase';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updatePassword as firebaseUpdatePassword,
} from 'firebase/auth';
import { adminAuth } from './firebase-admin';

export type AuthUser = User;

export async function getServerSession() {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return null;
  }

  try {
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
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export async function createSession() {
  try {
    // Get the current user's ID token
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user logged in');
    }

    const idToken = await user.getIdToken();

    // Call the session API to create a session cookie
    const response = await fetch('/api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to create session');
    }

    return true;
  } catch (error) {
    console.error('Error creating session:', error);
    return false;
  }
}

export async function signOut() {
  try {
    // Sign out from Firebase
    await auth.signOut();

    // Call the signout API to clear the session cookie
    await fetch('/api/auth/signout', {
      method: 'POST',
    });

    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    return false;
  }
}

export const getCurrentUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    // Get additional user data from Firestore if needed
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    return {
      ...user,
      ...userDoc.data(),
    };
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (newPassword: string) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    await firebaseUpdatePassword(user, newPassword);
  } catch (error) {
    throw error;
  }
};
