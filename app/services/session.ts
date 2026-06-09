import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb } from "@/db";
import { users } from "@/db/schema";

export async function getCurrentUser() {
  const session = await auth();
  const username = session?.user?.email;

  if (!username) {
    return null;
  }

  const db = getDb();
  return db.query.users.findFirst({
    where: eq(users.username, username),
  });
}
