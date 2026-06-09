"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { generateUserToken } from "../services/blogs";
import { getCurrentUser } from "../services/session";
import type { RegisterFormState } from "./form-states";

export async function registerUser(
  prevState: RegisterFormState,
  formData: FormData,
) {
  const username = String(formData.get("username") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "");
  const errors: RegisterFormState["errors"] = {};

  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  }
  if (!name) {
    errors.name = "Name is required";
  }
  if (password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }
  if (passwordConfirm !== password) {
    errors.passwordConfirm = "Password confirmation must match password";
  }

  const db = getDb();
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existingUser) {
    errors.username = "A user with that username already exists";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name },
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({
    username,
    name,
    passwordHash,
  });

  revalidatePath("/users");
  redirect("/login");
}

export async function createApiToken() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  await generateUserToken(user.id, crypto.randomUUID());
  revalidatePath("/me");
}
