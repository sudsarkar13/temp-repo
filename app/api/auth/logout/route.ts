import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { clearCurrentAdminToken } from "../login/tokenStorage";

export async function POST() {
  try {
    // Clear the token from memory
    clearCurrentAdminToken();

    // Clear the cookie
    (await cookies()).delete("token");

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Error during logout" },
      { status: 500 }
    );
  }
}