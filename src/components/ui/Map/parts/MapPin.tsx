import { Icon, Paw } from "@/components/ui/Icon";

import styles from "../Map.module.scss";
import { MAP_PIN_ICON_SIZE } from "../Map.constants";
import type { MapPinProps } from "../Map.types";

/**
 * Pin with a paw marker and the clinic name.
 *
 * @param props Props of the component, see {@link MapPinProps}.
 * @param props.label Text of the stylized pin.
 * @returns The rendered element.
 */
export function MapPin({ label }: MapPinProps) {
  return (
    <span className={styles.pin}>
      <span className={styles.marker}>
        <Icon icon={Paw} size={MAP_PIN_ICON_SIZE} tone="inverse" />
      </span>
      <span className={styles.pinLabel}>{label}</span>
    </span>
  );
}
