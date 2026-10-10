import { Map } from "@/components/ui/Map";
import { CLINIC_LOCATION, GOOGLE_MAPS_API_KEY } from "@/lib/site.constants";

import { MAP_LABEL } from "../ContactSection.constants";
import styles from "../ContactSection.module.scss";
import { OpeningHours } from "./OpeningHours";
import { QuickContact } from "./QuickContact";

/**
 * Side column: quick contact, the map of the clinic and the opening hours.
 *
 * @returns The rendered element.
 */
export function ContactSide() {
  return (
    <div className={styles.side}>
      <QuickContact />
      <Map apiKey={GOOGLE_MAPS_API_KEY} location={CLINIC_LOCATION} label={MAP_LABEL} className={styles.map} />
      <OpeningHours />
    </div>
  );
}
