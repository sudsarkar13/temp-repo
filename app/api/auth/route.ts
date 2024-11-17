 import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCurrentAdminToken } from "./login/tokenStorage";

export async function GET() {
  try {
    const token = (await cookies()).get("token");
    const currentToken = getCurrentAdminToken();

    return NextResponse.json({
      isAuthenticated: !!token && token.value === currentToken,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { message: "Error checking authentication status" },
      { status: 500 }
    );
  }
}