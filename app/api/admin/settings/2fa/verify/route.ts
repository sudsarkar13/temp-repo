import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import Admin from "@/models/auth";

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Get admin ID from token
    const token = (await cookies()).get("admin_token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as jwt.JwtPayload;
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 404 }
      );
    }

    // Get verification code from request
    const { code } = await request.json();

    // Verify the code against the temporary secret
    const verified = speakeasy.totp.verify({
      secret: admin.tempTwoFactorSecret,
      encoding: "base32",
      token: code,
      window: 2, // Allow 2 time steps before and after for clock drift
    });

    if (!verified) {
      return NextResponse.json(
        { message: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Enable 2FA and save the secret
    admin.twoFactorSecret = admin.tempTwoFactorSecret;
    admin.twoFactorEnabled = true;
    admin.tempTwoFactorSecret = undefined;
    await admin.save();

    return NextResponse.json({
      message: "Two-factor authentication enabled",
    });
  } catch (error) {
    console.error("2FA verification error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
