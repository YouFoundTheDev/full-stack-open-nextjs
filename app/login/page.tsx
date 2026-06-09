"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <section className="mx-auto max-w-xl rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
      <div className="mb-6 grid gap-2">
        <h1 className="text-3xl font-black text-stone-900">Login</h1>
        <p className="text-stone-600">
          Sign in with your username and password to create blogs and manage
          your reading list.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">Username</span>
          <input
            type="text"
            name="username"
            required
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-stone-500 focus:bg-white"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">Password</span>
          <input
            type="password"
            name="password"
            required
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-stone-500 focus:bg-white"
          />
        </label>
        {error && (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="w-fit rounded-full bg-stone-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-stone-800"
        >
          Login
        </button>
      </form>
    </section>
  );
}
