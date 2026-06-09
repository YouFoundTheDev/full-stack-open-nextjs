"use client";

import { signOut, useSession } from "next-auth/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-stone-700 bg-stone-950 text-white shadow-sm">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 px-4 py-3">
        <NavLink href="/">home</NavLink>
        <NavLink href="/blogs">blogs</NavLink>
        <NavLink href="/users">users</NavLink>
        {session && <NavLink href="/blogs/new">create blog</NavLink>}
        {session && <NavLink href="/me">me</NavLink>}
        <div className="ml-auto flex items-center gap-3">
          {session ? (
            <>
              <em className="text-sm text-stone-200">
                {session.user?.name} logged in
              </em>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-full border border-stone-500 bg-stone-800 px-4 py-2 text-sm font-semibold text-white transition hover:border-stone-300 hover:bg-stone-700"
              >
                logout
              </button>
            </>
          ) : (
            <>
              <NavLink href="/login">login</NavLink>
              <NavLink href="/register">register</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
