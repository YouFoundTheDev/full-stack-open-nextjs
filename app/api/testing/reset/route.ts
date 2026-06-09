import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db";

export async function DELETE() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  const db = getDb();
  await db.execute(
    sql.raw(
      'TRUNCATE TABLE "reading_list", "blogs", "users" RESTART IDENTITY CASCADE',
    ),
  );

  return NextResponse.json({ success: true });
}
