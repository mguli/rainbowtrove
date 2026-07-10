import type { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./lib/site";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Handmade Personalized Gifts`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "handmade gifts",
    "personalized gifts",
    "custom bookmarks",
    "teacher gifts",
    "book lover gifts",
    "custom mugs",
    "Rainbow Trove",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} | Handmade Personalized Gifts`,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [
      {
        url: "/rt-logo-2026.png",
        width: 1254,
        height: 1254,
        alt: `${SITE_NAME} logo`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} | Handmade Personalized Gifts`,
    description: SITE_DESCRIPTION,
    images: ["/rt-logo-2026.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${nunito.variable} ${lora.variable} min-h-full flex flex-col`}>
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-[#4A4A4A] px-4 py-3 font-bold text-white transition focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Navigation />
        <div id="main-content" tabIndex={-1} className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
