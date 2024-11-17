import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Admin from "@/models/auth";

export const runtime = 'nodejs';

export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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

    const deviceId = params.id;

    // Remove device from devices array
    admin.devices = admin.devices.filter(
      (d: any) => d.deviceId !== deviceId
    );

    // Remove associated sessions
    admin.sessions = admin.sessions.filter(
      (s: any) => s.deviceId !== deviceId
    );

    await admin.save();

    return NextResponse.json({
      message: "Device removed successfully",
    });
  } catch (error) {
    console.error("Remove device error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
