import type { Metadata } from "next";
import { Suspense } from "react";

import { CustomerAppointments } from "@/components/sections/CustomerAppointments";

export const metadata: Metadata = {
  title: "Appointments · CONVET",
};

/**
 * Appointments page of the customer area. The page reads the query string (`?cancel=`), so it renders inside `Suspense`.
 *
 * @returns The rendered element.
 */
export default function CustomerAppointmentsPage() {
  return (
    <Suspense>
      <CustomerAppointments />
    </Suspense>
  );
}
