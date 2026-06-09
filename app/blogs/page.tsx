import { getBlogs } from "../services/blogs";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <section>
      <div className="page-intro">
        <h1>Blogs</h1>
        <p>Blog list loaded from PostgreSQL with Drizzle ORM.</p>
      </div>

      <ul className="card-list">
        {blogs.map((blog) => (
          <li key={blog.id} className="card">
            <h2>{blog.title}</h2>
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
