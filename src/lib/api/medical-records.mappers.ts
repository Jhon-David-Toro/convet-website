import type { PetEvent, PetHealthRecord, PetItem } from "@/lib/customer/customer.types";

import type { MedicalRecordDto, UpdateMedicalRecordDto } from "./medical-records.contract";

const CLINIC_TIME_ZONE = "America/Aruba";

const DEFAULT_VISIT_TITLE = "Visit";

/**
 * Date as the history shows it, in the clinic's time zone.
 *
 * @param iso Moment in ISO format.
 * @returns The date, e.g. "Sep 11, 2026".
 */
export function dateLabel(iso: string): string {
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

/**
 * Keeps the clinical texts that have content, trimmed: the backend rejects blank texts and cannot clear a field.
 *
 * @param dto Texts typed in the visit record.
 * @returns The texts to send.
 */
export function nonBlankTexts(dto: UpdateMedicalRecordDto): UpdateMedicalRecordDto {
  const entries = Object.entries(dto).map(([field, text]) => [field, text?.trim()] as const);
  return Object.fromEntries(entries.filter(([, text]) => Boolean(text)));
}

const NOT_RECORDED = "—";

/**
 * Date and vet of a record, e.g. "Sep 11, 2026 · Dr. Shirley Croes".
 *
 * @param record Medical record.
 * @returns The line.
 */
function recordMeta(record: MedicalRecordDto): string {
  const vet = record.veterinarian?.user;
  return [dateLabel(record.appointment?.startsAt ?? record.createdAt), vet && `Dr. ${vet.firstName} ${vet.lastName}`].filter(Boolean).join(" · ");
}

/**
 * Builds the health record page of one pet from its medical records. Vaccines, weight and the next appointment are not in the
 * backend yet, so they show as not recorded.
 *
 * @param pet Pet of the customer.
 * @param records Medical records of the pet, newest first.
 * @returns The record the page shows.
 */
export function toHealthRecord(pet: PetItem, records: MedicalRecordDto[]): PetHealthRecord {
  const [latest] = records;
  const oldest = records.at(-1);
  const treated = records.filter((record) => record.treatment);
  const vet = latest?.veterinarian?.user;
  return {
    petId: pet.id,
    description: pet.profileLine,
    born: "",
    primaryVet: vet ? `Dr. ${vet.firstName} ${vet.lastName}` : NOT_RECORDED,
    weightLabel: NOT_RECORDED,
    vaccines: { value: NOT_RECORDED, caption: "Not recorded yet" },
    treatments: { value: String(treated.length), caption: treated[0]?.treatment ?? "None prescribed" },
    lastVisit: latest
      ? { value: dateLabel(latest.appointment?.startsAt ?? latest.createdAt), caption: latest.appointment?.branchService?.service.name ?? DEFAULT_VISIT_TITLE }
      : { value: NOT_RECORDED, caption: "No visits yet" },
    nextAppointment: { value: NOT_RECORDED, caption: "See your appointments" },
    events: records.flatMap(toPetEvents),
    medications: treated.map((record) => ({ name: record.treatment ?? "", detail: recordMeta(record), active: false })),
    diagnoses: records.filter((record) => record.diagnosis).map((record) => ({ title: record.diagnosis ?? "", meta: recordMeta(record), text: record.observations ?? "" })),
    firstVisit: oldest && dateLabel(oldest.appointment?.startsAt ?? oldest.createdAt),
  };
}
