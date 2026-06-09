import { createBlog } from "../../actions/blogs";

export default function NewBlogPage() {
  return (
    <section>
      <div className="page-intro">
        <h1>Create a new blog</h1>
        <p>Submit a title, author, and URL to add a new blog entry.</p>
      </div>

      <form action={createBlog}>
        <label>
          Title
          <input type="text" name="title" required />
        </label>

        <label>
          Author
          <input type="text" name="author" required />
        </label>

        <label>
          URL
          <input type="url" name="url" required />
        </label>

        <button type="submit">Create blog</button>
      </form>
    </section>
  );
}
