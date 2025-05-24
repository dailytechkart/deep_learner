import { User as FirebaseUser } from 'firebase/auth';

export interface User extends FirebaseUser {
  role?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
  created_at: string;
  updated_at: string;
}
