import { User as SupabaseUser, UserMetadata } from '@supabase/supabase-js';

export interface CustomUserMetadata extends UserMetadata {
  full_name?: string;
  avatar_url?: string;
}

export interface User extends Omit<SupabaseUser, 'user_metadata'> {
  role?: string;
  user_metadata?: CustomUserMetadata;
} 