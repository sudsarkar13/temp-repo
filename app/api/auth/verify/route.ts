import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import * as jose from 'jose';

export const runtime = 'nodejs';

// Create a TextEncoder instance
const encoder = new TextEncoder();

// Convert secret to Uint8Array
const secret = encoder.encode(process.env.JWT_SECRET || 'fallback_secret');

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify the JWT token
    await jose.jwtVerify(token.value, secret);

    return NextResponse.json(
      { message: "Authorized" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify the JWT token
    await jose.jwtVerify(token.value, secret);

    return NextResponse.json(
      { message: "Authorized" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
}