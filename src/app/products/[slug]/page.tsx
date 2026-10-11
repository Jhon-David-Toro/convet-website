import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/sections/ProductDetail";
import { SiteShell } from "@/components/sections/SiteShell";
import { PRODUCTS } from "@/lib/products.constants";
import { findProduct } from "@/lib/products.utils";

import { PRODUCTS_PATH } from "../page.constants";
import type { ProductPageProps } from "./page.types";

/**
 * Pre-renders one page per product.
 *
 * @returns The `slug` of every product.
 */
export function generateStaticParams() {
  return PRODUCTS.map(({ slug }) => ({ slug }));
}

/**
 * Title and description of a product page.
 *
 * @param props Props of the page, see {@link ProductPageProps}.
 * @param props.params Route parameters with the product `slug`.
 * @returns The metadata of the page, or an empty object for an unknown product.
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = findProduct((await params).slug);
  return product ? { title: `${product.name} · CONVET`, description: product.description, alternates: { canonical: `/products/${product.slug}` } } : {};
}

/**
 * Detail page of a product; unknown slugs show the 404 page.
 *
 * @param props Props of the page, see {@link ProductPageProps}.
 * @param props.params Route parameters with the product `slug`.
 * @returns The rendered element.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const product = findProduct((await params).slug);
  if (!product) notFound();

  return (
    <SiteShell current={PRODUCTS_PATH}>
      <ProductDetail product={product} />
    </SiteShell>
  );
}
