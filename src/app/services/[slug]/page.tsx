import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail, ServiceMobileBar } from "@/components/sections/ServiceDetail";
import { SiteShell } from "@/components/sections/SiteShell";
import { SERVICES } from "@/lib/services.constants";
import { findService } from "@/lib/services.utils";

import { SERVICES_PATH } from "../page.constants";
import type { ServicePageProps } from "./page.types";

/**
 * Pre-renders one page per service.
 *
 * @returns The `slug` of every service.
 */
export function generateStaticParams() {
  return SERVICES.map(({ slug }) => ({ slug }));
}

/**
 * Title and description of a service page.
 *
 * @param props Props of the page, see {@link ServicePageProps}.
 * @param props.params Route parameters with the service `slug`.
 * @returns The metadata of the page, or an empty object for an unknown service.
 */
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = findService((await params).slug);
  return service ? { title: `${service.title} · CONVET`, description: service.lead, alternates: { canonical: `${SERVICES_PATH}/${service.slug}` } } : {};
}

/**
 * Detail page of a service; unknown slugs show the 404 page.
 *
 * @param props Props of the page, see {@link ServicePageProps}.
 * @param props.params Route parameters with the service `slug`.
 * @returns The rendered element.
 */
export default async function ServicePage({ params }: ServicePageProps) {
  const service = findService((await params).slug);
  if (!service) notFound();

  return (
    <SiteShell current={SERVICES_PATH} mobileBar={<ServiceMobileBar service={service} />}>
      <ServiceDetail service={service} />
    </SiteShell>
  );
}
