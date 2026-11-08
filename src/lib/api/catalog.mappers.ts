import type { ServiceContent } from "@/lib/catalog/services.types";

import type { ServiceDto } from "./catalog.contract";

/**
 * Texts of a published service that the website puts over its editorial page.
 *
 * @param service Service as the backend sends it.
 * @returns The slug, the name and the short and long descriptions when the backend has them.
 */
export function toServiceContent(service: ServiceDto): ServiceContent {
  return { slug: service.slug, title: service.name, cardSummary: service.shortDescription, lead: service.description };
}

/**
 * Normalizes a name into the slug format the backend accepts (`^[a-z0-9]+(?:-[a-z0-9]+)*$`).
 *
 * @param name Name typed by the admin, e.g. "Dental cleaning & polish".
 * @returns The slug, e.g. `dental-cleaning-polish`.
 */
export function slugFrom(name: string): string {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
