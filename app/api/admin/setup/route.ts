import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as jose from 'jose';
import Admin from "@/models/auth";
import { connectDB } from "@/lib/mongodb";

// Create a TextEncoder instance
const encoder = new TextEncoder();

// Convert secret to Uint8Array
const secret = encoder.encode(process.env.JWT_SECRET || 'fallback_secret');

export async function POST(request: Request) {
  console.log('Admin setup request received');
  
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB');
    
    // Check if admin already exists
    console.log('Checking for existing admin...');
    const adminExists = await Admin.findOne();
    if (adminExists) {
      console.log('Admin already exists');
      return NextResponse.json(
        { message: "Admin already exists" },
        { status: 400 }
      );
    }

    const { email, password, name } = await request.json();
    console.log('Received registration data for:', email);

    // Validate input
    if (!email || !password || !name) {
      console.log('Missing required fields');
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordRegex = {
      minLength: /.{8,}/,
      hasUpperCase: /[A-Z]/,
      hasLowerCase: /[a-z]/,
      hasNumber: /\d/,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
    };

    const passwordErrors = [];
    if (!passwordRegex.minLength.test(password)) {
      passwordErrors.push("Password must be at least 8 characters long");
    }
    if (!passwordRegex.hasUpperCase.test(password)) {
      passwordErrors.push("Password must contain at least one uppercase letter");
    }
    if (!passwordRegex.hasLowerCase.test(password)) {
      passwordErrors.push("Password must contain at least one lowercase letter");
    }
    if (!passwordRegex.hasNumber.test(password)) {
      passwordErrors.push("Password must contain at least one number");
    }
    if (!passwordRegex.hasSpecialChar.test(password)) {
      passwordErrors.push("Password must contain at least one special character");
    }

    if (passwordErrors.length > 0) {
      console.log('Password validation failed:', passwordErrors);
      return NextResponse.json(
        { message: "Password requirements not met", errors: passwordErrors },
        { status: 400 }
      );
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log('Creating admin account...');
    // Create admin
    const admin = await Admin.create({
      email: email.toLowerCase().trim(),
      name: name.trim(),
      password: hashedPassword,
      twoFactorEnabled: false,
      sessions: [],
      createdAt: new Date(),
    });

    console.log('Admin account created successfully');
    
    // Create and set JWT token
    const token = await new jose.SignJWT({ 
      id: admin._id.toString(), 
      email: admin.email 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secret);

    const response = NextResponse.json({
      message: "Admin account created successfully",
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      }
    });

    // Set the token cookie
    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error: any) {
    console.error("Admin setup error:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Check for MongoDB connection errors
    if (error.name === 'MongooseServerSelectionError') {
      return NextResponse.json(
        { message: "Database connection failed. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Failed to create admin account", error: error.message },
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
