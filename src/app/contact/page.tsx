import type { Metadata } from "next";

import { CONTACT_DESCRIPTION, ContactSection } from "@/components/sections/ContactSection";
import { SiteShell } from "@/components/sections/SiteShell";

import { CONTACT_PATH } from "./page.constants";

/** Metadata of the contact page. */
export const metadata: Metadata = {
  title: "Contact · CONVET",
  description: CONTACT_DESCRIPTION,
};

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
