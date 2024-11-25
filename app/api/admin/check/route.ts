import { NextResponse } from "next/server";
import Admin from "@/models/auth";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    const adminExists = await Admin.findOne().select('_id').lean();
    return NextResponse.json({ hasAdmin: !!adminExists });
  } catch (error) {
    console.error('Error checking admin existence:', error);
    return NextResponse.json({ hasAdmin: false });
  }
}
