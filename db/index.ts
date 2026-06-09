import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

let dbInstance: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is missing. Add it to .env.local before using the database-backed blog app.",
    );
  }

  if (!dbInstance) {
    dbInstance = drizzle(neon(databaseUrl), { schema });
  }

  return dbInstance;
}
