import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { passkey } = await request.json();
    
    if (passkey !== process.env.ADMIN_PASSKEY) {
      return NextResponse.json(
        { error: 'Invalid passkey' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { authorized: true },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    const response = NextResponse.json({ token });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 