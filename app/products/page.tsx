import ProductsCatalog from "../components/productsCatalog";
import products from "../../data/products.json";

type ProductsPageProps = {
  searchParams: Promise<{
    collection?: string;
    category?: string;
    sort?: string;
  }>;
};

export default async function Products({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  return (
    <main className="bg-[#fffaf5] px-5 py-12 text-[#4A4A4A] lg:px-8">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9f6f68]">
            Shop Rainbow Trove
          </p>
          <h1 className="mt-3 text-4xl font-extrabold">Handmade gifts and keepsakes</h1>
          <p className="mt-4 text-lg leading-8 text-[#6f625c]">
            Search and filter personalized bookmarks, stickers, mugs, cards, and thoughtful custom gifts.
          </p>
        </div>

        <ProductsCatalog
          products={products}
          initialCollection={params.collection}
          initialCategory={params.category}
          initialSort={params.sort}
        />
      </section>
    </main>
  );
}
