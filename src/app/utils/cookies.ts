import { cookies } from 'next/headers';

export function getCookie(name: string): string | undefined {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value;
}

export function setCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  } = {}
) {
  const cookieStore = cookies();
  cookieStore.set(name, value, {
    maxAge: options.maxAge,
    path: options.path || '/',
    httpOnly: options.httpOnly ?? true,
    secure: options.secure ?? process.env.NODE_ENV === 'production',
    sameSite: options.sameSite || 'lax',
  });
}
