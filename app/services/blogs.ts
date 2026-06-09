import { desc } from "drizzle-orm";
import { getDb } from "../../db";
import { blogs } from "../../db/schema";

export type Blog = typeof blogs.$inferSelect;

export const getBlogs = async () => {
  const db = getDb();
  return db.select().from(blogs).orderBy(desc(blogs.id));
};

export const addBlog = async ({
  title,
  author,
  url,
}: Omit<Blog, "id" | "likes">) => {
  const db = getDb();

  await db.insert(blogs).values({
    title,
    author,
    url,
    likes: 0,
  });
};
