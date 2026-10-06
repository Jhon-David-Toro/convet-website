import styles from "../Map.module.scss";
import {
  MAP_ART_HEIGHT,
  MAP_ART_WIDTH,
  MAP_ROAD_OFFSETS,
  MAP_ROAD_TILTS,
  MAP_STREET_OFFSETS,
} from "../Map.constants";
import { toPercent } from "../Map.utils";

/**
 * Stylized roads (slightly tilted) and streets of the Figma map.
 *
 * @returns The rendered element.
 */
export function MapGrid() {
  return (
    <>
      {MAP_ROAD_OFFSETS.map((y, index) => (
        <span key={y} className={styles.road} style={{ top: toPercent(y, MAP_ART_HEIGHT), rotate: MAP_ROAD_TILTS[index % 2] }} />
      ))}
      {MAP_STREET_OFFSETS.map((x) => (
        <span key={x} className={styles.street} style={{ left: toPercent(x, MAP_ART_WIDTH) }} />
      ))}
    </>
  );
}
