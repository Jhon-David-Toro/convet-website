import type { Metadata } from "next";

import { PageIntro } from "@/components/sections/PageIntro";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { SiteShell } from "@/components/sections/SiteShell";
import { PRODUCTS } from "@/lib/products.constants";

import { PRODUCTS_INTRO, PRODUCTS_PATH } from "./page.constants";

/** Metadata of the products page. */
export const metadata: Metadata = {
  title: "Products · CONVET",
  description: PRODUCTS_INTRO.description,
};

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
