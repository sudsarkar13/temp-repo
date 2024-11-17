import { NextResponse } from 'next/server';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_NAME = 'admin_token';

export async function POST(request: Request) {
  try {
    const { passkey } = await request.json();

    if (passkey !== process.env.ADMIN_PASSKEY) {
      return NextResponse.json(
        { error: 'Invalid passkey' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = sign(
      { authorized: true },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create response
    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );

    // Set cookie with proper options
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
} 