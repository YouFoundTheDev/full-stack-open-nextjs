import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import { NotificationProvider } from "./components/NotificationContext";
import AuthSessionProvider from "./components/SessionProvider";
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
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <main className="mx-auto max-w-5xl px-4 py-8">
              <Notification />
              {children}
            </main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
