"use client";

import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  image: string;
  title: string;
  description: string;
  price: number;
  ctaLabel: string;
  ctaHref: string;
};

export default function ProductCard({
  image,
  title,
  description,
  price,
  ctaLabel,
  ctaHref,
}: ProductCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-[#eadbd5] bg-[#fffdf9] shadow-sm shadow-[#e5d8cb]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f3e8e2]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-extrabold leading-7 text-[#4A4A4A]">{title}</h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-[#6f625c]">{description}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-base font-bold text-[#9f6f68]">${price.toFixed(2)}</p>
          <Link
            href={ctaHref}
            aria-label={`${ctaLabel}: ${title}`}
            className="rounded-full bg-[#b8837a] px-4 py-2 text-sm font-bold text-[#fffaf5] transition hover:bg-[#9f6f68]"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
