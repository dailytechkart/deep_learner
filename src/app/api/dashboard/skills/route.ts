import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminAuth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { NextRequest } from 'next/server';

async function requireAuth(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const adminAuth = getAdminAuth();
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Invalid token');
  }
}

export async function GET(request: NextRequest) {
  try {
    const decodedToken = await requireAuth(request);
    const userId = decodedToken.uid;

    // Get user's skills
    const skillsQuery = query(collection(db, 'user_skills'), where('user_id', '==', userId));

    const skillsSnapshot = await getDocs(skillsQuery);
    const skills = skillsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        name: data.name,
        value: data.proficiency || 0,
      };
    });

    // If no skills found, return default skills
    if (skills.length === 0) {
      return NextResponse.json([
        { name: 'HTML', value: 0 },
        { name: 'CSS', value: 0 },
        { name: 'JavaScript', value: 0 },
        { name: 'React', value: 0 },
        { name: 'TypeScript', value: 0 },
      ]);
    }

    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}
