import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId:
        process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const auth = getAuth();
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
          const userRecord = await auth.getUserByEmail(credentials.email);

          // Get additional user data from Firestore
          const userDoc = await db.collection('users').doc(userRecord.uid).get();
          const userData = userDoc.data();

          if (!userData?.emailVerified) {
            throw new Error('Please verify your email before logging in');
          }

          // Verify the password using Firebase Admin SDK
          try {
            await auth.verifyIdToken(await auth.createCustomToken(userRecord.uid));
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
            progress: userData.progress || {},
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
        token.role = user.role;
        token.progress = user.progress;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.progress = token.progress;
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
