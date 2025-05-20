import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, this would fetch data from your database
  const stats = {
    totalCourses: 12,
    completedCourses: 4,
    inProgressCourses: 3,
    totalHours: 45,
  };

  return NextResponse.json(stats);
}
