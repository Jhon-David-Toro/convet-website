import type { PetEvent } from "@/lib/customer/customer.types";

import type { MedicalRecordDto } from "./medical-records.contract";

const CLINIC_TIME_ZONE = "America/Aruba";

const DEFAULT_VISIT_TITLE = "Visit";

/**
 * Date as the history shows it, in the clinic's time zone.
 *
 * @param iso Moment in ISO format.
 * @returns The date, e.g. "Sep 11, 2026".
 */
function dateLabel(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: CLINIC_TIME_ZONE, month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));
}

/**
 * Year of a moment in the clinic's time zone.
 *
 * @param iso Moment in ISO format.
 * @returns The year as text.
 */
function yearOf(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: CLINIC_TIME_ZONE, year: "numeric" }).format(new Date(iso));
}

/**
 * Joins the pieces of text a record has, skipping the missing ones.
 *
 * @param parts Texts that may be missing.
 * @returns The texts on separate sentences, or an empty string.
 */
function joinText(...parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * Turns a medical record into history events: the visit and, when the vet prescribed one, its treatment.
 *
 * @param record Record as the backend sends it.
 * @returns One or two events for the timeline of the pet.
 */
export function toPetEvents(record: MedicalRecordDto): PetEvent[] {
  const when = record.appointment?.startsAt ?? record.createdAt;
  const vet = record.veterinarian?.user;
  const meta = [dateLabel(when), vet && `Dr. ${vet.firstName} ${vet.lastName}`].filter(Boolean).join(" · ");
  const year = yearOf(when);

  const visit: PetEvent = {
    id: record.idMedicalRecord,
    petId: record.petId,
    type: "visit",
    title: record.appointment?.branchService?.service.name ?? DEFAULT_VISIT_TITLE,
    meta,
    summary: joinText(record.diagnosis, record.observations, record.recommendations),
    year,
  };
  if (!record.treatment) return [visit];

  return [visit, { id: `${record.idMedicalRecord}-treatment`, petId: record.petId, type: "treatment", title: "Treatment", meta, summary: record.treatment, year }];
}
