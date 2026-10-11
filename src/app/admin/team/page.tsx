import type { Metadata } from "next";

import { AdminTeam } from "@/components/sections/AdminTeam";

export const metadata: Metadata = {
  title: "Team · CONVET admin",
};

/**
 * Team page of the admin area.
 *
 * @returns The rendered element.
 */
export default function AdminTeamPage() {
  return <AdminTeam />;
}
