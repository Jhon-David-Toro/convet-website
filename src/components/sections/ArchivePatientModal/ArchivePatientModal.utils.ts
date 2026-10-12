import { RETENTION_YEARS } from "./ArchivePatientModal.constants";

/**
 * Title of the confirmation.
 *
 * @param name Name of the patient.
 * @returns For example "Archive Rocky?".
 */
export function archiveTitle(name: string): string {
  return `Archive ${name}?`;
}

/**
 * What archiving a patient does to it.
 *
 * @param name Name of the patient.
 * @returns The sentence under the title.
 */
export function archiveDescription(name: string): string {
  return `${name} will be hidden from lists and booking. The clinical history is kept (min. ${RETENTION_YEARS} years) and can be restored by an admin.`;
}

/**
 * Message of the toast once a patient is archived.
 *
 * @param name Name of the patient.
 * @returns For example "Rocky was archived."
 */
export function archivedMessage(name: string): string {
  return `${name} was archived.`;
}
