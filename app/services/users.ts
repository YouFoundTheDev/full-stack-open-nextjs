import { asc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { blogs, readingList, users } from "@/db/schema";

export type User = typeof users.$inferSelect;

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

export const getUserByToken = async (token: string) => {
  const db = getDb();

  return db.query.users.findFirst({
    where: eq(users.token, token),
  });
};

export const getUserWithReadingList = async (id: number) => {
  const db = getDb();

  return db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      readingList: {
        with: {
          blog: {
            with: {
              user: true,
            },
          },
        },
        orderBy: [asc(readingList.id)],
      },
    },
  });
};
