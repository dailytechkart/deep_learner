import { NextRequest, NextResponse } from 'next/server';
import { signInWithGoogle, signInWithGithub, signOutUser } from '@/app/services/auth';
import { AuthService } from '@/app/services/authService';

// POST /api/auth/google - Sign in with Google
export async function POST(request: Request) {
  try {
    const { provider } = await request.json();

    let result;
    switch (provider) {
      case 'google':
        result = await signInWithGoogle();
        break;
      case 'github':
        result = await signInWithGithub();
        break;
      default:
        return NextResponse.json({ error: 'Invalid provider' }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/auth - Sign out
export async function DELETE() {
  try {
    await signOutUser();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET /api/auth/me - Get current user
export async function GET() {
  try {
    const user = AuthService.getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
  }
}
