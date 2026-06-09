"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "../../actions/blogs";
import { initialBlogFormState } from "../../actions/form-states";
import { useNotification } from "../../components/NotificationContext";

export default function NewBlogPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [state, formAction] = useActionState(createBlog, initialBlogFormState);

  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
      router.refresh();
    }
  }, [router, showNotification, state.success]);

  return (
    <section className="mx-auto max-w-2xl rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
      <div className="mb-6 grid gap-2">
        <h1 className="text-3xl font-black text-stone-900">Create a new blog</h1>
        <p className="text-stone-600">
          Submit a title, author, and URL to add a new blog entry.
        </p>
      </div>

      <form action={formAction} className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">Title</span>
          <input
            type="text"
            name="title"
            required
            minLength={5}
            defaultValue={state.values.title}
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-stone-500 focus:bg-white"
          />
          {state.errors.title && (
            <span className="text-sm font-semibold text-rose-700">
              {state.errors.title}
            </span>
          )}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">Author</span>
          <input
            type="text"
            name="author"
            required
            minLength={5}
            defaultValue={state.values.author}
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-stone-500 focus:bg-white"
          />
          {state.errors.author && (
            <span className="text-sm font-semibold text-rose-700">
              {state.errors.author}
            </span>
          )}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-stone-700">URL</span>
          <input
            type="url"
            name="url"
            required
            minLength={5}
            defaultValue={state.values.url}
            className="rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 outline-none transition focus:border-stone-500 focus:bg-white"
          />
          {state.errors.url && (
            <span className="text-sm font-semibold text-rose-700">
              {state.errors.url}
            </span>
          )}
        </label>

        <button
          type="submit"
          className="w-fit rounded-full bg-stone-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-stone-800"
        >
          Create blog
        </button>
      </form>
    </section>
  );
}
