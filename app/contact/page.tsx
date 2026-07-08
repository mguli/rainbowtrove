import type { Metadata } from "next";
import CustomOrder from "../components/customOrder";

export const metadata: Metadata = {
  title: "Contact and Custom Orders",
  description:
    "Contact Rainbow Trove for personalized gifts, custom bookmarks, mugs, stickers, keepsakes, teacher gifts, and special handmade requests.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Rainbow Trove for Custom Orders",
    description:
      "Share your custom gift idea, personalization request, theme, colors, names, dates, or special details with Rainbow Trove.",
    url: "/contact",
  },
};

const requirements = [
  "What product you want customized",
  "Names, dates, quotes, or wording",
  "Favorite colors, theme, or inspiration",
  "Quantity and timeline",
  "Any size, style, or material preferences",
];

export default function Contact() {
  return (
    <main className="bg-[#fffaf5] text-[#4A4A4A]">
      <section className="bg-[linear-gradient(135deg,#fffaf5_0%,#f5e6df_50%,#e7efdf_100%)]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20 lg:px-8">
          <p className="inline-flex rounded-full bg-[#fffaf5]/85 px-4 py-2 text-sm font-bold text-[#9f6f68] shadow-sm shadow-[#eadbd5]">
            Contact Rainbow Trove
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Let&apos;s make something personal.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#6f625c]">
            Have a custom gift idea, personalization request, or question about an
            existing product? Send the details and we&apos;ll help shape it into a
            thoughtful keepsake.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <aside className="space-y-5">
          <div className="rounded-3xl border border-[#eadbd5] bg-[#fffdf9] p-6 shadow-sm shadow-[#eadbd5]">
            <h2 className="text-xl font-extrabold">Email</h2>
            <a
              href="mailto:therainbowtrove@gmail.com"
              className="mt-3 inline-flex font-bold text-[#9f6f68] hover:text-[#7e5752]"
            >
              therainbowtrove@gmail.com
            </a>
            <p className="mt-3 leading-7 text-[#6f625c]">
              Email is best for custom requests, image references, and order questions.
            </p>
          </div>

          <div className="rounded-3xl border border-[#dfe8d7] bg-[#eef4e8] p-6 text-[#4f5f49] shadow-sm shadow-[#dfe8d7]">
            <h2 className="text-xl font-extrabold">Helpful details to include</h2>
            <ul className="mt-4 space-y-3">
              {requirements.map((item) => (
                <li key={item} className="flex gap-3 leading-7">
                  <span className="font-bold text-[#6f8565]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <CustomOrder />
      </section>
    </main>
  );
}
