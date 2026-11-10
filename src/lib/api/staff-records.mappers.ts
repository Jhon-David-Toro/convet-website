import type { StaffClient, StaffClientPet, StaffPatient, StaffTimelineEntry, StaffVisitForm, StaffVisitSummary } from "@/lib/staff/staff.types";

import type { MedicalRecordDetailDto, MedicalRecordDto, UpdateMedicalRecordDto } from "./medical-records.contract";
import { dateLabel } from "./medical-records.mappers";
import type { PetDto } from "./pets.contract";
import { toPetItem } from "./pets.mappers";
import type { UserDto } from "./users.contract";

const STAFF_SPECIES: Record<string, StaffPatient["species"]> = { dog: "dog", cat: "cat" };

const NOT_RECORDED = "—";

const VISIT_TITLE = "Visit";

/**
 * Turns a pet into the header of the staff patient record. Microchip, weight, allergies and vaccines are not in the backend yet.
 *
 * @param pet Pet as the backend sends it to the clinic.
 * @param today Day used to work out the age.
 * @returns The patient to show.
 */
export function toStaffPatient(pet: PetDto, today: Date = new Date()): StaffPatient {
  const item = toPetItem(pet, today);
  return {
    id: pet.idPet,
    name: pet.name,
    species: STAFF_SPECIES[pet.species.toLowerCase()] ?? "dog",
    description: item.profileLine,
    summary: item.summary,
    allergy: "",
    microchip: NOT_RECORDED,
    weight: NOT_RECORDED,
    currentWeight: NOT_RECORDED,
    nextVisit: NOT_RECORDED,
    rabiesBadge: "",
    ownerId: pet.ownerId ?? "",
  };
}

/**
 * Turns a pet into the row shown on the client page. Vaccine status is not in the backend yet, so the badge is left out.
 *
 * @param pet Pet as the backend sends it.
 * @returns The pet row.
 */
function toStaffClientPet(pet: PetDto): StaffClientPet {
  const item = toPetItem(pet);
  return { id: pet.idPet, species: STAFF_SPECIES[pet.species.toLowerCase()] ?? "dog", name: pet.name, description: item.profileLine };
}

/**
 * Turns a user and their pets into the staff client page. Appointments are left empty: the backend has no
 * endpoint yet to list a client's appointments for staff.
 *
 * @param user User as the backend sends it.
 * @param pets Pets of that user, as the backend sends them.
 * @returns The client to show.
 */
export function toStaffClient(user: UserDto, pets: PetDto[]): StaffClient {
  return {
    id: user.idUser,
    name: `${user.firstName} ${user.lastName}`,
    phone: user.mobileNumber,
    email: user.email,
    since: user.createdAt ? `Client since ${dateLabel(user.createdAt)}` : "",
    pets: pets.filter((pet) => pet.isActive !== false).map(toStaffClientPet),
    appointments: [],
  };
}

/**
 * Title and "date · vet · branch" line of a medical record.
 *
 * @param record Medical record.
 * @returns The title and the meta line.
 */
function visitHeading(record: MedicalRecordDto): Pick<StaffVisitSummary, "title" | "meta"> {
  const vet = record.veterinarian ? `Dr. ${record.veterinarian.user.lastName}` : undefined;
  const meta = [dateLabel(record.appointment?.startsAt ?? record.createdAt), vet, record.appointment?.branch?.name].filter(Boolean).join(" · ");
  return { title: record.appointment?.branchService?.service.name ?? VISIT_TITLE, meta };
}

/**
 * Turns a medical record into the "last visit" card. Vitals and internal notes are not in the backend yet.
 *
 * @param record Medical record, newest first.
 * @returns The visit card.
 */
export function toVisitSummary(record: MedicalRecordDto): StaffVisitSummary {
  return {
    ...visitHeading(record),
    vitals: { weight: NOT_RECORDED, temperature: NOT_RECORDED, heartRate: NOT_RECORDED },
    findings: record.observations ?? "",
    diagnosis: record.diagnosis ?? "",
    plan: record.treatment ?? "",
    internalNotes: "",
    sharedSummary: record.recommendations ?? "",
  };
}

/**
 * History entries of the patient record: the older visits and every treatment the vets prescribed.
 *
 * @param records Medical records, newest first.
 * @returns The entries, the newest first.
 */
export function toStaffTimeline(records: MedicalRecordDto[]): StaffTimelineEntry[] {
  return records.flatMap((record, index) => {
    const heading = visitHeading(record);
    const visit: StaffTimelineEntry = { id: `${record.idMedicalRecord}-visit`, type: "visit", ...heading, summary: record.diagnosis ?? record.observations ?? "" };
    const treatment: StaffTimelineEntry | undefined = record.treatment
      ? { id: `${record.idMedicalRecord}-treatment`, type: "treatment", title: record.treatment, meta: heading.meta, summary: record.recommendations ?? "" }
      : undefined;
    return [index > 0 ? visit : undefined, treatment].filter((entry): entry is StaffTimelineEntry => Boolean(entry));
  });
}

/**
 * Turns a medical record into the visit form of the staff area. Vitals, vaccines and internal notes are not in the backend yet,
 * so they start empty; the clinical texts map to the record fields.
 *
 * @param record Medical record with its appointment.
 * @returns The visit to edit.
 */
export function toVisitForm(record: MedicalRecordDetailDto): StaffVisitForm {
  const heading = visitHeading(record);
  return {
    id: record.idMedicalRecord,
    patientId: record.petId,
    headline: `${heading.title} · ${heading.meta}`,
    reason: "",
    weight: "",
    temperature: "",
    heartRate: "",
    findings: record.observations ?? "",
    diagnosis: record.diagnosis ?? "",
    plan: record.treatment ?? "",
    vaccine: "",
    nextDose: "",
    lot: { code: NOT_RECORDED, expires: NOT_RECORDED, dosesLeft: 0 },
    internalNotes: "",
    ownerSummary: record.recommendations ?? "",
    lastWeight: "",
    lastVisit: { title: heading.title, text: record.diagnosis ?? "", document: "" },
    draftSaved: "",
  };
}

/**
 * Body of `PATCH /medical-records/:id` from the visit form.
 *
 * @param values Clinical texts of the form.
 * @param values.findings Findings of the exam.
 * @param values.diagnosis Diagnosis.
 * @param values.plan Treatment plan.
 * @param values.ownerSummary Summary shared with the owner.
 * @returns The texts to send.
 */
export function toMedicalRecordUpdate({ findings, diagnosis, plan, ownerSummary }: Record<"findings" | "diagnosis" | "plan" | "ownerSummary", string>): UpdateMedicalRecordDto {
  return { observations: findings, diagnosis, treatment: plan, recommendations: ownerSummary };
}
