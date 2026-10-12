import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { SiteShell } from "@/components/sections/SiteShell";
import { PRIVACY_DOCUMENT } from "@/lib/site/legal.constants";

import { PRIVACY_PATH } from "./page.constants";

/** Metadata of the privacy page. */
export const metadata: Metadata = {
  title: "Privacy policy · CONVET",
  description: PRIVACY_DOCUMENT.intro,
  robots: { index: false },
};

/**
 * Privacy policy page.
 *
 * @returns The rendered element.
 */
export default function PrivacyPage() {
  return (
    <SiteShell current={PRIVACY_PATH}>
      <LegalPage document={PRIVACY_DOCUMENT} />
    </SiteShell>
  );
}
