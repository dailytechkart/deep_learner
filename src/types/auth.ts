import { User as FirebaseUser } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export interface CustomUser extends FirebaseUser {
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    premium?: boolean;
  };
}

export interface UserProfile {
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: string;
  createdAt: Timestamp;
  lastLogin: Timestamp;
  provider: string;
  isPremium: boolean;
}
