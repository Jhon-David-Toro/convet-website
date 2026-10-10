import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import type { ServiceItem } from "@/lib/services.types";

import { SERVICES_CRUMB } from "./ServiceDetail.constants";

/**
 * Breadcrumb trail of a service page: Home, Services and the service itself.
 *
 * @param service Service the page describes.
 * @returns The items of the trail; the last one is the current page.
 */
export function serviceBreadcrumbs(service: ServiceItem): BreadcrumbItem[] {
  return [{ label: "Home", href: "/" }, SERVICES_CRUMB, { label: service.title }];
}
