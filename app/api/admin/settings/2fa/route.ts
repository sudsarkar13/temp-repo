import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import Admin from "@/models/auth";

export const runtime = 'nodejs';

// Initialize 2FA setup
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

    // Generate new 2FA secret
    const secret = speakeasy.generateSecret({
      name: `Portfolio Admin (${admin.email})`,
    });

    // Store temporary secret
    admin.tempTwoFactorSecret = secret.base32;
    await admin.save();

    return NextResponse.json({
      qrCodeUrl: secret.otpauth_url,
      secret: secret.base32,
    });
  } catch (error) {
    console.error("2FA setup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Disable 2FA
export async function DELETE(request: NextRequest) {
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

    // Disable 2FA
    admin.twoFactorSecret = undefined;
    admin.twoFactorEnabled = false;
    admin.tempTwoFactorSecret = undefined;
    await admin.save();

    return NextResponse.json({
      message: "Two-factor authentication disabled",
    });
  } catch (error) {
    console.error("2FA disable error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
