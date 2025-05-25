'use server';

import { setCookie } from '../utils/cookies';

export async function setTheme(theme: 'light' | 'dark') {
  try {
    // Set both server and client cookies
    setCookie('theme', theme, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      httpOnly: false, // Allow client-side access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    // Also set a client-side cookie for immediate access
    const headers = new Headers();
    headers.append('Set-Cookie', `theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`);

    return { success: true };
  } catch (error) {
    console.error('Error setting theme:', error);
    return { success: false, error: 'Failed to set theme' };
  }
} 