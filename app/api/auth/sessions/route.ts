import { NextResponse, NextRequest } from "next/server";
import Admin from "@/models/auth";
import { isSessionExpired } from "@/lib/auth-utils";
import { getToken } from "next-auth/jwt";
import { AdminSession } from "@/types/auth";

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token?.sub) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const admin = await Admin.findById(token.sub);
    
    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 404 }
      );
    }

    // Filter out expired sessions and format the response
    const activeSessions = admin.sessions
      .filter((session: AdminSession) => !isSessionExpired(session.expiresAt))
      .map((session: AdminSession) => ({
        id: session._id,
        device: session.device,
        browser: session.userAgent,
        ip: session.ip,
        lastActive: session.lastActive,
        current: session.token === request.cookies.get("admin_token")?.value,
      }));

    return NextResponse.json({ sessions: activeSessions });
  } catch (error) {
    console.error('Get sessions error:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token?.sub) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { message: "Session ID is required" },
        { status: 400 }
      );
    }

    const admin = await Admin.findById(token.sub);
    
    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 404 }
      );
    }

    // Remove the specified session
    admin.sessions = admin.sessions.filter(
      (session: AdminSession) => session._id?.toString() !== sessionId
    );

    await admin.save();

    return NextResponse.json({ message: "Session terminated successfully" });
  } catch (error) {
    console.error("Error terminating session:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
