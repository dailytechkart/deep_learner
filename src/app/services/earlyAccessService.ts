import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface EarlyAccessUser {
  email: string;
  phone: string;
  occupation: string;
  interests: string[];
  experience: string;
  goals: string;
  createdAt: Date;
}

export interface EarlyAccessResponse {
  success: boolean;
  error?: string;
  data?: DocumentData;
}

class EarlyAccessService {
  private collection = collection(db, 'earlyAccessUsers');

  private async isEmailExists(email: string): Promise<boolean> {
    const q = query(this.collection, where('email', '==', email.toLowerCase()));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  private async isPhoneExists(phone: string): Promise<boolean> {
    const q = query(this.collection, where('phone', '==', phone));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  async registerUser(userData: Omit<EarlyAccessUser, 'createdAt'>): Promise<EarlyAccessResponse> {
    try {
      // Check for existing email
      const emailExists = await this.isEmailExists(userData.email);
      if (emailExists) {
        return {
          success: false,
          error: 'EMAIL_EXISTS',
        };
      }

      // Check for existing phone
      const phoneExists = await this.isPhoneExists(userData.phone);
      if (phoneExists) {
        return {
          success: false,
          error: 'PHONE_EXISTS',
        };
      }

      // Add user with normalized email (lowercase)
      const docRef = await addDoc(this.collection, {
        ...userData,
        email: userData.email.toLowerCase(),
        createdAt: new Date(),
      });

      return {
        success: true,
        data: {
          id: docRef.id,
          ...userData,
          email: userData.email.toLowerCase(),
          createdAt: new Date(),
        },
      };
    } catch (error) {
      console.error('Error registering early access user:', error);
      return {
        success: false,
        error: 'UNKNOWN_ERROR',
      };
    }
  }

  async getAllUsers(): Promise<EarlyAccessUser[]> {
    try {
      const querySnapshot = await getDocs(this.collection);
      return querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        ...doc.data(),
        id: doc.id,
      })) as EarlyAccessUser[];
    } catch (error) {
      console.error('Error fetching early access users:', error);
      throw error;
    }
  }
}

export const earlyAccessService = new EarlyAccessService();
