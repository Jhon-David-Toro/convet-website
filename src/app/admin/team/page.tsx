import type { Metadata } from "next";

import { AdminTeam } from "@/components/sections/AdminTeam";
import { loadData } from "@/lib/api/api.guard";
import { getTeam } from "@/lib/api/staff.api";

import { setStaffActiveAction } from "./actions";

export const metadata: Metadata = {
  title: "Team · CONVET admin",
};

/**
 * Team page of the admin area. The staff members and their branches come from the backend; a failure shows an error state.
 *
 * @returns The rendered element.
 */
export default async function AdminTeamPage() {
  const { data: members = [], error } = await loadData(getTeam);

  return <AdminTeam members={members} loadError={error?.message} actions={{ setActive: setStaffActiveAction }} />;
}
