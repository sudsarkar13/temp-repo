import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Admin from "@/models/auth";

export async function POST(request: Request) {
  try {
    // Check if admin already exists
    const adminExists = await Admin.findOne();
    if (adminExists) {
      return NextResponse.json(
        { message: "Admin already exists" },
        { status: 400 }
      );
    }

    const { email, password, name } = await request.json();

    // Validate input
    if (!email || !password || !name || password.length < 8) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const admin = await Admin.create({
      email,
      name,
      password: hashedPassword,
      twoFactorEnabled: false,
      sessions: [],
      createdAt: new Date(),
    });

    // Return success
    return NextResponse.json({
      message: "Admin account created successfully",
    });
  } catch (error: any) {
    console.error("Admin setup error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Only allow POST method
export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed" },
    { status: 405 }
  );
}
