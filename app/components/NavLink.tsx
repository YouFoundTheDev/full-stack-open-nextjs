import Link from "next/link";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-2 text-sm font-semibold text-white transition hover:bg-stone-700 hover:text-white"
    >
      {children}
    </Link>
  );
}
