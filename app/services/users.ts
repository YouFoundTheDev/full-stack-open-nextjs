import { asc, eq } from "drizzle-orm";
import { getDb } from "../../db";
import { blogs, users } from "../../db/schema";

export type User = typeof users.$inferSelect;

const DEFAULT_USER = {
  username: "course-user",
  name: "Course User",
};

export const getUsers = async () => {
  const db = getDb();

  return db.query.users.findMany({
    orderBy: [asc(users.name)],
  });
};

export const getUserWithBlogs = async (username: string) => {
  const db = getDb();

  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: {
        orderBy: [asc(blogs.id)],
      },
    },
  });
};

export const ensureDefaultUser = async () => {
  const db = getDb();
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, DEFAULT_USER.username),
  });

  if (existingUser) {
    return existingUser;
  }

  const [createdUser] = await db
    .insert(users)
    .values(DEFAULT_USER)
    .returning();

  return createdUser;
};
