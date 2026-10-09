import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { MobileQuickActions } from "@/components/sections/MobileQuickActions";
import { QuickAccessSection } from "@/components/sections/QuickAccessSection";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";

import { HOME_FOOTER, HOME_HEADER } from "./page.constants";

/**
 * Home page of the clinic: hero, quick access, location and footer.
 *
 * @returns The rendered element.
 */
export default function Home() {
  return (
    <>
      <Header {...HOME_HEADER} />
      <main>
        <HeroSection />
        <QuickAccessSection />
        <LocationSection />
      </main>
      <Footer {...HOME_FOOTER} />
      <MobileQuickActions />
    </>
  );
}
