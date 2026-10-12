import type { Metadata } from "next";

import { NotFoundSection } from "@/components/sections/NotFoundSection";
import { SiteShell } from "@/components/sections/SiteShell";

/** Metadata of the not found page. */
export const metadata: Metadata = {
  title: "Page not found · CONVET",
  robots: { index: false },
};

/**
 * Page shown for any address that does not exist, inside the frame of the public site.
 *
 * @returns The rendered element.
 */
export default function NotFound() {
  return (
    <SiteShell current="">
      <NotFoundSection />
    </SiteShell>
  );
}
