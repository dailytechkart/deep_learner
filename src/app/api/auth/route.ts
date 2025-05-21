import { NextRequest, NextResponse } from 'next/server';
import { createSessionCookie, revokeSessionCookie } from '@/app/lib/server-auth';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: 'ID token is required' }, { status: 400 });
    }

    const sessionCookie = await createSessionCookie(idToken);

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          'Set-Cookie': `session=${sessionCookie}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 5}`,
        },
      }
    );
  } catch (error) {
    console.error('Error in auth POST:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}

export async function DELETE() {
  try {
    await revokeSessionCookie();

    return NextResponse.json(
      { success: true },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0',
        },
      }
    );
  } catch (error) {
    console.error('Error in auth DELETE:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}
