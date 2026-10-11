import type { Metadata } from "next";

import { ComingSoonSection } from "@/components/sections/ComingSoonSection";
import { SiteShell } from "@/components/sections/SiteShell";

import { PRIVACY_PATH } from "./page.constants";

/** Metadata of the privacy page. */
export const metadata: Metadata = {
  title: "Privacy · CONVET",
  robots: { index: false },
};

/**
 * Privacy page: placeholder until the content is ready.
 *
 * @returns The rendered element.
 */
export default function PrivacyPage() {
  return (
    <SiteShell current={PRIVACY_PATH}>
      <ComingSoonSection title="Privacy" />
    </SiteShell>
  );
}
