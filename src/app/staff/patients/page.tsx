import type { Metadata } from "next";

import { StaffPatients } from "@/components/sections/StaffPatients";

export const metadata: Metadata = {
  title: "Patients · CONVET staff",
};

/**
 * Patients page of the staff area: every animal registered at the clinic.
 *
 * @returns The rendered element.
 */
export default function StaffPatientsPage() {
  return <StaffPatients />;
}
