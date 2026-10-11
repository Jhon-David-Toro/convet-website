import { BOOKING_HREF } from "../site/site.constants";
import { whatsappLink } from "../site/whatsapp";
import { SERVICES } from "./services.constants";
import type { ServiceItem } from "./services.types";

/**
 * Finds a service by its URL segment.
 *
 * @param slug URL segment of the service.
 * @returns The service, or `undefined` when there is none.
 */
export function findService(slug: string): ServiceItem | undefined {
  return SERVICES.find((service) => service.slug === slug);
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
 * @returns The related services that exist, in the order of the service data.
 */
export function relatedServices(service: ServiceItem): ServiceItem[] {
  return SERVICES.filter((candidate) => service.related.includes(candidate.slug));
}
