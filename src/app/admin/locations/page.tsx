import type { Metadata } from "next";

import { AdminLocations } from "@/components/sections/AdminLocations";

export const metadata: Metadata = {
  title: "Locations · CONVET admin",
};

/**
 * Locations page of the admin area.
 *
 * @returns The rendered element.
 */
export default function AdminLocationsPage() {
  return <AdminLocations />;
}
