import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail, ServiceMobileBar } from "@/components/sections/ServiceDetail";
import { SiteShell } from "@/components/sections/SiteShell";
import { getPublicServiceContent } from "@/lib/api/catalog.api";
import { SERVICES } from "@/lib/catalog/services.constants";
import { findService, publishedServices, relatedServices } from "@/lib/catalog/services.utils";
import { breadcrumbJsonLd, jsonLdText, pageMetadata, serviceJsonLd } from "@/lib/site/seo.utils";

import { SERVICES_PATH } from "../page.constants";
import type { ServicePageProps } from "./page.types";

/**
 * Pre-renders one page per editorial service; the backend decides at request time which of them are published.
 *
 * @returns The `slug` of every service.
 */
export function generateStaticParams() {
  return SERVICES.map(({ slug }) => ({ slug }));
}

/**
 * Services the website shows right now (published by the backend, or the editorial list without it).
 *
 * @returns The services.
 */
async function currentServices() {
  return publishedServices(await getPublicServiceContent());
}

/**
 * Title and description of a service page.
 *
 * @param props Props of the page, see {@link ServicePageProps}.
 * @param props.params Route parameters with the service `slug`.
 * @returns The metadata of the page, or an empty object for an unknown service.
 */
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = findService((await params).slug, await currentServices());
  return service ? pageMetadata({ title: service.title, description: service.lead, path: `${SERVICES_PATH}/${service.slug}` }) : {};
}

/**
 * Detail page of a service; unknown or unpublished slugs show the 404 page.
 *
 * @param props Props of the page, see {@link ServicePageProps}.
 * @param props.params Route parameters with the service `slug`.
 * @returns The rendered element.
 */
export default async function ServicePage({ params }: ServicePageProps) {
  const services = await currentServices();
  const service = findService((await params).slug, services);
  if (!service) notFound();

  const path = `${SERVICES_PATH}/${service.slug}`;
  const structuredData = [
    serviceJsonLd({ name: service.title, description: service.lead, path }),
    breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: SERVICES_PATH }, { name: service.title, path }]),
  ];

  return (
    <SiteShell current={SERVICES_PATH} mobileBar={<ServiceMobileBar service={service} />}>
      {structuredData.map((data) => (
        <script key={data["@type"]} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdText(data) }} />
      ))}
      <ServiceDetail service={service} related={relatedServices(service, services)} />
    </SiteShell>
  );
}
