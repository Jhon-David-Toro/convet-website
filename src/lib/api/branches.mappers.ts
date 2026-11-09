import { LOCATION } from "@/lib/admin/admin.constants";
import type { LocationInfo } from "@/lib/admin/admin.types";

import type { BranchDto } from "./branches.contract";

/**
 * Turns a branch into the location card of the admin area. Opening hours and closures are not in the backend yet, so they keep
 * the clinic's published ones.
 *
 * @param branch Branch as the backend sends it.
 * @returns The location to show.
 */
export function toLocationInfo(branch: BranchDto): LocationInfo {
  const place = [branch.address, branch.city, branch.department].filter(Boolean).join(", ");
  return {
    id: branch.idBranch,
    name: branch.name,
    subtitle: branch.timeZone ? `${place} · ${branch.timeZone}` : place,
    phone: branch.phone ?? "",
    whatsapp: branch.phone ?? "",
    active: branch.isActive,
    hours: LOCATION.hours,
    closures: LOCATION.closures,
  };
}
