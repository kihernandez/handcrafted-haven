import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase } from "@/lib/database-schema";

/**
 * Initialize API
 * POST /api/init - Initialize database schema
 * 
 * Security: This should only be called once during setup
 * Consider removing or protecting this route in production
 */
export async function POST(request: NextRequest) {
  try {
    // In production, you might want to check for an admin token or API key
    // const authHeader = request.headers.get("authorization");
    // if (!authHeader?.startsWith("Bearer ")) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const result = await initializeDatabase();

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Init error:", error);
    return NextResponse.json(
      { error: "An error occurred during initialization" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      message: "Database initialization endpoint",
      usage: "POST /api/init to initialize the database schema",
      note: "This should only be called once during initial setup",
    },
    { status: 200 }
  );
}
