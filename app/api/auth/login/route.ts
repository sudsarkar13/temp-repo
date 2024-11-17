import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Store the current token in memory (Note: this will reset on server restart)
let currentAdminToken: string | null = null;

export async function POST(request: Request) {
  try {
    const { passkey } = await request.json();

    if (passkey !== process.env.ADMIN_PASSKEY) {
      return NextResponse.json(
        { message: "Invalid passkey" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { admin: true },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1d" }
    );

    // Store the current token
    currentAdminToken = token;

    // Create the response
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );

    // Set the JWT token as an HTTP-only cookie
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Export the current token for middleware
export { currentAdminToken };