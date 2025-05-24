import { NextRequest, NextResponse } from 'next/server';
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'de',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Topic interface
interface Topic {
  id: string;
  title: string;
  content: string;
  category: string;
  examples?: string[];
  practice?: Array<{
    problem: string;
    solution: string;
  }>;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
  };
}

interface QueryResult {
  insertId: number;
  affectedRows: number;
}

// Topic model
const TopicModel = {
  async getAll(): Promise<Topic[]> {
    const [rows] = await pool.query('SELECT * FROM topics');
    return rows as Topic[];
  },

  async getById(id: string): Promise<Topic | null> {
    const [rows] = await pool.query('SELECT * FROM topics WHERE id = ?', [id]);
    return (rows as Topic[])[0] || null;
  },

  async getByCategory(category: string): Promise<Topic[]> {
    const [rows] = await pool.query('SELECT * FROM topics WHERE category = ?', [category]);
    return rows as Topic[];
  },

  async create(topic: Omit<Topic, 'id'>): Promise<Topic> {
    const [result] = await pool.query(
      'INSERT INTO topics (title, content, category, examples, practice, quiz) VALUES (?, ?, ?, ?, ?, ?)',
      [
        topic.title,
        topic.content,
        topic.category,
        JSON.stringify(topic.examples || []),
        JSON.stringify(topic.practice || []),
        JSON.stringify(topic.quiz || null),
      ]
    );
    return { id: (result as QueryResult).insertId.toString(), ...topic };
  },

  async update(id: string, topic: Partial<Topic>): Promise<boolean> {
    const [result] = await pool.query(
      'UPDATE topics SET title = ?, content = ?, category = ?, examples = ?, practice = ?, quiz = ? WHERE id = ?',
      [
        topic.title,
        topic.content,
        topic.category,
        JSON.stringify(topic.examples || []),
        JSON.stringify(topic.practice || []),
        JSON.stringify(topic.quiz || null),
        id,
      ]
    );
    return (result as QueryResult).affectedRows > 0;
  },

  async delete(id: string): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM topics WHERE id = ?', [id]);
    return (result as QueryResult).affectedRows > 0;
  },
};

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// API Routes
export async function GET(request: NextRequest) {
  const path = request.nextUrl.pathname.replace('/api', '');

  try {
    if (path === '/topics') {
      const topics = await TopicModel.getAll();
      return NextResponse.json(topics);
    }

    if (path.match(/^\/topics\/\d+$/)) {
      const id = path.split('/').pop();
      const topic = await TopicModel.getById(id!);
      if (!topic) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
      }
      return NextResponse.json(topic);
    }

    if (path.match(/^\/topics\/category\/\w+$/)) {
      const category = path.split('/').pop();
      const topics = await TopicModel.getByCategory(category!);
      return NextResponse.json(topics);
    }

    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const path = request.nextUrl.pathname.replace('/api', '');

  if (path === '/topics') {
    try {
      const body = await request.json();
      const topic = await TopicModel.create(body);
      return NextResponse.json(topic, { status: 201 });
    } catch (_error) {
      return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(request: NextRequest) {
  const path = request.nextUrl.pathname.replace('/api', '');

  if (path.match(/^\/topics\/\d+$/)) {
    try {
      const id = path.split('/').pop();
      const body = await request.json();
      const success = await TopicModel.update(id!, body);
      if (!success) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Topic updated successfully' });
    } catch (_error) {
      return NextResponse.json({ error: 'Failed to update topic' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function DELETE(request: NextRequest) {
  const path = request.nextUrl.pathname.replace('/api', '');

  if (path.match(/^\/topics\/\d+$/)) {
    try {
      const id = path.split('/').pop();
      const success = await TopicModel.delete(id!);
      if (!success) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
      }
      return NextResponse.json({ message: 'Topic deleted successfully' });
    } catch (_error) {
      return NextResponse.json({ error: 'Failed to delete topic' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
