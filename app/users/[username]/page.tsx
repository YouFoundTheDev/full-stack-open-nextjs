import { notFound } from "next/navigation";
import { getUserWithBlogs } from "../../services/users";

export const dynamic = "force-dynamic";

type UserPageProps = {
  params: Promise<{ username: string }>;
};

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <section>
      <div className="page-intro">
        <h1>{user.name}</h1>
        <p>Username: {user.username}</p>
      </div>

      <h2>Added blogs</h2>
      <ul className="card-list">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="card">
            <h3>{blog.title}</h3>
            <p className="meta">Author: {blog.author}</p>
            <p>
              URL:{" "}
              <a href={blog.url} target="_blank" rel="noreferrer">
                {blog.url}
              </a>
            </p>
            <span className="likes">Likes: {blog.likes}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
