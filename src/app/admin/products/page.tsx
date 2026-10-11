import type { Metadata } from "next";

import { AdminProducts } from "@/components/sections/AdminProducts";

export const metadata: Metadata = {
  title: "Products · CONVET admin",
};

/**
 * Products catalog page of the admin area.
 *
 * @returns The rendered element.
 */
export default function AdminProductsPage() {
  return <AdminProducts />;
}
