import { desc } from "drizzle-orm";
import { getDb } from "../../db";
import { blogs } from "../../db/schema";
import { ensureDefaultUser } from "./users";

export type Blog = typeof blogs.$inferSelect;
type NewBlog = {
  title: string;
  author: string;
  url: string;
};

export const getBlogs = async () => {
  const db = getDb();
  return db.query.blogs.findMany({
    orderBy: [desc(blogs.id)],
    with: {
      user: true,
    },
  });
};

export const addBlog = async ({ title, author, url }: NewBlog) => {
  const db = getDb();
  const user = await ensureDefaultUser();

  await db.insert(blogs).values({
    title,
    author,
    url,
    likes: 0,
    userId: user.id,
  });
};
