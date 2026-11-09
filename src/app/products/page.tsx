import type { Metadata } from "next";

import { PageIntro } from "@/components/sections/PageIntro";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { SiteShell } from "@/components/sections/SiteShell";
import { PRODUCTS } from "@/lib/catalog/products.constants";

import { PRODUCTS_INTRO, PRODUCTS_PATH } from "./page.constants";
import { pageMetadata } from "@/lib/site/seo.utils";

/** Metadata of the products page. */
export const metadata: Metadata = pageMetadata({ title: "Products", description: PRODUCTS_INTRO.description, path: "/products" });

/**
 * Products page: introduction band and the filterable catalog.
 *
 * @returns The rendered element.
 */
export default function ProductsPage() {
  return (
    <SiteShell current={PRODUCTS_PATH}>
      <PageIntro {...PRODUCTS_INTRO} />
      <ProductCatalog products={PRODUCTS} />
    </SiteShell>
  );
}
