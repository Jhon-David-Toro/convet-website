import type { Metadata } from "next";

import { AdminStock } from "@/components/sections/AdminStock";

export const metadata: Metadata = {
  title: "Stock · CONVET admin",
};

/**
 * Stock page of the admin area.
 *
 * @returns The rendered element.
 */
export default function AdminStockPage() {
  return <AdminStock />;
}
