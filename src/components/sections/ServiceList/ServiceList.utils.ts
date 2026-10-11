import { SERVICE_FILTERS } from "@/lib/catalog/services.constants";
import type { ServiceItem } from "@/lib/catalog/services.types";

import { ALL_FILTER } from "./ServiceList.constants";
import type { ServiceCounts, ServiceFilterValue } from "./ServiceList.types";

/**
 * Services that match a species filter.
 *
 * @param services Every service of the list.
 * @param filter Selected filter.
 * @returns The services offered for that species, or all of them for `all`.
 */
export function filterServices(services: ServiceItem[], filter: ServiceFilterValue): ServiceItem[] {
  if (filter === ALL_FILTER) return services;
  return services.filter((service) => service.species.includes(filter));
}

/**
 * Number of services every filter would show.
 *
 * @param services Every service of the list.
 * @returns The count of every filter value.
 */
export function countServices(services: ServiceItem[]): ServiceCounts {
  const entries = SERVICE_FILTERS.map(({ value }) => [value, filterServices(services, value).length]);
  return Object.fromEntries(entries) as ServiceCounts;
}
