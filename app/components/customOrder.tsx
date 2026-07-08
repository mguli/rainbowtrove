"use client";

import { useActionState } from "react";
import { sendCustomOrder, type ContactFormState } from "../contact/actions";

const productTypes = [
  "Bookmark",
  "Sticker or decal",
  "Mug or tumbler",
  "Coaster",
  "Tote bag",
  "Phone wallet",
  "Other custom gift",
];

const initialState: ContactFormState = {
  status: "idle",
  message: "",
};

export default function CustomOrder() {
  const [state, formAction, pending] = useActionState(sendCustomOrder, initialState);

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
            defaultValue=""
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

      <button
        type="submit"
        disabled={pending}
        className="mt-6 rounded-full bg-[#b8837a] px-6 py-3 text-sm font-bold text-[#fffaf5] shadow-lg shadow-[#eadbd5] transition hover:bg-[#9f6f68] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Request"}
      </button>

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
