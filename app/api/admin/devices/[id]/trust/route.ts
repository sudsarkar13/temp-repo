import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Admin from "@/models/auth";

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
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

    const { trusted } = await request.json();
    const deviceId = params.id;

    // Find device index
    const deviceIndex = admin.devices.findIndex(
      (d: any) => d.deviceId === deviceId
    );

    if (deviceIndex === -1) {
      return NextResponse.json(
        { message: "Device not found" },
        { status: 404 }
      );
    }

    // Update device trust status
    admin.devices[deviceIndex].trusted = trusted;
    admin.devices[deviceIndex].lastUpdated = new Date();

    // If untrusting device, clear its session
    if (!trusted) {
      admin.sessions = admin.sessions.filter(
        (s: any) => s.deviceId !== deviceId
      );
    }

    await admin.save();

    return NextResponse.json({
      message: `Device ${trusted ? "trusted" : "untrusted"} successfully`,
    });
  } catch (error) {
    console.error("Update device trust error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
