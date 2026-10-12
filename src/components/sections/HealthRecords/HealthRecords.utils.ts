import type { PetEvent } from "@/lib/customer/customer.types";

import type { RecordFilter, RecordYearGroup } from "./HealthRecords.types";

/**
 * Events that match a history filter.
 *
 * @param events Every event of the pet.
 * @param filter Selected filter.
 * @returns The matching events, in the same order.
 */
export function filterRecordEvents(events: PetEvent[], filter: RecordFilter): PetEvent[] {
  return filter === "all" ? events : events.filter((event) => event.type === filter);
}

/**
 * Groups events by year, keeping the order of the events.
 *
 * @param events Events, newest first.
 * @returns One group per year.
 */
export function groupRecordsByYear(events: PetEvent[]): RecordYearGroup[] {
  const groups: RecordYearGroup[] = [];
  for (const event of events) {
    const group = groups.find((candidate) => candidate.year === event.year);
    if (group) group.events.push(event);
    else groups.push({ year: event.year, events: [event] });
  }
  return groups;
}
