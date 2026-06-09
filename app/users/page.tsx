import Link from "next/link";
import { getUsers } from "../services/users";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <section>
      <div className="page-intro">
        <h1>Users</h1>
        <p>Browse the users who have added blogs to the application.</p>
      </div>

      <ul className="card-list">
        {users.map((user) => (
          <li key={user.id} className="card">
            <h2>
              <Link href={`/users/${user.username}`}>{user.name}</Link>
            </h2>
            <p className="meta">Username: {user.username}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
