import { User as FirebaseUser } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

export interface CustomUser extends FirebaseUser {
  role?: string;
  user_metadata?: {
    avatar_url?: string;
    full_name?: string;
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
}
