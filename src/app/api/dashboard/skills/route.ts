import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, this would fetch data from your database
  const skills = [
    { name: 'HTML', value: 85 },
    { name: 'CSS', value: 75 },
    { name: 'JavaScript', value: 65 },
    { name: 'React', value: 55 },
    { name: 'TypeScript', value: 45 },
  ];

  return NextResponse.json(skills);
}
