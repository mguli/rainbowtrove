import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import products from "../data/products.json";

const staticRoutes = [
  { path: "", priority: 1 },
  { path: "/products", priority: 0.9 },
  { path: "/about", priority: 0.7 },
  { path: "/contact", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.priority,
  }));

  const productPages = products.map((product) => ({
    url: `${SITE_URL}/products/${product.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
