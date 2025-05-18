import { NextResponse } from 'next/server';
import { getServerSession } from '../auth';
import { practiceService } from '@/app/services/practiceService';
import { QuestionCategory, QuestionDifficulty } from '@/app/types/practice';

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { 
      question,
      options,
      correctAnswer,
      explanation,
      category,
      difficulty,
      points
    } = body;

    // Validate required fields
    if (!question || !options || !correctAnswer || !category || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate category
    if (!Object.values(QuestionCategory).includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Validate difficulty
    if (!Object.values(QuestionDifficulty).includes(difficulty)) {
      return NextResponse.json(
        { error: 'Invalid difficulty' },
        { status: 400 }
      );
    }

    // Create question
    const questionId = await practiceService.createQuestion({
      question,
      options,
      correctAnswer,
      explanation,
      category,
      difficulty,
      points: points || 10, // Default points if not provided
      createdBy: session.user.uid
    });

    return NextResponse.json({ 
      success: true, 
      questionId 
    });

  } catch (error: any) {
    console.error('Error creating question:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create question' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get category from query params
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as QuestionCategory;

    // Fetch questions
    const questions = category 
      ? await practiceService.getQuestionsByCategory(category)
      : await practiceService.getAllQuestions();

    return NextResponse.json({ questions });

  } catch (error: any) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch questions' },
      { status: 500 }
    );
  }
} 