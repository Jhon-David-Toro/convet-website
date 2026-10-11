import { Map } from "@/components/ui/Map";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CLINIC_LOCATION, GOOGLE_MAPS_API_KEY } from "@/lib/site/site.constants";

import { LOCATION_EYEBROW, LOCATION_TITLE } from "./LocationSection.constants";
import { ContactInfo } from "./parts/ContactInfo";
import styles from "./LocationSection.module.scss";

/**
 * Where the clinic is: a map and the contact information next to it (below it on tablet and mobile).
 *
 * @returns The rendered element.
 */
export function LocationSection() {
  return (
    <section id="location" className={styles.section} aria-label={LOCATION_TITLE}>
      <div className={styles.inner}>
        <SectionHeader eyebrow={LOCATION_EYEBROW} title={LOCATION_TITLE} className={styles.header} />
        <div className={styles.row}>
          <Map apiKey={GOOGLE_MAPS_API_KEY} location={CLINIC_LOCATION} className={styles.map} />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
