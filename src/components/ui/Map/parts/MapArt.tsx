import styles from "../Map.module.scss";
import type { MapArtProps } from "../Map.types";
import { MapGrid } from "./MapGrid";
import { MapPin } from "./MapPin";

/**
 * Stylized map from Figma: roads, streets, sea and a pin with the clinic name.
 *
 * @param props Props of the component, see {@link MapArtProps}.
 * @param props.title Accessible title of the map.
 * @param props.label Text of the stylized pin.
 * @returns The rendered element.
 */
export function MapArt({ title, label }: MapArtProps) {
  return (
    <div role="img" aria-label={title} className={styles.art}>
      <MapGrid />
      <span className={styles.sea} />
      <MapPin label={label} />
    </div>
  );
}
