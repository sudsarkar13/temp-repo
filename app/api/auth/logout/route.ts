import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear the stored token
    (globalThis as any).currentAdminToken = null;

    // Create response
    const response = NextResponse.json({ success: true });
    
    // Clear the admin token cookie
    response.cookies.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0, // Expire immediately
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}