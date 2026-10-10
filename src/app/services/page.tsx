import type { Metadata } from "next";

import { PageIntro } from "@/components/sections/PageIntro";
import { ServiceList } from "@/components/sections/ServiceList";
import { SiteShell } from "@/components/sections/SiteShell";

import { SERVICES_INTRO, SERVICES_PATH } from "./page.constants";

/** Metadata of the services page. */
export const metadata: Metadata = {
  title: "Services · CONVET",
  description: SERVICES_INTRO.description,
};

/**
 * Services page: introduction band and the list of services with their species filter.
 *
 * @returns The rendered element.
 */
export default function ServicesPage() {
  return (
    <SiteShell current={SERVICES_PATH}>
      <PageIntro {...SERVICES_INTRO} />
      <ServiceList />
    </SiteShell>
  );
}
