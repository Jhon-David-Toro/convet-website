import type { Metadata } from "next";

import { CONTACT_DESCRIPTION, ContactSection } from "@/components/sections/ContactSection";
import { SiteShell } from "@/components/sections/SiteShell";

import { CONTACT_PATH } from "./page.constants";
import { pageMetadata } from "@/lib/site/seo.utils";

/** Metadata of the contact page. */
export const metadata: Metadata = pageMetadata({ title: "Contact", description: CONTACT_DESCRIPTION, path: "/contact" });

/**
 * Contact page: message form, quick contact, map and opening hours.
 *
 * @returns The rendered element.
 */
export default function ContactPage() {
  return (
    <SiteShell current={CONTACT_PATH}>
      <ContactSection />
    </SiteShell>
  );
}
