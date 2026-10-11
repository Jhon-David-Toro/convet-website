import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductLots } from "@/components/sections/ProductLots";
import { PRODUCT_DETAIL } from "@/lib/admin.constants";

import type { ProductPageProps } from "./page.types";

export const metadata: Metadata = {
  title: "Product lots · CONVET admin",
};

/**
 * Product page of the admin inventory: its lots, movements and stock.
 *
 * @param props Props of the page, see {@link ProductPageProps}.
 * @param props.params Route parameters.
 * @returns The rendered element.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  if (productId !== PRODUCT_DETAIL.id) notFound();

  return <ProductLots product={PRODUCT_DETAIL} />;
}
