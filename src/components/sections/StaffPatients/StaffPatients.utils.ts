import type { RowMenuItem } from "@/components/patterns/RowMenu";
import { Calendar, Clipboard, Edit, Eye, Trash, User } from "@/components/ui/Icon";
import { STAFF_CLIENT, STAFF_PATIENT } from "@/lib/staff/staff.constants";
import { STAFF_PATIENT_ROWS } from "@/lib/staff/staff.patients.constants";
import { STAFF_CLIENTS_HREF, STAFF_NEW_APPOINTMENT_HREF, STAFF_PATIENTS_HREF } from "@/lib/staff/staff.paths.constants";
import type { StaffPatientRow } from "@/lib/staff/staff.types";

import { ALL_VALUE, CHIP_OTHER, CHIP_UPCOMING, MAIN_SPECIES, SPECIES_NAMES } from "./StaffPatients.constants";
import type { PatientFilters } from "./StaffPatients.types";

/**
 * Whether a patient matches what was typed in the search: name, owner or phone.
 *
 * @param patient Patient to check.
 * @param query Text typed by the user.
 * @returns `true` when the query is empty or found in the name, the owner or the phone.
 */
function matchesQuery(patient: StaffPatientRow, query: string): boolean {
  const text = query.trim().toLowerCase();
  return !text || `${patient.name} ${patient.owner} ${patient.phone}`.toLowerCase().includes(text);
}

/**
 * Whether a patient belongs to the chip that is on.
 *
 * @param patient Patient to check.
 * @param chip Value of the chip: all, a species, other species or upcoming visit.
 * @returns `true` when the patient is shown by the chip.
 */
function matchesChip(patient: StaffPatientRow, chip: string): boolean {
  if (chip === ALL_VALUE) return true;
  if (chip === CHIP_UPCOMING) return Boolean(patient.vetId);
  if (chip === CHIP_OTHER) return !MAIN_SPECIES.includes(patient.species);
  return patient.species === chip;
}

/**
 * Patients that pass every filter of the page.
 *
 * @param filters Filters chosen by the user.
 * @returns The matching patients, in the order of the list.
 */
export function filterPatients(filters: PatientFilters): StaffPatientRow[] {
  return STAFF_PATIENT_ROWS.filter(
    (patient) =>
      matchesQuery(patient, filters.query) &&
      matchesChip(patient, filters.chip) &&
      (filters.species === ALL_VALUE || patient.species === filters.species) &&
      (filters.vet === ALL_VALUE || patient.vetId === filters.vet) &&
      (filters.vaccine === ALL_VALUE || patient.vaccine === filters.vaccine),
  );
}

/**
 * Page of the patient record. The sample data has a single record, so every patient opens it.
 *
 * @returns The path of the record.
 */
export function patientHref(): string {
  return `${STAFF_PATIENTS_HREF}/${STAFF_PATIENT.id}`;
}

/**
 * Actions of the "..." menu of a row.
 *
 * @param onArchive Called when the archive action is chosen.
 * @returns The items of the menu; the last one is destructive.
 */
export function rowMenuItems(onArchive: () => void): RowMenuItem[] {
  const record = patientHref();
  return [
    { label: "View patient record", icon: Eye, href: record },
    { label: "Clinical history", icon: Clipboard, href: record },
    { label: "Edit patient", icon: Edit, href: record },
    { label: "Book appointment", icon: Calendar, href: STAFF_NEW_APPOINTMENT_HREF },
    { label: "View owner (client)", icon: User, href: `${STAFF_CLIENTS_HREF}/${STAFF_CLIENT.id}` },
    { label: "Archive patient", icon: Trash, onSelect: onArchive, tone: "destructive" },
  ];
}

/**
 * Line under the name of a pet: its species and breed.
 *
 * @param patient Patient of the row.
 * @returns The text, e.g. "Dog · Mixed breed".
 */
export function breedLine(patient: StaffPatientRow): string {
  return `${SPECIES_NAMES[patient.species]} · ${patient.breed}`;
}
