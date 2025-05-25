'use client';

import React from 'react';
import LoginClient from './LoginClient';

// This tells Next.js that this page should be dynamically rendered
export const dynamic = 'force-dynamic';

// This tells Next.js that this page should not be cached
export const revalidate = 0;

export default function LoginPage() {
  return <LoginClient />;
}
