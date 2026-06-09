import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { addToReadingList } from "../../actions/blogs";
import { getBlogById } from "../../services/blogs";
import { getCurrentUser } from "../../services/session";
import { getUserWithReadingList } from "../../services/users";

export const dynamic = "force-dynamic";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  const currentUser = await getCurrentUser();
  const currentUserWithList = currentUser
    ? await getUserWithReadingList(currentUser.id)
    : null;

  const alreadyInList = currentUserWithList?.readingList.some(
    (item) => item.blogId === blog.id,
  );
  const canAddToReadingList =
    !!currentUser && currentUser.id !== blog.userId && !alreadyInList;

  return (
    <section className="grid gap-6 rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
      <div className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
          Blog details
        </p>
        <h1 className="text-4xl font-black tracking-tight text-stone-900">
          {blog.title}
        </h1>
        <p className="text-lg text-stone-600">Author: {blog.author}</p>
        <p className="text-stone-600">
          Added by{" "}
          {blog.user ? (
            <Link
              href={`/users/${blog.user.username}`}
              className="font-semibold text-stone-900 underline decoration-amber-400 underline-offset-4"
            >
              {blog.user.name}
            </Link>
          ) : (
            "Unknown user"
          )}
        </p>
        <a
          href={blog.url}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-amber-700 underline decoration-amber-300 underline-offset-4"
        >
          Visit blog
        </a>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">
          Likes: {blog.likes}
        </span>
        {canAddToReadingList && (
          <form action={addToReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button
              type="submit"
              className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
            >
              Add to reading list
            </button>
          </form>
        )}
        {!currentUser && (
          <form
            action={async () => {
              "use server";
              redirect("/login");
            }}
          >
            <button
              type="submit"
              className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
            >
              Login to save
            </button>
          </form>
        )}
        {alreadyInList && currentUser && currentUser.id !== blog.userId && (
          <span className="text-sm font-semibold text-emerald-700">
            Already in your reading list
          </span>
        )}
      </div>
    </section>
  );
}
