import { redirect } from "next/navigation";
import { markAsRead } from "../actions/blogs";
import { createApiToken } from "../actions/users";
import { getCurrentUser } from "../services/session";
import { getUserWithReadingList } from "../services/users";

export const dynamic = "force-dynamic";

export default async function MePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  const user = await getUserWithReadingList(currentUser.id);
  if (!user) {
    redirect("/login");
  }

  const unread = user.readingList.filter((item) => !item.read);
  const read = user.readingList.filter((item) => item.read);

  return (
    <section className="grid gap-6">
      <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
        <div className="grid gap-2">
          <h1 className="text-3xl font-black text-stone-900">{user.name}</h1>
          <p className="text-stone-600">Username: {user.username}</p>
        </div>
      </div>

      <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
        <div className="mb-4 grid gap-2">
          <h2 className="text-2xl font-black text-stone-900">API token</h2>
          <p className="text-stone-600">
            Use this token to call the protected <code>/api/me</code> endpoint.
          </p>
        </div>
        <p className="mb-4 rounded-2xl bg-stone-100 px-4 py-3 font-mono text-sm text-stone-700">
          {user.token ?? "No token generated yet."}
        </p>
        <form action={createApiToken}>
          <button
            type="submit"
            className="rounded-full bg-stone-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-stone-800"
          >
            Generate new token
          </button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-stone-900">Unread</h2>
          <ul className="grid gap-3">
            {unread.length === 0 && (
              <li className="text-stone-500">No unread blogs in your reading list.</li>
            )}
            {unread.map((item) => (
              <li key={item.id} className="rounded-2xl border border-stone-200 p-4">
                <p className="font-bold text-stone-900">{item.blog.title}</p>
                <p className="text-sm text-stone-600">
                  Added by {item.blog.user?.name ?? item.blog.author}
                </p>
                <form action={markAsRead} className="mt-3">
                  <input type="hidden" name="itemId" value={item.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
                  >
                    Mark as read
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-stone-900">Read</h2>
          <ul className="grid gap-3">
            {read.length === 0 && (
              <li className="text-stone-500">No read blogs yet.</li>
            )}
            {read.map((item) => (
              <li key={item.id} className="rounded-2xl border border-stone-200 p-4">
                <p className="font-bold text-stone-900">{item.blog.title}</p>
                <p className="text-sm text-stone-600">
                  Added by {item.blog.user?.name ?? item.blog.author}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
