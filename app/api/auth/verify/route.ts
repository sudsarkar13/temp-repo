import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Verify the JWT token
    jwt.verify(token.value, process.env.JWT_SECRET || "fallback_secret");

    return NextResponse.json(
      { message: "Authorized" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
} 