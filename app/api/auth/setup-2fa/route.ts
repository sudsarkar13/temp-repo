import { NextResponse } from "next/server";
import { generateTwoFactorSecret } from "@/lib/auth-utils";
import Admin from "@/models/auth";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 404 }
      );
    }

    if (admin.twoFactorEnabled) {
      return NextResponse.json(
        { message: "2FA is already enabled" },
        { status: 400 }
      );
    }

    const { secret, qrCode } = await generateTwoFactorSecret(email);
    
    // Store the secret temporarily
    admin.twoFactorSecret = secret;
    await admin.save();

    return NextResponse.json({ qrCode });
  } catch (error) {
    console.error('Setup 2FA error:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
