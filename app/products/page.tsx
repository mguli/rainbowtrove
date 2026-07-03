import ProductCard from "../components/productCard";
import products from "../../data/products.json";

export default function Products() {
    return (
      <main className="bg-[#fffaf5] px-5 py-12 text-[#4A4A4A] lg:px-8">
        <section className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9f6f68]">
              Shop Rainbow Trove
            </p>
            <h1 className="mt-3 text-4xl font-extrabold">Handmade gifts and keepsakes</h1>
            <p className="mt-4 text-lg leading-8 text-[#6f625c]">
              Browse personalized bookmarks, stickers, mugs, cards, and thoughtful custom gifts.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                description={product.shortDescription}
                price={product.price}
              />
            ))}
          </div>
        </section>
      </main>
    );
  }
