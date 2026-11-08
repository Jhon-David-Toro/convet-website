import type { Metadata } from "next";

import { PageIntro } from "@/components/sections/PageIntro";
import { ServiceList } from "@/components/sections/ServiceList";
import { SiteShell } from "@/components/sections/SiteShell";
import { getPublicServiceContent } from "@/lib/api/catalog.api";
import { pageMetadata } from "@/lib/site/seo.utils";

import { SERVICES_INTRO, SERVICES_PATH } from "./page.constants";

/** Metadata of the services page. */
export const metadata: Metadata = pageMetadata({ title: "Services", description: SERVICES_INTRO.description, path: "/services" });

/**
 * Services page: introduction band and the list of services with their species filter. The services the backend publishes
 * decide which ones are listed; without the backend the editorial list is shown.
 *
 * @returns The rendered element.
 */
export default async function ServicesPage() {
  const content = await getPublicServiceContent();

  return (
    <SiteShell current={SERVICES_PATH}>
      <PageIntro {...SERVICES_INTRO} />
      <ServiceList content={content} />
    </SiteShell>
  );
}
