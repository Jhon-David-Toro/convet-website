import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { CUSTOMER_PETS_HREF } from "@/lib/customer/customer.paths.constants";
import type { PetEvent, PetItem, PetVaccine, WeightPoint } from "@/lib/customer/customer.types";
import { petHref } from "@/lib/customer/customer.utils";

import { FACT_LABELS, MY_PETS_LABEL, TAB_LABELS, WEIGHT_HEIGHT_RANGE, WEIGHT_MIN_HEIGHT } from "./PetProfile.constants";
import type { EventGroup, HistoryFilter, PetFactItem, PetTab, WeightBar } from "./PetProfile.types";

/**
 * Counts that appear next to the tabs of a pet profile.
 *
 * @param vaccines Vaccines of the pet.
 * @returns The count of every tab that has one.
 */
export function tabCounts(vaccines: PetVaccine[]): Partial<Record<PetTab, number>> {
  return { vaccines: vaccines.length };
}

/**
 * Events that match a history filter.
 *
 * @param events Every event of the pet.
 * @param filter Selected filter.
 * @returns The matching events, in the same order.
 */
export function filterEvents(events: PetEvent[], filter: HistoryFilter): PetEvent[] {
  return filter === "all" ? events : events.filter((event) => event.type === filter);
}

/**
 * Groups events by year, keeping the order of the events.
 *
 * @param events Events, newest first.
 * @returns One group per year.
 */
export function groupByYear(events: PetEvent[]): EventGroup[] {
  const groups: EventGroup[] = [];
  for (const event of events) {
    const group = groups.find((candidate) => candidate.year === event.year);
    if (group) group.events.push(event);
    else groups.push({ year: event.year, events: [event] });
  }
  return groups;
}

/**
 * Bars of the weight chart: the height grows with the weight and the latest bar is the current one.
 *
 * @param weights Weight points, oldest first.
 * @returns One bar per point with its height in percent.
 */
export function weightBars(weights: WeightPoint[]): WeightBar[] {
  const values = weights.map((point) => point.value);
  const min = Math.min(...values);
  const span = Math.max(Math.max(...values) - min, Number.EPSILON);

  return weights.map(({ label, value }, index) => ({
    label,
    height: WEIGHT_MIN_HEIGHT + (WEIGHT_HEIGHT_RANGE * (value - min)) / span,
    current: index === weights.length - 1,
  }));
}

/**
 * Breadcrumb trail of a pet profile: My pets, the pet and the open tab.
 *
 * @param pet Pet of the profile.
 * @param tab Open tab.
 * @returns The items of the trail; the last one is the current page.
 */
export function petBreadcrumbs(pet: PetItem, tab: PetTab): BreadcrumbItem[] {
  return [{ label: MY_PETS_LABEL, href: CUSTOMER_PETS_HREF }, { label: pet.name, href: petHref(pet) }, { label: TAB_LABELS[tab] }];
}

/**
 * Facts shown next to the name of a pet: microchip, latest weight and vet.
 *
 * @param pet Pet to describe.
 * @returns The facts, in display order.
 */
export function petFacts(pet: PetItem): PetFactItem[] {
  return [
    { label: FACT_LABELS.microchip, value: pet.microchip, mono: true },
    { label: FACT_LABELS.weight, value: `${pet.weight} · ${pet.weightDate}` },
    { label: FACT_LABELS.vet, value: pet.vet },
  ];
}

/**
 * Latest weight of a pet as text, e.g. "18.4 kg".
 *
 * @param weights Weight points, oldest first.
 * @returns The last weight with its unit.
 */
export function latestWeight(weights: WeightPoint[]): string {
  return `${weights.at(-1)?.value} kg`;
}

/**
 * Number of vaccines that are overdue.
 *
 * @param vaccines Vaccines of the pet.
 * @returns The count of overdue vaccines.
 */
export function overdueCount(vaccines: PetVaccine[]): number {
  return vaccines.filter((vaccine) => vaccine.status === "overdue").length;
}
