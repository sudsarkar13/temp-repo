import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import Admin from "@/models/auth";
import { cookies } from "next/headers";
import { getCurrentAdminToken, setCurrentAdminToken } from "./tokenStorage";

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // If 2FA is enabled, require verification
    if (admin.twoFactorEnabled) {
      // Create a temporary token for 2FA verification
      const tempToken = jwt.sign(
        { 
          id: admin._id,
          type: "2fa_pending"
        },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "5m" }
      );

      const response = NextResponse.json(
        { 
          requiresTwoFactor: true,
          tempToken 
        },
        { status: 200 }
      );

      // Set temporary token in cookie
      response.cookies.set({
        name: "temp_token",
        value: tempToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 5, // 5 minutes
      });

      return response;
    }

    // If no 2FA, create full session
    const token = jwt.sign(
      { 
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1d" }
    );

    // Update last login
    await Admin.findByIdAndUpdate(admin._id, {
      $set: {
        lastLoginAt: new Date(),
      },
    });

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

    // Update the current token
    setCurrentAdminToken(token);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}