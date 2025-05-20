import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, this would fetch data from your database
  const courses = [
    {
      id: '1',
      title: 'HTML & CSS Fundamentals',
      progress: 75,
      lastAccessed: '2024-03-20T10:30:00Z',
    },
    {
      id: '2',
      title: 'JavaScript Mastery',
      progress: 45,
      lastAccessed: '2024-03-19T15:45:00Z',
    },
    {
      id: '3',
      title: 'React Development',
      progress: 30,
      lastAccessed: '2024-03-18T09:15:00Z',
    },
    {
      id: '4',
      title: 'TypeScript Integration',
      progress: 20,
      lastAccessed: '2024-03-17T14:20:00Z',
    },
  ];

  return NextResponse.json(courses);
}
