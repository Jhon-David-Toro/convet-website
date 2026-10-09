import { EmergencyCard } from "@/components/patterns/EmergencyCard";
import { PawPattern } from "@/components/ui/PawPattern";

import styles from "./HeroSection.module.scss";
import { HERO_EMERGENCY } from "./HeroSection.constants";
import { HeroActions } from "./parts/HeroActions";
import { HeroCopy } from "./parts/HeroCopy";
import { HeroImage } from "./parts/HeroImage";

/**
 * Home hero: what the clinic is, the main actions, the emergency line and a photo.
 * On tablet and mobile the photo goes first and the copy follows.
 *
 * @returns The rendered element.
 */
export function HeroSection() {
  return (
    <section className={styles.hero} aria-label="CONVET veterinary clinic">
      <PawPattern className={styles.pattern} />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <HeroCopy />
          <HeroActions />
          <EmergencyCard aria-label="Emergency" className={styles.emergency} {...HERO_EMERGENCY} />
        </div>
        <HeroImage />
      </div>
    </section>
  );
}
