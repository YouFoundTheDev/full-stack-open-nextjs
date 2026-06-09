import { defineConfig } from "drizzle-kit"
import { existsSync } from "node:fs"
import * as dotenv from "dotenv"

// In CI and tests, prefer .env.test when it exists. Otherwise use .env.local.
const useTestEnv =
  process.env.NODE_ENV === "test" ||
  (process.env.CI === "true" && existsSync(".env.test"))
const envFile = useTestEnv && existsSync(".env.test") ? ".env.test" : ".env.local"
dotenv.config({ path: envFile })

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
