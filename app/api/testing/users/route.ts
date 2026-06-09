import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { users } from "@/db/schema";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }

  const body = await req.json();
  const username = String(body.username ?? "").trim();
  const name = String(body.name ?? "").trim();
  const password = String(body.password ?? "");

  if (!username || !name || !password) {
    return NextResponse.json(
      { error: "username, name, and password are required" },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const db = getDb();

  const [user] = await db
    .insert(users)
    .values({
      username,
      name,
      passwordHash,
    })
    .returning({
      id: users.id,
      username: users.username,
      name: users.name,
    });

  return NextResponse.json(user, { status: 201 });
}
