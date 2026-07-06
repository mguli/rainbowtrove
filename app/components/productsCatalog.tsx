"use client";

import { useMemo, useState } from "react";
import { getProductCta } from "../lib/productCta";
import ProductCard from "./productCard";

type Product = {
  id: string;
  title: string;
  shortDescription: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  collections?: string[];
  personalizable?: boolean;
};

type ProductsCatalogProps = {
  products: Product[];
  initialCollection?: string;
  initialCategory?: string;
  initialSort?: string;
};

const collectionLabels: Record<string, string> = {
  all: "All collections",
  readers: "For Readers",
  teachers: "For Teachers",
  sports: "Sports Fans",
  everyday: "Everyday Favorites",
  custom: "Custom Made For You",
};

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "title-asc", label: "Name: A to Z" },
];

export default function ProductsCatalog({
  products,
  initialCollection = "all",
  initialCategory = "all",
  initialSort = "featured",
}: ProductsCatalogProps) {
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(products.map((product) => product.category))).sort()],
    [products],
  );
  const safeInitialCollection = collectionLabels[initialCollection] ? initialCollection : "all";
  const safeInitialCategory = categories.includes(initialCategory) ? initialCategory : "all";
  const safeInitialSort = sortOptions.some((option) => option.value === initialSort)
    ? initialSort
    : "featured";

  const [collection, setCollection] = useState(safeInitialCollection);
  const [category, setCategory] = useState(safeInitialCategory);
  const [sort, setSort] = useState(safeInitialSort);
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const nextProducts = products
      .filter((product) => collection === "all" || product.collections?.includes(collection))
      .filter((product) => category === "all" || product.category === category)
      .filter((product) => {
        if (!normalizedQuery) return true;

        const searchableText = [
          product.title,
          product.category,
          product.shortDescription,
          product.description,
          ...(product.tags || []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      });

    return [...nextProducts].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [category, collection, products, query, sort]);

  const hasActiveFilters =
    collection !== "all" || category !== "all" || sort !== "featured" || query.trim() !== "";

  return (
    <div className="mt-10">
      <div className="rounded-3xl border border-[#eadbd5] bg-[#fffdf9] p-5 shadow-sm shadow-[#eadbd5]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9f6f68]">
            Filter by collection
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(collectionLabels).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setCollection(value)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  collection === value
                    ? "bg-[#b8837a] text-[#fffaf5]"
                    : "bg-[#f3e8e2] text-[#8a7467] hover:bg-[#eadbd5]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_auto] lg:items-end">
          <label className="block">
            <span className="text-sm font-bold text-[#6f625c]">Search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search bookmarks, mugs, teachers..."
              className="mt-2 w-full rounded-2xl border border-[#eadbd5] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#4A4A4A] outline-none transition placeholder:text-[#9b8b83] focus:border-[#b8837a]"
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-[#6f625c]">Category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#eadbd5] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#4A4A4A] outline-none transition focus:border-[#b8837a]"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All categories" : option}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-[#6f625c]">Sort</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#eadbd5] bg-[#fffaf5] px-4 py-3 text-sm font-semibold text-[#4A4A4A] outline-none transition focus:border-[#b8837a]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={() => {
              setCollection("all");
              setCategory("all");
              setSort("featured");
              setQuery("");
            }}
            className="rounded-full border border-[#d9c9bd] px-5 py-3 text-sm font-bold text-[#8a7467] transition hover:bg-[#f3e8e2] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasActiveFilters}
          >
            Clear filters
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 text-sm font-semibold text-[#6f625c]">
        <p>
          Showing {filteredProducts.length} of {products.length} products
        </p>
        <p>{collectionLabels[collection] ?? "Filtered collection"}</p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const cta = getProductCta(product);

            return (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                description={product.shortDescription}
                price={product.price}
                ctaLabel={cta.label}
                ctaHref={cta.href}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-[#eadbd5] bg-[#fffdf9] p-8 text-center text-[#6f625c]">
          No products match those filters yet.
        </div>
      )}
    </div>
  );
}
