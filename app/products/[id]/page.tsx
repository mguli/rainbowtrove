import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ExternalLink, MessageCircle, ShoppingBag } from "lucide-react";
import { notFound } from "next/navigation";
import ProductGallery from "../../components/productGallery";
import { ETSY_SHOP_URL } from "../../lib/etsy";
import { SITE_NAME, SITE_URL } from "../../lib/site";
import products from "../../../data/products.json";

type Product = {
  id: string;
  title: string;
  displayTitle?: string;
  description: string;
  shortDescription: string;
  currency?: string;
  quantity?: number;
  price: number;
  image: string;
  images?: string[];
  category: string;
  tags?: string[];
  materials?: string[];
  collections?: string[];
  personalizable?: boolean;
  etsyUrl?: string;
  sku?: string;
};

const productList = products as Product[];

function findProduct(id: string) {
  return productList.find((item) => item.id === id);
}

function buildProductJsonLd(product: Product) {
  const productName = product.displayTitle ?? product.title;
  const productUrl = `${SITE_URL}/products/${product.id}`;
  const offerUrl = product.etsyUrl || productUrl;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    alternateName: product.title,
    description: product.shortDescription || product.description,
    image: Array.from(new Set([product.image, ...(product.images || [])])),
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    category: product.category,
    ...(product.sku ? { sku: product.sku } : {}),
    url: productUrl,
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: product.currency ?? "USD",
      availability:
        product.quantity && product.quantity > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url: offerUrl,
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
  };
}

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

export async function generateMetadata({ params }: ProductDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = findProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: `This ${SITE_NAME} product could not be found.`,
    };
  }

  const productName = product.displayTitle ?? product.title;
  const description = product.shortDescription || product.description;

  return {
    title: productName,
    description,
    alternates: {
      canonical: `/products/${product.id}`,
    },
    openGraph: {
      title: `${productName} | ${SITE_NAME}`,
      description,
      url: `/products/${product.id}`,
      type: "website",
      images: [
        {
          url: product.image,
          alt: productName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${productName} | ${SITE_NAME}`,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = await params;
  const product = findProduct(id);

  if (!product) {
    notFound();
  }

  const gallery = Array.from(new Set([product.image, ...(product.images || [])]));
  const contactHref = `/contact?productId=${encodeURIComponent(product.id)}`;
  const etsyHref = product.etsyUrl ?? ETSY_SHOP_URL;
  const productJsonLd = buildProductJsonLd(product);
  const productName = product.displayTitle ?? product.title;
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: `${SITE_URL}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: productName,
        item: `${SITE_URL}/products/${product.id}`,
      },
    ],
  };

  return (
    <main className="bg-[#fffaf5] px-5 py-12 text-[#4A4A4A] lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <section className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm font-semibold text-[#7d6d62]">
            <li>
              <Link href="/" className="hover:text-[#9f6f68]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <Link href="/products" className="hover:text-[#9f6f68]">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li aria-current="page" className="text-[#4A4A4A]">
              {productName}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <ProductGallery images={gallery} title={productName} />
          </div>

          <div className="rounded-3xl border border-[#eadbd5] bg-[#fffdf9] p-6 shadow-sm shadow-[#eadbd5] lg:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#9f6f68]">
              {product.category}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-[#4A4A4A] lg:text-4xl">
              {productName}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#6f625c]">{product.description}</p>
            <p className="mt-6 text-2xl font-extrabold text-[#9f6f68]">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={etsyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b8837a] px-6 py-3 text-sm font-bold text-[#fffaf5] transition hover:bg-[#9f6f68]"
              >
                <ShoppingBag aria-hidden="true" className="h-4 w-4" />
                {product.personalizable ? "Personalize on Etsy" : "Buy on Etsy"}
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
              <Link
                href={contactHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d9c9bd] bg-[#fffaf5] px-6 py-3 text-sm font-bold text-[#8a7467] transition hover:bg-[#f3e8e2]"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Ask a question
              </Link>
            </div>

            {!product.etsyUrl && (
              <p className="mt-3 text-sm font-semibold leading-6 text-[#8a7467]">
                This opens the Rainbow Trove Etsy shop. Add a product-specific Etsy link
                later to send customers straight to this listing.
              </p>
            )}

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
                  Perfect for
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
