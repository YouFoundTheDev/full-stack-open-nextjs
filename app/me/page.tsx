import { redirect } from "next/navigation";
import { markAsRead } from "../actions/blogs";
import ApiTokenSection from "../components/ApiTokenSection";
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
        <div data-testid="user-profile" className="grid gap-2">
          <h1 data-testid="user-name" className="text-3xl font-black text-stone-900">
            {user.name}
          </h1>
          <p data-testid="user-username" className="text-stone-600">
            Username: {user.username}
          </p>
        </div>
      </div>

      <ApiTokenSection initialToken={user.token} />

      <div
        data-testid="reading-list-section"
        className="grid gap-6 md:grid-cols-2"
      >
        <section
          data-testid="unread-section"
          className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm"
        >
          <h2 className="mb-4 text-2xl font-black text-stone-900">Unread</h2>
          <ul className="grid gap-3">
            {unread.length === 0 && (
              <li
                data-testid="no-unread-blogs"
                className="text-stone-500"
              >
                No unread blogs in your reading list.
              </li>
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
                    data-testid={`mark-read-${item.id}`}
                    className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
                  >
                    Mark as read
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </section>

        <section
          data-testid="read-section"
          className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm"
        >
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
      {user.readingList.length === 0 && (
        <p data-testid="empty-reading-list" className="text-stone-500">
          Your reading list is empty.
        </p>
      )}
    </section>
  );
}
