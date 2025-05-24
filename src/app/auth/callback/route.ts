import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { auth } from '@/app/lib/firebase/config';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const next = requestUrl.searchParams.get('next') || '/';
    const error = requestUrl.searchParams.get('error');
    const errorDescription = requestUrl.searchParams.get('error_description');

    if (error) {
      console.error('Auth error:', error, errorDescription);
      return NextResponse.redirect(
        new URL(
          `/login?error=${encodeURIComponent(errorDescription || 'Authentication failed')}`,
          requestUrl.origin
        )
      );
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(new URL(next, requestUrl.origin));
  } catch (error) {
    console.error('Auth callback error:', error);
    return NextResponse.redirect(new URL('/login?error=An unexpected error occurred', request.url));
  }
}
