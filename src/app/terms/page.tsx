import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { SiteShell } from "@/components/sections/SiteShell";
import { TERMS_DOCUMENT } from "@/lib/site/legal.constants";

import { TERMS_PATH } from "./page.constants";

/** Metadata of the terms page. */
export const metadata: Metadata = {
  title: "Terms & conditions · CONVET",
  description: TERMS_DOCUMENT.intro,
  robots: { index: false },
};

/**
 * Terms and conditions page.
 *
 * @returns The rendered element.
 */
export default function TermsPage() {
  return (
    <SiteShell current={TERMS_PATH}>
      <LegalPage document={TERMS_DOCUMENT} />
    </SiteShell>
  );
}
