import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { cookies } from 'next/headers';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from './firebase-admin';

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
      const adminAuth = getAdminAuth(adminApp);
      const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
      return decodedClaims;
    } catch (error: any) {
      if (error.code === 'auth/id-token-expired') {
        // Token expired, try to refresh
        const newToken = await refreshServerToken();
        if (newToken) {
          const adminAuth = getAdminAuth(adminApp);
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

    const adminAuth = getAdminAuth(adminApp);
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

const adminAuth = getAdminAuth(adminApp);
const db = getFirestore();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        try {
          // Get user from Firebase Auth
          const userRecord = await adminAuth.getUserByEmail(credentials.email);

          // Get additional user data from Firestore
          const userDoc = await db.collection('users').doc(userRecord.uid).get();
          const userData = userDoc.data();

          if (!userData?.emailVerified) {
            throw new Error('Please verify your email before logging in');
          }

          // Verify the password using Firebase Admin SDK
          try {
            await adminAuth.verifyIdToken(await adminAuth.createCustomToken(userRecord.uid));
          } catch (error) {
            throw new Error('Invalid password');
          }

          // Update last login in Firestore
          await db.collection('users').doc(userRecord.uid).update({
            lastLogin: new Date(),
          });

          return {
            id: userRecord.uid,
            email: userRecord.email || '',
            name: userData.name || '',
            role: userData.role || 'user',
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
