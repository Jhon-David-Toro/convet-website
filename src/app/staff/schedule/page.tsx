import type { Metadata } from "next";

import { StaffAppointments } from "@/components/sections/StaffAppointments";

export const metadata: Metadata = {
  title: "Schedule · CONVET staff",
};

/**
 * Appointments page of the staff area.
 *
 * @returns The rendered element.
 */
export default function StaffSchedulePage() {
  return <StaffAppointments />;
}
