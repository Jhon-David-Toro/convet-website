import type { Metadata } from "next";

import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { QuickAccessSection } from "@/components/sections/QuickAccessSection";
import { SiteShell } from "@/components/sections/SiteShell";
import { clinicJsonLd, jsonLdText } from "@/lib/site/seo.utils";

/** The home page keeps the site title and description of the root layout and declares its own canonical address. */
export const metadata: Metadata = { alternates: { canonical: "/" } };

/**
 * Home page of the clinic: hero, quick access and location inside the shared page frame.
 *
 * @returns The rendered element.
 */
export default function Home() {
  return (
    <SiteShell current="/">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdText(clinicJsonLd()) }} />
      <HeroSection />
      <QuickAccessSection />
      <LocationSection />
    </SiteShell>
  );
}
