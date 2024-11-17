import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Message from '@/models/Message';

export async function GET() {
  try {
    await connectDB();
    const messages = await Message.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const message = await Message.create(data);
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
} 