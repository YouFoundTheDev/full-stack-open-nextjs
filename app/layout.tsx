import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Blog List",
  description: "Full Stack Open Next.js exercises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav className="site-nav">
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/users">Users</Link>
          <Link href="/blogs/new">New Blog</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
