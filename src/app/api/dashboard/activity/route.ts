import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, this would fetch data from your database
  const activity = [
    { date: '2024-03-14', hours: 2 },
    { date: '2024-03-15', hours: 3 },
    { date: '2024-03-16', hours: 1 },
    { date: '2024-03-17', hours: 4 },
    { date: '2024-03-18', hours: 2 },
    { date: '2024-03-19', hours: 3 },
    { date: '2024-03-20', hours: 2 }
  ];

  return NextResponse.json(activity);
} 