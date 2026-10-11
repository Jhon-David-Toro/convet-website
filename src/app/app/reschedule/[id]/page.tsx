import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RescheduleFlow } from "@/components/sections/RescheduleFlow";
import { CUSTOMER_APPOINTMENTS } from "@/lib/customer.constants";

import type { ReschedulePageProps } from "./page.types";

export const metadata: Metadata = {
  title: "Reschedule · CONVET",
};

/**
 * Reschedule page: moves an upcoming appointment to another day and time.
 *
 * @param props Props of the page, see {@link ReschedulePageProps}.
 * @param props.params Route parameters.
 * @returns The rendered element.
 */
export default async function ReschedulePage({ params }: ReschedulePageProps) {
  const { id } = await params;
  const appointment = CUSTOMER_APPOINTMENTS.find((item) => item.id === id && item.status !== "cancelled" && item.status !== "completed");
  if (!appointment) notFound();

  return <RescheduleFlow appointment={appointment} />;
}
