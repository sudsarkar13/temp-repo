import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear the admin token cookie
    cookies().delete('admin_token');
    
    // Clear the stored token
    process.env.CURRENT_ADMIN_TOKEN = '';

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' },
      { status: 500 }
    );
  }
}