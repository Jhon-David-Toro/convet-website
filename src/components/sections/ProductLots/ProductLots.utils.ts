import type { StatGridItem } from "@/components/patterns/StatGrid";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { AlertTriangle, Box, Calendar } from "@/components/ui/Icon";
import { ADMIN_NAV_HREFS } from "@/lib/admin/admin.paths.constants";
import type { ProductDetail } from "@/lib/admin/admin.types";

import { BREADCRUMB_STOCK } from "./ProductLots.constants";

/**
 * Path shown above the product: stock, its category and the product.
 *
 * @param product Product shown.
 * @returns The breadcrumb items; the last one is the current page.
 */
export function productCrumbs(product: ProductDetail): BreadcrumbItem[] {
  return [{ label: BREADCRUMB_STOCK, href: ADMIN_NAV_HREFS.stock }, { label: product.category, href: ADMIN_NAV_HREFS.stock }, { label: product.name }];
}

/**
 * The three figures of the product: usable stock, next lot to expire and blocked stock.
 *
 * @param product Product shown.
 * @returns The stat cards.
 */
export function productStats(product: ProductDetail): StatGridItem[] {
  return [
    { label: "Usable stock", value: product.usable.value, caption: product.usable.caption, icon: Calendar, tone: "default" },
    { label: "Next to expire", value: product.nextExpiry.value, caption: product.nextExpiry.caption, icon: Box, tone: "warning" },
    { label: "Blocked", value: product.blocked.value, caption: product.blocked.caption, icon: AlertTriangle, tone: "critical" },
  ];
}

/**
 * Text of a movement quantity with its sign: "+20" or "−1".
 *
 * @param quantity Units of the movement; negative when stock leaves.
 * @returns The quantity with its sign.
 */
export function signedQuantity(quantity: number): string {
  return quantity > 0 ? `+${quantity}` : `−${Math.abs(quantity)}`;
}
