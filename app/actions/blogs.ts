"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addBlog,
  addBlogToReadingList,
  markReadingListItemAsRead,
} from "../services/blogs";
import { getCurrentUser } from "../services/session";
import type { BlogFormState } from "./form-states";

export async function createBlog(
  prevState: BlogFormState,
  formData: FormData,
) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const errors: BlogFormState["errors"] = {};

  if (title.length < 5) {
    errors.title = "Title must be at least 5 characters long";
  }
  if (author.length < 5) {
    errors.author = "Author must be at least 5 characters long";
  }
  if (url.length < 5) {
    errors.url = "URL must be at least 5 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
      success: false,
    };
  }

  await addBlog({ title, author, url });
  revalidatePath("/blogs");

  return {
    errors: {},
    values: { title: "", author: "", url: "" },
    success: true,
  };
}

export async function addToReadingList(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const blogId = Number(formData.get("blogId"));
  await addBlogToReadingList(blogId, user.id);
  revalidatePath("/me");
  revalidatePath(`/blogs/${blogId}`);
}

export async function markAsRead(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const itemId = Number(formData.get("itemId"));
  await markReadingListItemAsRead(itemId, user.id);
  revalidatePath("/me");
}
