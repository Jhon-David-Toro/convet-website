import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PatientRecord } from "@/components/sections/PatientRecord";
import { Alert } from "@/components/ui/Alert";
import { isUuid } from "@/lib/api/api.contract";
import { loadData } from "@/lib/api/api.guard";
import { getStaffPatientRecord } from "@/lib/api/medical-records.api";
import { STAFF_PATIENT } from "@/lib/staff/staff.constants";

import { LOAD_ERROR_TITLE } from "./page.constants";
import type { PatientPageProps } from "./page.types";

export const metadata: Metadata = {
  title: "Patient record · CONVET staff",
};

/**
 * Patient record of the staff area. The pet and its medical records come from the backend; the sample patient keeps its demo record.
 *
 * @param props Props of the page, see {@link PatientPageProps}.
 * @param props.params Route parameters with the pet id.
 * @returns The rendered element.
 */
export default async function PatientPage({ params }: PatientPageProps) {
  const { petId } = await params;
  if (petId === STAFF_PATIENT.id) return <PatientRecord patient={STAFF_PATIENT} />;
  if (!isUuid(petId)) notFound();

  const { data, error } = await loadData(() => getStaffPatientRecord(petId));
  if (error) {
    return (
      <Alert tone="error" title={LOAD_ERROR_TITLE}>
        {error.message}
      </Alert>
    );
  }
  if (!data) notFound();

  return <PatientRecord patient={data.patient} record={data.record} />;
}
