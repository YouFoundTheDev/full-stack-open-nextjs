import { and, desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { blogs, readingList, users } from "@/db/schema";
import { getCurrentUser } from "./session";

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

export const getBlogById = async (id: number) => {
  const db = getDb();

  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
    with: {
      user: true,
    },
  });
};

export const addBlog = async ({ title, author, url }: NewBlog) => {
  const db = getDb();
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const [blog] = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      likes: 0,
      userId: user.id,
    })
    .returning();

  await db.insert(readingList).values({
    userId: user.id,
    blogId: blog.id,
    read: false,
  });
};

export const addBlogToReadingList = async (blogId: number, userId: number) => {
  const db = getDb();

  const existingItem = await db.query.readingList.findFirst({
    where: and(eq(readingList.blogId, blogId), eq(readingList.userId, userId)),
  });

  if (existingItem) {
    return;
  }

  await db.insert(readingList).values({
    userId,
    blogId,
    read: false,
  });
};

export const markReadingListItemAsRead = async (id: number, userId: number) => {
  const db = getDb();

  await db
    .update(readingList)
    .set({ read: true })
    .where(and(eq(readingList.id, id), eq(readingList.userId, userId)));
};

export const generateUserToken = async (userId: number, token: string) => {
  const db = getDb();

  await db
    .update(users)
    .set({ token })
    .where(eq(users.id, userId));
};
