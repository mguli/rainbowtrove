import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import bestSellers from "../data/bestSellers.json";
import featuredCategories from "../data/featured.json";

export const metadata: Metadata = {
  title: "Personalized Gifts, Bookmarks, Stickers, and Keepsakes",
  description:
    "Shop thoughtful personalized gifts handmade by Rainbow Trove, including bookmarks, stickers, mugs, tumblers, coasters, and custom keepsakes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Personalized Gifts, Bookmarks, Stickers, and Keepsakes",
    description:
      "Shop thoughtful personalized gifts handmade by Rainbow Trove for readers, teachers, sports fans, and everyday celebrations.",
    url: "/",
    images: [
      {
        url: "/images/bookmarks/paris1.png",
        width: 500,
        height: 620,
        alt: "Paris themed personalized bookmark by Rainbow Trove",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="bg-[#fffaf5] text-[#4A4A4A]">
      <section className="bg-[linear-gradient(135deg,#fffaf5_0%,#f5e6df_48%,#e7efdf_100%)]">
        <div className="mx-auto grid max-w-6xl gap-7 px-5 py-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex rounded-full bg-[#fffaf5]/85 px-4 py-2 text-sm font-bold text-[#9f6f68] shadow-sm shadow-[#eadbd5]">
              Handmade gifts with a little extra sparkle
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-[#4A4A4A] sm:text-5xl lg:text-6xl">
              Thoughtful personalized gifts made with color, creativity, and care.
            </h1>
            <p className="mt-4 text-lg leading-7 text-[#6f625c]">
              Rainbow Trove makes personalized bookmarks, stickers, and keepsake bundles
              that turn everyday moments into something bright and memorable.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#best-sellers"
                className="rounded-full bg-[#b8837a] px-6 py-3 text-center text-sm font-bold text-[#fffaf5] shadow-lg shadow-[#eadbd5] transition hover:bg-[#9f6f68]"
              >
                Shop Best Sellers
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[#d9c9bd] bg-[#fffaf5] px-6 py-3 text-center text-sm font-bold text-[#8a7467] transition hover:bg-[#f3e8e2]"
              >
                Start a Custom Order
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-[#6f625c]">
              Personalized bookmarks, stickers, mugs, tumblers, coasters, and custom gifts
              made for readers, teachers, sports fans, and everyday celebrations.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="self-start overflow-hidden rounded-[2rem] bg-[#fffaf5] p-4 shadow-xl shadow-[#eadbd5]">
              <Image
                src="/images/bookmarks/paris1.png"
                alt="Paris themed handmade bookmark"
                width={500}
                height={620}
                className="h-72 w-full rounded-[1.5rem] object-cover"
                priority
              />
            </div>
            <div className="grid gap-4 sm:pt-6">
              <div className="rounded-[2rem] bg-[#fffaf5] p-4 shadow-xl shadow-[#dfe8d7]">
                <Image
                  src="/images/stickers/reader1.png"
                  alt="Bookish reader sticker"
                  width={420}
                  height={420}
                  className="h-44 w-full rounded-[1.5rem] object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[2rem] bg-[#fffaf5] p-4 shadow-xl shadow-[#eadbd5]">
                <Image
                  src="https://i.etsystatic.com/44513884/r/il/20b6f8/5832098894/il_fullxfull.5832098894_8koa.jpg"
                  alt="Personalized glass tumbler with bamboo lid"
                  width={420}
                  height={420}
                  className="h-44 w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="best-sellers" className="scroll-mt-24 bg-[#f7f0e8]">
        <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6f8565]">Best Sellers</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#4A4A4A]">Gift-ready favorites</h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {bestSellers.map((product) => (
              <article
                key={product.title}
                className="group relative overflow-hidden rounded-3xl bg-[#fffdf9] shadow-sm shadow-[#e5d8cb] transition hover:-translate-y-1 hover:shadow-lg focus-within:outline focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-[#7e5752]"
              >
                <div className="relative h-64 bg-[#f3e8e2]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition group-hover:scale-[1.02]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-[#fffaf5] px-3 py-1 text-xs font-bold text-[#9f6f68] shadow-sm">
                    {product.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-[#4A4A4A]">{product.title}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm font-bold text-[#6f625c]">{product.price}</p>
                    <Link
                      href={`/products/${product.id}`}
                      aria-label={`Shop now: ${product.title}`}
                      className="after:absolute after:inset-0 text-sm font-bold text-[#9f6f68] hover:text-[#7e5752] focus-visible:outline-none"
                    >
                      Shop now
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9f6f68]">
              Featured Collections
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#4A4A4A]">Shop by Collection</h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-[#9f6f68] hover:text-[#7e5752]">
            View all products
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCategories.map((category) => (
            <article
              key={category.title}
              className="rounded-3xl border border-[#eadbd5] bg-[#fffdf9] p-7 shadow-sm shadow-[#eadbd5] transition hover:-translate-y-1 hover:shadow-xl"
            >
              <span className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${category.accent}`}>
                {category.icon}
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-[#4A4A4A]">{category.title}</h3>
              <p className="mt-3 leading-7 text-[#6f625c]">{category.description}</p>
              <Link
                href={category.href}
                className="mt-5 inline-flex text-sm font-bold text-[#9f6f68] hover:text-[#7e5752]"
              >
                {category.cta} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] border border-[#dfe8d7] bg-[#eef4e8] p-8 text-[#4f5f49] shadow-sm shadow-[#dfe8d7] sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#6f8565]">Custom Orders</p>
            <h2 className="mt-3 text-3xl font-extrabold">Make it personal</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-[#65795d]">
              Add names, favorite colors, dates, classroom themes, book quotes, or a
              handwritten-style message. Share the occasion and Rainbow Trove will help
              shape a gift that feels made for them.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-[#fffaf5] px-6 py-3 text-sm font-bold text-[#8a7467] transition hover:bg-[#f3e8e2]"
            >
              Request a Custom Gift
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
        <div className="rounded-[2rem] border border-[#eadbd5] bg-[#fffdf9] p-8 shadow-sm shadow-[#eadbd5] sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9f6f68]">Our Story</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#4A4A4A]">Handmade with care, color, and meaning.</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#6f625c]">
            Rainbow Trove began with meaningful handmade gifts for loved ones and grew
            into a shop for personalized treasures, cheerful everyday pieces, and custom
            designs made to feel personal.
          </p>
          <Link href="/about" className="mt-6 inline-flex text-sm font-bold text-[#9f6f68] hover:text-[#7e5752]">
            Read more about Rainbow Trove →
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#eadbd5] bg-[#fffaf5]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-[#6f625c] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="font-bold text-[#4A4A4A]">Rainbow Trove</p>
          <p>Copyright 2026 Rainbow Trove. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
