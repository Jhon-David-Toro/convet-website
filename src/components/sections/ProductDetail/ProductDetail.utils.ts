import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/catalog/products.constants";
import type { ProductItem } from "@/lib/catalog/products.types";

import { PRODUCTS_CRUMB } from "./ProductDetail.constants";

/**
 * Breadcrumb trail of a product page: Products, its category and the product itself.
 *
 * @param product Product the page describes.
 * @returns The items of the trail; the last one is the current page.
 */
export function productBreadcrumbs(product: ProductItem): BreadcrumbItem[] {
  return [PRODUCTS_CRUMB, { label: PRODUCT_CATEGORY_LABELS[product.category], href: PRODUCTS_CRUMB.href }, { label: product.name }];
}

/**
 * Species of a product as a short badge text, e.g. "Dogs · Cats".
 *
 * @param product Product to describe.
 * @returns The species joined with a dot.
 */
export function speciesBadge(product: ProductItem): string {
  return product.species.map((species) => species[0].toUpperCase() + species.slice(1)).join(" · ");
}
