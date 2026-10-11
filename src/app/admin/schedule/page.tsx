import type { Metadata } from "next";

import { StaffToday } from "@/components/sections/StaffToday";

export const metadata: Metadata = {
  title: "Schedule · CONVET admin",
};

/**
 * Schedule page of the admin area: the same schedule by vet the clinic staff sees.
 *
 * @returns The rendered element.
 */
export default function AdminSchedulePage() {
  return <StaffToday />;
}
