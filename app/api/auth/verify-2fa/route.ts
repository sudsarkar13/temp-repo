import { NextResponse, NextRequest } from "next/server";
import { verifyTwoFactorToken, getDeviceInfo, calculateSessionExpiry } from "@/lib/auth-utils";
import Admin from "@/models/auth";
import jwt from "jsonwebtoken";

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { email, token, rememberMe } = await request.json();
    const admin = await Admin.findOne({ email });

    if (!admin || !admin.twoFactorSecret) {
      return NextResponse.json(
        { message: "Invalid request" },
        { status: 400 }
      );
    }

    const isValid = verifyTwoFactorToken(admin.twoFactorSecret, token);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid 2FA token" },
        { status: 401 }
      );
    }

    // If this is the first successful verification, enable 2FA
    if (!admin.twoFactorEnabled) {
      admin.twoFactorEnabled = true;
      await admin.save();
    }

    // Create JWT token
    const jwtToken = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: rememberMe ? "30d" : "24h" }
    );

    // Add session information
    const deviceInfo = getDeviceInfo(request.headers.get("user-agent") || "");
    const expiresAt = calculateSessionExpiry(rememberMe);

    admin.sessions.push({
      token: jwtToken,
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      device: deviceInfo,
      lastActive: new Date(),
      expiresAt,
    });

    await admin.save();

    // Create the response
    const response = NextResponse.json(
      { message: "2FA verification successful" },
      { status: 200 }
    );

    // Set the JWT token as an HTTP-only cookie
    response.cookies.set({
      name: "admin_token",
      value: jwtToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error('Verify 2FA error:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
