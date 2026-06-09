import Link from "next/link";
import { getBlogs } from "../services/blogs";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <section>
      <div className="mb-8 grid gap-2">
        <h1 className="text-4xl font-black tracking-tight text-stone-900">Blogs</h1>
        <p className="text-lg text-stone-600">
          Blog list loaded from PostgreSQL with Drizzle ORM.
        </p>
      </div>

      <ul className="grid gap-4">
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-2xl font-black text-stone-900">
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </h2>
            <p className="mt-2 text-stone-600">Author: {blog.author}</p>
            <p className="text-stone-500">
              Added by: {blog.user?.name ?? "Unassigned user"}
            </p>
            <p className="mt-3">
              URL:{" "}
              <a
                href={blog.url}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-amber-700 underline decoration-amber-300 underline-offset-4"
              >
                {blog.url}
              </a>
            </p>
            <span className="mt-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">
              Likes: {blog.likes}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
