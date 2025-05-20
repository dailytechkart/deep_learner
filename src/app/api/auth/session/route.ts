import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getServerSession } from '../../auth';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 400 });
    }

    // Set the token in an HTTP-only cookie
    cookies().set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    // Clear the auth token cookie
    cookies().delete('auth_token');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error clearing session:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'No active session' }, { status: 401 });
    }

    return NextResponse.json({
      user: session.user,
      message: 'Session is valid',
    });
  } catch (error: any) {
    console.error('Error getting session:', error);
    return NextResponse.json({ error: error.message || 'Failed to get session' }, { status: 500 });
  }
}
