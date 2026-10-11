import type { MetadataRoute } from "next";

import { PRODUCTS } from "@/lib/catalog/products.constants";
import { SERVICES } from "@/lib/catalog/services.constants";
import { SITE_URL } from "@/lib/site/seo.constants";

const STATIC_PATHS = ["", "/services", "/products", "/contact"];

/**
 * Pages search engines should index: the home, the lists and the detail page of every service and product.
 *
 * @returns One entry per public page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...SERVICES.map(({ slug }) => `/services/${slug}`), ...PRODUCTS.map(({ slug }) => `/products/${slug}`)];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
