import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { VisitRecord } from "@/components/sections/VisitRecord";
import { Alert } from "@/components/ui/Alert";
import { isUuid } from "@/lib/api/api.contract";
import { ApiError } from "@/lib/api/api.errors";
import { loadData } from "@/lib/api/api.guard";
import { getMedicalRecord } from "@/lib/api/medical-records.api";
import { getPetForStaff } from "@/lib/api/pets.api";
import { toStaffPatient, toVisitForm } from "@/lib/api/staff-records.mappers";
import { STAFF_PATIENT, STAFF_VISIT } from "@/lib/staff/staff.constants";

import { saveVisitAction } from "./actions";
import { LOAD_ERROR_TITLE } from "./page.constants";
import type { VisitPageProps } from "./page.types";

export const metadata: Metadata = {
  title: "Visit record · CONVET staff",
};

/**
 * Loads a medical record and its pet for the visit form.
 *
 * @param idMedicalRecord Id of the record.
 * @returns The visit and the patient, or `undefined` when either does not exist.
 */
async function loadVisit(idMedicalRecord: string) {
  try {
    const record = await getMedicalRecord(idMedicalRecord);
    const pet = await getPetForStaff(record.petId);
    return pet ? { visit: toVisitForm(record), patient: toStaffPatient(pet) } : undefined;
  } catch (error) {
    if (error instanceof ApiError && error.kind === "not-found") return undefined;
    throw error;
  }
}

/**
 * Visit record of the staff area: the medical record from the backend, saved back when the vet saves the draft or signs it.
 * The sample visit keeps its demo record.
 *
 * @param props Props of the page, see {@link VisitPageProps}.
 * @param props.params Route parameters with the visit (medical record) id.
 * @returns The rendered element.
 */
export default async function VisitPage({ params }: VisitPageProps) {
  const { visitId } = await params;
  if (visitId === STAFF_VISIT.id) return <VisitRecord visit={STAFF_VISIT} patient={STAFF_PATIENT} />;
  if (!isUuid(visitId)) notFound();

  const { data, error } = await loadData(() => loadVisit(visitId));
  if (error) {
    return (
      <Alert tone="error" title={LOAD_ERROR_TITLE}>
        {error.message}
      </Alert>
    );
  }
  if (!data) notFound();

  return <VisitRecord visit={data.visit} patient={data.patient} onSave={saveVisitAction.bind(null, visitId)} />;
}
