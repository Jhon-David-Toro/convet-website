import type { Metadata } from "next";

import { StaffInventory } from "@/components/sections/StaffInventory";

export const metadata: Metadata = {
  title: "Inventory · CONVET staff",
};

/**
 * Inventory page of the staff area: the products of the clinic with what is on hand and their lots.
 *
 * @returns The rendered element.
 */
export default function StaffInventoryPage() {
  return <StaffInventory />;
}
