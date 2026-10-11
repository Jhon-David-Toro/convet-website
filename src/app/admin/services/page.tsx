import type { Metadata } from "next";

import { AdminServices } from "@/components/sections/AdminServices";

export const metadata: Metadata = {
  title: "Services · CONVET admin",
};

/**
 * Services page of the admin area.
 *
 * @returns The rendered element.
 */
export default function AdminServicesPage() {
  return <AdminServices />;
}
