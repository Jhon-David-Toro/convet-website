import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { QuickAccessSection } from "@/components/sections/QuickAccessSection";
import { SiteShell } from "@/components/sections/SiteShell";
import { clinicJsonLd, jsonLdText } from "@/lib/site/seo.utils";

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
