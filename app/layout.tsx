import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/navigation";

export const metadata: Metadata = {
  title: "Rainbow Trove",
  description: "Personalized handmade gifts, bookmarks, stickers, and keepsakes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col"><Navigation />{children}</body>
    </html>
  );
}
