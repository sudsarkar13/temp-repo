import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { randomBytes, createHash } from 'crypto';

export async function POST(request: Request) {
  try {
    const { passkey } = await request.json();
    
    if (passkey === process.env.ADMIN_PASSKEY) {
      // Generate a random session token
      const sessionToken = randomBytes(32).toString('hex');
      
      // Hash the token before storing it
      const hashedToken = createHash('sha256')
        .update(sessionToken)
        .digest('hex');
      
      // Store hashed token in cookie
      cookies().set('admin_token', hashedToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      // Store the hashed token in environment variable for middleware comparison
      process.env.CURRENT_ADMIN_TOKEN = hashedToken;

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Invalid passkey' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}