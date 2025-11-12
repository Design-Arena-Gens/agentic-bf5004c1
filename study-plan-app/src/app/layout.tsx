import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Linux Systems Lab Study Plan",
  description:
    "Interactive guide to master Linux systems programming, concurrency, and xv6 system calls in one day."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="gradient-bg min-h-screen">{children}</body>
    </html>
  );
}
