type ProductIdentityInput = {
  title: string;
  category: string;
  tags?: string[];
};

export type ProductCtaInput = ProductIdentityInput & {
  id: string;
  personalizable?: boolean;
  collections?: string[];
};

export function isDesignChoiceProduct(product: ProductIdentityInput) {
  const category = product.category.toLowerCase();
  const title = product.title.toLowerCase();
  const tags = product.tags?.join(" ").toLowerCase() ?? "";
  const searchableText = `${title} ${category} ${tags}`;

  return (
    searchableText.includes("car coaster") ||
    searchableText.includes("ceramic coaster")
  );
}

export function getProductCta(product: ProductCtaInput) {
  return {
    label: "View Details",
    href: `/products/${product.id}`,
  };
}
