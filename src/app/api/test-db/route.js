import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    // Simple query to test connection
    const result = await pool.query(
      "SELECT NOW() as current_time, version() as postgres_version"
    );

    return NextResponse.json({
      success: true,
      message: "Database connection successful!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to database",
        details: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
