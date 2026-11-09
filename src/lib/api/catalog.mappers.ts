import type { ServiceContent } from "@/lib/catalog/services.types";

import { ApiError } from "./api.errors";
import type { ServiceDto } from "./catalog.contract";

/** Text the backend writes when another service or category already has the slug ("A service with this slug already exists"). */
const SLUG_TAKEN_PATTERN = /slug already exists/i;

/** Message of the `slug` field error of a taken slug, for the forms that show it. */
export const SLUG_TAKEN_MESSAGE = "This slug is already used by another entry.";

/**
 * Tells whether a failed call means the slug is already used. Services and categories answer a taken slug with 400 and a plain
 * message, not with 409 like branches. `fieldErrorsFrom` files a plain message under its first word, so the text is searched among
 * all the field errors.
 *
 * @param error What the call threw.
 * @returns `true` when the backend refused the call because the slug is taken.
 */
export function isSlugTaken(error: unknown): boolean {
  return error instanceof ApiError && error.kind === "validation" && Object.values(error.fieldErrors ?? {}).some((text) => SLUG_TAKEN_PATTERN.test(text));
}

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
