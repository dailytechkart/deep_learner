import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

// Types
interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  premium: boolean;
  joinedAt: Timestamp;
  coursesEnrolled: string[];
  progress: { [key: string]: string[] };
}

// GET /api/user - Get all users
export async function GET() {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/user - Create a new user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, name, email, photoURL } = body;

    if (!uid || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const userData: User = {
      uid,
      name: name || '',
      email,
      photoURL: photoURL || '',
      premium: false,
      joinedAt: Timestamp.now(),
      coursesEnrolled: [],
      progress: {},
    };

    await setDoc(doc(db, 'users', uid), userData);

    return NextResponse.json(
      { message: 'User created successfully', user: userData },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// PUT /api/user/:uid - Update a user
export async function PUT(request: Request, { params }: { params: { uid: string } }) {
  try {
    const { uid } = params;
    const body = await request.json();

    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await updateDoc(userRef, body);

    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE /api/user/:uid - Delete a user
export async function DELETE(request: Request, { params }: { params: { uid: string } }) {
  try {
    const { uid } = params;
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await deleteDoc(userRef);

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
