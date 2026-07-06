import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "../../components/productGallery";
import products from "../../../data/products.json";

type Product = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  tags?: string[];
  materials?: string[];
  collections?: string[];
  personalizable?: boolean;
};

const productList = products as Product[];

export function generateStaticParams() {
  return productList.map((product) => ({
    id: product.id,
  }));
}

type ProductDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = await params;
  const product = productList.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const gallery = Array.from(new Set([product.image, ...(product.images || [])]));
  const contactHref = `/contact?product=${encodeURIComponent(product.title)}`;

  return (
    <main className="bg-[#fffaf5] px-5 py-12 text-[#4A4A4A] lg:px-8">
      <section className="mx-auto max-w-6xl">
        <Link href="/products" className="text-sm font-bold text-[#9f6f68] hover:text-[#7f5d57]">
          Back to products
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <ProductGallery images={gallery} title={product.title} />
          </div>

          <div className="rounded-3xl border border-[#eadbd5] bg-[#fffdf9] p-6 shadow-sm shadow-[#eadbd5] lg:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9f6f68]">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#4A4A4A] lg:text-4xl">
              {product.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#6f625c]">{product.description}</p>
            <p className="mt-6 text-2xl font-extrabold text-[#9f6f68]">
              ${product.price.toFixed(2)}
            </p>

            <Link
              href={contactHref}
              className="mt-7 inline-flex rounded-full bg-[#b8837a] px-6 py-3 text-sm font-bold text-[#fffaf5] transition hover:bg-[#9f6f68]"
            >
              {product.personalizable ? "Personalize this gift" : "Ask about this item"}
            </Link>

            {product.materials?.length ? (
              <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#9f6f68]">
                  Materials
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.materials.map((material) => (
                    <span
                      key={material}
                      className="rounded-full bg-[#f3e8e2] px-3 py-1 text-xs font-bold text-[#7d6d62]"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {product.tags?.length ? (
              <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#9f6f68]">
                  Good for
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.tags.slice(0, 8).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#edf2e6] px-3 py-1 text-xs font-bold text-[#65735d]"
                    >
                      {tag.replaceAll("_", " ")}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
