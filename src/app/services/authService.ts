import { User } from 'firebase/auth';
import { auth } from '../lib/firebase/config';
import { signInWithGoogle, signInWithGithub, signOutUser } from './auth';

export class AuthService {
  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  static async signInWithGoogle() {
    return signInWithGoogle();
  }

  static async signInWithGithub() {
    return signInWithGithub();
  }

  static async signOut() {
    return signOutUser();
  }
}
