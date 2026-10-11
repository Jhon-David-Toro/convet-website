import type { Metadata } from "next";

import { AdminSuppliers } from "@/components/sections/AdminSuppliers";

export const metadata: Metadata = {
  title: "Suppliers · CONVET admin",
};

/**
 * Suppliers page of the admin area.
 *
 * @returns The rendered element.
 */
export default function AdminSuppliersPage() {
  return <AdminSuppliers />;
}
