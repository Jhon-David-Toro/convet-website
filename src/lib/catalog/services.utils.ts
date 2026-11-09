import { BOOKING_HREF } from "../site/site.constants";
import { whatsappLink } from "../site/whatsapp";
import { SERVICES } from "./services.constants";
import type { ServiceContent, ServiceItem } from "./services.types";

/**
 * Services the website shows: the editorial pages of the services the backend publishes, with the backend's name and texts.
 * Without an answer from the backend, or when it publishes none of them, every editorial service is shown so the site never goes empty.
 *
 * @param content Published services from the backend; `undefined` when the backend could not be read.
 * @returns The services to show, in the order of the editorial data.
 */
export function publishedServices(content: ServiceContent[] | undefined): ServiceItem[] {
  const bySlug = new Map((content ?? []).map((item) => [item.slug, item]));
  const matched = SERVICES.filter((service) => bySlug.has(service.slug));
  if (matched.length === 0) return SERVICES;
  return matched.map((service) => withContent(service, bySlug.get(service.slug)));
}

/**
 * Puts the backend texts of a service over its editorial ones; empty texts keep the editorial copy.
 *
 * @param service Editorial service.
 * @param content Texts the backend sends for it.
 * @returns The service with the backend texts.
 */
function withContent(service: ServiceItem, content: ServiceContent | undefined): ServiceItem {
  if (!content) return service;
  return { ...service, title: content.title, cardSummary: content.cardSummary ?? service.cardSummary, lead: content.lead ?? service.lead };
}

/**
 * Finds a service by its URL segment.
 *
 * @param slug URL segment of the service.
 * @param services Services to look in; by default the editorial ones.
 * @returns The service, or `undefined` when there is none.
 */
export function findService(slug: string, services: ServiceItem[] = SERVICES): ServiceItem | undefined {
  return services.find((service) => service.slug === slug);
}

/**
 * Link of the booking page with the service preselected.
 *
 * @param service Service to book.
 * @returns The booking link.
 */
export function serviceBookingHref(service: ServiceItem): string {
  return `${BOOKING_HREF}?service=${service.slug}`;
}

/**
 * Link that starts the main action of a service: the booking page, or WhatsApp for services booked by the team.
 *
 * @param service Service to act on.
 * @returns The link of the main action.
 */
export function serviceActionHref(service: ServiceItem): string {
  return service.booking === "online" ? serviceBookingHref(service) : whatsappLink(service.whatsappText);
}

/**
 * Link of the detail page of a service.
 *
 * @param service Service to open.
 * @returns The detail link.
 */
export function serviceDetailHref(service: ServiceItem): string {
  return `/services/${service.slug}`;
}

/**
 * Services that are often booked together with another one.
 *
 * @param service Service the suggestions are for.
 * @param services Services to pick from; by default the editorial ones.
 * @returns The related services that exist, in the order of the service data.
 */
export function relatedServices(service: ServiceItem, services: ServiceItem[] = SERVICES): ServiceItem[] {
  return services.filter((candidate) => service.related.includes(candidate.slug));
}
