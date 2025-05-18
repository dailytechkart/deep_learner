import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getApp } from 'firebase/app';

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
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      // Get the token expiration time
      user.getIdTokenResult().then((idTokenResult) => {
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

export const getAuthToken = async (): Promise<{ token: string; user: User }> => {
  const auth = getAuth(getApp());
  const user = auth.currentUser;
  
  if (!user) {
    throw new Error('No authenticated user');
  }

  try {
    const token = await user.getIdToken(true);
    return { token, user };
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw error;
  }
}; 