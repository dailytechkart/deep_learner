import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/auth/callback',
  '/api',
];

// List of protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/practice',
  '/learn',
  '/interview',
  '/courses',
  '/system-design',
];

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    // Refresh session if expired - required for Server Components
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    const { pathname } = req.nextUrl;

    // Debug logging
    console.log('Middleware - Path:', pathname);
    console.log('Middleware - Session:', !!session);
    console.log('Middleware - Error:', error);

    if (error) {
      console.error('Middleware auth error:', error);
      // If there's an auth error, redirect to login
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('from', req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check if the route is public or protected
    const isPublicRoute = publicRoutes.some(
      route => pathname === route || pathname.startsWith(route + '/')
    );
    const isProtectedRoute = protectedRoutes.some(
      route => pathname === route || pathname.startsWith(route + '/')
    );

    // Debug logging
    console.log('Middleware - Is Public Route:', isPublicRoute);
    console.log('Middleware - Is Protected Route:', isProtectedRoute);

    // If trying to access a public route while logged in, redirect to dashboard
    if (isPublicRoute && session && pathname !== '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Let the ProtectedRoute component handle client-side protection
    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    // If there's any error, redirect to login
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('from', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
