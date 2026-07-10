"use client";

import Link from "next/link";
import Image from "next/image";
import { useActionState, useMemo, useState } from "react";
import { sendCustomOrder, type ContactFormState } from "../contact/actions";

const productTypes = [
  "Bookmark",
  "Sticker or decal",
  "Mug or tumbler",
  "Coaster",
  "Car coasters",
  "Ceramic coasters",
  "Tote bag",
  "Phone wallet",
  "Other custom gift",
];

const initialState: ContactFormState = {
  status: "idle",
  message: "",
};

type CustomOrderProps = {
  productContext?: {
    name: string;
    price: number;
    href: string;
    image: string;
    productType: string;
    designOptions?: {
      label: string;
      image?: string;
    }[];
  };
};

export default function CustomOrder({ productContext }: CustomOrderProps) {
  const [state, formAction, pending] = useActionState(sendCustomOrder, initialState);
  const designOptions = useMemo(
    () => productContext?.designOptions ?? [],
    [productContext?.designOptions],
  );
  const [selectedDesign, setSelectedDesign] = useState(
    designOptions[0]?.label ?? "New custom idea",
  );
  const selectedDesignImage =
    designOptions.find((design) => design.label === selectedDesign)?.image;

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-[#eadbd5] bg-[#fffdf9] p-6 shadow-sm shadow-[#eadbd5]"
    >
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9f6f68]">
          Custom Order Request
        </p>
        <h2 className="mt-3 text-2xl font-extrabold text-[#4A4A4A]">Tell us what you have in mind</h2>
        <p className="mt-3 leading-7 text-[#6f625c]">
          Share the product, personalization details, colors, theme, and when you need it.
          We will follow up by email with questions, options, and a quote.
        </p>
      </div>

      {productContext ? (
        <div className="mt-6 border-l-4 border-[#b8837a] bg-[#f8efea] px-4 py-4">
          <div className="flex gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#fffaf5]">
              <Image
                src={productContext.image}
                alt={productContext.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9f6f68]">
                Customizing
              </p>
              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-extrabold text-[#4A4A4A]">{productContext.name}</p>
                  <p className="mt-1 text-sm font-bold text-[#9f6f68]">
                    ${productContext.price.toFixed(2)}
                  </p>
                </div>
                <Link
                  href={productContext.href}
                  className="text-sm font-bold text-[#9f6f68] hover:text-[#7e5752]"
                >
                  View product
                </Link>
              </div>
            </div>
          </div>

          {productContext.designOptions?.length ? (
            <fieldset className="mt-5">
              <legend className="text-xs font-bold uppercase tracking-[0.18em] text-[#9f6f68]">
                Choose a design
              </legend>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#6f625c]">
                Choose an existing design to personalize, or select a new custom idea
                and describe what you have in mind below.
              </p>
              {selectedDesignImage ? (
                <div className="mt-3 overflow-hidden rounded-2xl border border-[#eadbd5] bg-[#fffaf5]">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={selectedDesignImage}
                      alt={`${selectedDesign} design preview`}
                      fill
                      sizes="(min-width: 1024px) 420px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="px-3 py-2 text-sm font-bold text-[#7e5752]">
                    Preview: {selectedDesign}
                  </p>
                </div>
              ) : null}
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[...designOptions, { label: "New custom idea" }].map((design, index) => (
                  <label
                    key={design.label}
                    className="cursor-pointer rounded-2xl border border-[#eadbd5] bg-[#fffaf5] text-sm font-bold text-[#6f625c] transition focus-within:border-[#b8837a] hover:border-[#b8837a]"
                  >
                    <input
                      type="radio"
                      name="preferredDesign"
                      value={design.label}
                      defaultChecked={index === 0}
                      onChange={() => setSelectedDesign(design.label)}
                      className="peer sr-only"
                    />
                    {design.image ? (
                      <span className="relative block aspect-square overflow-hidden rounded-t-2xl bg-[#f3e8e2]">
                        <Image
                          src={design.image}
                          alt={design.label}
                          fill
                          sizes="(min-width: 640px) 160px, 45vw"
                          className="object-cover"
                        />
                      </span>
                    ) : null}
                    <span className="block rounded-2xl px-3 py-3 peer-checked:bg-[#b8837a] peer-checked:text-[#fffaf5]">
                      {design.label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}

          <input type="hidden" name="requestedProduct" value={productContext.name} />
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
          <span>Website</span>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-[#6f625c]">Name</span>
          <input
            type="text"
            name="name"
            required
            className="mt-2 w-full rounded-2xl border border-[#eadbd5] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#4A4A4A] outline-none transition placeholder:text-[#9b8b83] focus:border-[#b8837a]"
            placeholder="Your name"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-[#6f625c]">Email</span>
          <input
            type="email"
            name="email"
            required
            className="mt-2 w-full rounded-2xl border border-[#eadbd5] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#4A4A4A] outline-none transition placeholder:text-[#9b8b83] focus:border-[#b8837a]"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-[#6f625c]">Product type</span>
          <select
            name="productType"
            required
            className="mt-2 w-full rounded-2xl border border-[#eadbd5] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#4A4A4A] outline-none transition focus:border-[#b8837a]"
            defaultValue={productContext?.productType ?? ""}
          >
            <option value="" disabled>
              Choose a product
            </option>
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-bold text-[#6f625c]">Needed by</span>
          <input
            type="date"
            name="neededBy"
            className="mt-2 w-full rounded-2xl border border-[#eadbd5] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#4A4A4A] outline-none transition focus:border-[#b8837a]"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="text-sm font-bold text-[#6f625c]">Personalization details</span>
        <textarea
          name="personalization"
          rows={4}
          className="mt-2 w-full rounded-2xl border border-[#eadbd5] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#4A4A4A] outline-none transition placeholder:text-[#9b8b83] focus:border-[#b8837a]"
          placeholder="Names, dates, quotes, colors, school/team/theme, design ideas..."
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-bold text-[#6f625c]">Additional order details</span>
        <textarea
          name="message"
          rows={5}
          required
          className="mt-2 w-full rounded-2xl border border-[#eadbd5] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#4A4A4A] outline-none transition placeholder:text-[#9b8b83] focus:border-[#b8837a]"
          placeholder="Tell us about the occasion, quantity, budget range, or anything else we should know."
        />
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-[#b8837a] px-6 py-3 text-sm font-bold text-[#fffaf5] shadow-lg shadow-[#eadbd5] transition hover:bg-[#9f6f68] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending..." : "Send Request"}
        </button>
        <p className="text-sm font-semibold text-[#6f625c]">
          We&apos;ll respond within 1–2 business days.
        </p>
      </div>

      {state.message ? (
        <p
          aria-live="polite"
          className={`mt-4 text-sm font-bold ${
            state.status === "success" ? "text-[#5f7657]" : "text-[#9f5f58]"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
