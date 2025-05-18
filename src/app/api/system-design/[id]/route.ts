import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'src/app/system-design/problems', `${params.id}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(fileContent);

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error reading MDX file:', error);
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    );
  }
} 