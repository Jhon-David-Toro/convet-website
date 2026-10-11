import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PatientRecord } from "@/components/sections/PatientRecord";
import { STAFF_PATIENT } from "@/lib/staff/staff.constants";

import type { PatientPageProps } from "./page.types";

export const metadata: Metadata = {
  title: "Patient record · CONVET staff",
};

/**
 * Patient record page of the staff area.
 *
 * @param props Props of the page, see {@link PatientPageProps}.
 * @param props.params Route parameters.
 * @returns The rendered element.
 */
export default async function PatientPage({ params }: PatientPageProps) {
  const { petId } = await params;
  if (petId !== STAFF_PATIENT.id) notFound();

  return <PatientRecord patient={STAFF_PATIENT} />;
}
