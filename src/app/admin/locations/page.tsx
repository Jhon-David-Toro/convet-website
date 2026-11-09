import type { Metadata } from "next";

import { AdminLocations } from "@/components/sections/AdminLocations";
import { loadData } from "@/lib/api/api.guard";
import { getBranches } from "@/lib/api/branches.api";
import { toLocationInfo } from "@/lib/api/branches.mappers";

import { saveBranchPhoneAction, setBranchActiveAction } from "./actions";

export const metadata: Metadata = {
  title: "Locations · CONVET admin",
};

/**
 * Locations page of the admin area. The branches come from the backend; a failure shows an error state.
 *
 * @returns The rendered element.
 */
export default async function AdminLocationsPage() {
  const { data: branches = [], error } = await loadData(getBranches);

  return (
    <AdminLocations
      locations={branches.map(toLocationInfo)}
      loadError={error?.message}
      actions={{ setActive: setBranchActiveAction, savePhone: saveBranchPhoneAction }}
    />
  );
}
