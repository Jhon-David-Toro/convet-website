import type { Metadata } from "next";

import { ComingSoonSection } from "@/components/sections/ComingSoonSection";
import { SiteShell } from "@/components/sections/SiteShell";

import { TERMS_PATH } from "./page.constants";

/** Metadata of the terms page. */
export const metadata: Metadata = {
  title: "Terms · CONVET",
  robots: { index: false },
};

/**
 * Terms page: placeholder until the content is ready.
 *
 * @returns The rendered element.
 */
export default function TermsPage() {
  return (
    <SiteShell current={TERMS_PATH}>
      <ComingSoonSection title="Terms" />
    </SiteShell>
  );
}
