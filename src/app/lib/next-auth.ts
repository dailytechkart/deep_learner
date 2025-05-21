import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from './firebase-admin';

const auth = getAuth(adminApp);
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
