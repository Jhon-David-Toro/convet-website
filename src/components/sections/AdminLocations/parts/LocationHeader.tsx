import { Badge } from "@/components/ui/Badge";
import { Building, Check, Icon } from "@/components/ui/Icon";

import styles from "../AdminLocations.module.scss";
import { ACTIVE_LABEL } from "../AdminLocations.constants";
import type { LocationHeaderProps } from "../AdminLocations.types";

/**
 * Top of the location card: its icon, name, time zone and the badge that says it is active.
 *
 * @param props Props of the component, see {@link LocationHeaderProps}.
 * @param props.location Location to show.
 * @returns The rendered element.
 */
export function LocationHeader({ location }: LocationHeaderProps) {
  return (
    <div className={styles.cardHeader}>
      <span className={styles.icon}>
        <Icon icon={Building} />
      </span>
      <div className={styles.cardText}>
        <h2 className={styles.name}>{location.name}</h2>
        <p className={styles.subtitle}>{location.subtitle}</p>
      </div>
      <Badge tone="success" icon={Check}>
        {ACTIVE_LABEL}
      </Badge>
    </div>
  );
}
