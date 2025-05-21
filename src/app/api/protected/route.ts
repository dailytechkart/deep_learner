import { NextRequest, NextResponse } from 'next/server';
import { withAuth, ServerSession, requireAuth } from '@/app/lib/server-auth';

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth(request);
    const { uid, email, role } = session;

    // Your protected API logic here
    const data = {
      message: 'This is a protected API route',
      user: {
        uid,
        email,
        role,
      },
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in protected GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(request);
    const { uid } = session;
    const body = await request.json();

    // Your protected API logic here
    const data = {
      message: 'Data processed successfully',
      userId: uid,
      receivedData: body,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in protected POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
