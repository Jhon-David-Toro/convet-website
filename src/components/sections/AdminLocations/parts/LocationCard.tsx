import { Map } from "@/components/ui/Map";

import { MAP_LABEL } from "../AdminLocations.constants";
import type { LocationCardProps } from "../AdminLocations.types";
import { LocationHeader } from "./LocationHeader";
import { PhoneFields } from "./PhoneFields";
import styles from "../AdminLocations.module.scss";

/**
 * Card of a location: its name and state, the map, and the phone and WhatsApp numbers the clinic shows to clients.
 *
 * @param props Props of the component, see {@link LocationCardProps}.
 * @param props.location Location to show.
 * @returns The rendered element.
 */
export function LocationCard({ location }: LocationCardProps) {
  return (
    <section className={styles.card} aria-label={location.name}>
      <LocationHeader location={location} />
      <Map label={MAP_LABEL} className={styles.map} />
      <PhoneFields location={location} />
    </section>
  );
}
