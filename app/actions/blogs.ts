"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog } from "../services/blogs";

export async function createBlog(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();

  if (!title || !author || !url) {
    throw new Error("Title, author, and url are required");
  }

  await addBlog({ title, author, url });
  revalidatePath("/blogs");
  redirect("/blogs");
}
