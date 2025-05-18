'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const systemDesignProblems = [
  {
    id: 'chat-app',
    title: 'Chat Application (Messenger)',
    difficulty: 'Hard',
    timeEstimate: '60 minutes',
    category: 'System Design'
  },
  {
    id: 'url-shortener',
    title: 'URL Shortening Service',
    difficulty: 'Medium',
    timeEstimate: '45 minutes',
    category: 'System Design'
  }
];

export default function SystemDesignPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/system-design/problems/${systemDesignProblems[0].id}`);
  }, [router]);

  return null;
} 