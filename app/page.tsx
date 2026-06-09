export default function HomePage() {
  return (
    <section className="grid gap-6 rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-sm">
      <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-amber-800">
        Full Stack Open
      </span>
      <div className="grid gap-3">
        <h1 className="text-4xl font-black tracking-tight text-stone-900">
          Blog app with auth, API tokens, and reading lists
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-stone-600">
          This app now uses Next.js App Router, Drizzle ORM, Neon Postgres,
          NextAuth, server actions, and route handlers for the Full Stack Open
          exercises.
        </p>
      </div>
    </section>
  );
}
