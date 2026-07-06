import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";

const nunito = Nunito({
  subsets: ["latin"],
});

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
      <body className={`${nunito.className} min-h-full flex flex-col`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
