import type { StatusView } from "@/components/patterns/StatusBadge";
import type { ServiceRow } from "@/lib/admin.types";

import { ONLINE_VIEWS } from "./AdminServices.constants";
import type { ServiceDraft } from "./AdminServices.types";

/**
 * Values the booking rules form starts with for a service.
 *
 * @param service Service selected in the table.
 * @returns The draft with the saved values of the service.
 */
export function draftOf(service: ServiceRow): ServiceDraft {
  return { duration: String(service.duration), buffer: String(service.buffer), online: service.online, species: service.species, price: service.price };
}

/**
 * Adds a species to the list, or removes it when it is already there.
 *
 * @param species Species selected now.
 * @param value Species to flip.
 * @returns The new list.
 */
export function flipSpecies(species: string[], value: string): string[] {
  return species.includes(value) ? species.filter((item) => item !== value) : [...species, value];
}

/**
 * Text of the duration column.
 *
 * @param service Service of the row.
 * @returns For example "30 min".
 */
export function durationLabel(service: ServiceRow): string {
  return `${service.duration} min`;
}

/**
 * Badge of the online column: bookable, or only for the staff.
 *
 * @param service Service of the row.
 * @returns The tone, icon and label of its state.
 */
export function onlineView(service: ServiceRow): StatusView {
  return ONLINE_VIEWS[service.online ? "bookable" : "staff-only"];
}
