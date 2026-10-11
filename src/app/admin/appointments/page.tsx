import type { Metadata } from "next";

import { AdminAppointments } from "@/components/sections/AdminAppointments";

export const metadata: Metadata = {
  title: "Appointments · CONVET admin",
};

/**
 * Appointments page of the admin area.
 *
 * @returns The rendered element.
 */
export default function AdminAppointmentsPage() {
  return <AdminAppointments />;
}
