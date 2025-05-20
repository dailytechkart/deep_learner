import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { cookies } from 'next/headers';
import { auth as adminAuth } from './firebase-admin';

let tokenRefreshTimeout: NodeJS.Timeout | null = null;

export const setupTokenRefresh = () => {
  const auth = getAuth(getApp());

  const refreshToken = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.getIdToken(true); // Force refresh the token
        console.log('Token refreshed successfully');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  // Clear any existing timeout
  if (tokenRefreshTimeout) {
    clearTimeout(tokenRefreshTimeout);
  }

  // Set up auth state listener
  const unsubscribe = onAuthStateChanged(auth, user => {
    if (user) {
      // Get the token expiration time
      user.getIdTokenResult().then(idTokenResult => {
        const expirationTime = idTokenResult.expirationTime;
        const currentTime = new Date().getTime();
        const timeUntilExpiration = new Date(expirationTime).getTime() - currentTime;

        // Refresh token 5 minutes before expiration
        const refreshTime = Math.max(0, timeUntilExpiration - 5 * 60 * 1000);

        tokenRefreshTimeout = setTimeout(() => {
          refreshToken();
        }, refreshTime);
      });
    }
  });

  // Return cleanup function
  return () => {
    if (tokenRefreshTimeout) {
      clearTimeout(tokenRefreshTimeout);
    }
    unsubscribe();
  };
};

export const getAuthToken = async () => {
  const auth = getAuth(getApp());
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No authenticated user');
  }

  try {
    return await user.getIdToken(true);
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw error;
  }
};

// Server-side authentication functions
export const getServerSession = async () => {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return null;
    }

    try {
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
      return decodedClaims;
    } catch (error: any) {
      if (error.code === 'auth/id-token-expired') {
        // Token expired, try to refresh
        const newToken = await refreshServerToken();
        if (newToken) {
          return await adminAuth.verifySessionCookie(newToken, true);
        }
      }
      throw error;
    }
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
};

const refreshServerToken = async () => {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return null;
    }

    // Exchange refresh token for new session token
    const newSessionToken = await adminAuth.createSessionCookie(refreshToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
    });

    // Update the session cookie
    cookieStore.set('session', newSessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 5, // 5 days
    });

    return newSessionToken;
  } catch (error) {
    console.error('Error refreshing server token:', error);
    return null;
  }
};

export const requireAuth = async () => {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Authentication required');
  }

  return session;
};
