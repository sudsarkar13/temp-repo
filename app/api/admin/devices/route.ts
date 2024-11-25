import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Admin from "@/models/auth";

export const runtime = 'nodejs';

// Get all devices
export async function GET(request: NextRequest) {
  try {
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

    // Return devices sorted by last used date
    const devices = admin.devices.sort((a: any, b: any) => 
      new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()
    );

    return NextResponse.json({ devices });
  } catch (error) {
    console.error("Get devices error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
