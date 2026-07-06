export type ProductCtaInput = {
  id: string;
  title: string;
  category: string;
  personalizable?: boolean;
  collections?: string[];
};

export function getProductCta(product: ProductCtaInput) {
  const category = product.category.toLowerCase();
  const title = product.title.toLowerCase();
  const isCustom = product.personalizable || product.collections?.includes("custom");

  if (category.includes("bookmark") || title.includes("bookmark")) {
    return {
      label: "View Details",
      href: `/products/${product.id}`,
    };
  }

  if (isCustom || title.includes("custom") || title.includes("personalized")) {
    return {
      label: "Personalize",
      href: `/contact?product=${encodeURIComponent(product.title)}`,
    };
  }

  return {
    label: "Shop Now",
    href: `/products/${product.id}`,
  };
}
