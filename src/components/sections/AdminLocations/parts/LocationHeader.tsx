"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Building, Check, Icon } from "@/components/ui/Icon";
import { useActionToast } from "@/lib/shared/useActionToast";

import { ACTIVATE_LABEL, ACTIVE_LABEL, DEACTIVATE_LABEL, INACTIVE_LABEL, SAVED_MESSAGE } from "../AdminLocations.constants";
import type { LocationHeaderProps } from "../AdminLocations.types";
import styles from "../AdminLocations.module.scss";

/**
 * Top of the location card: its icon, name, address and the badge with its state, plus the button that opens or closes it.
 *
 * @param props Props of the component, see {@link LocationHeaderProps}.
 * @param props.location Location to show.
 * @param props.actions Server Actions that change the branch.
 * @returns The rendered element.
 */
export function LocationHeader({ location, actions }: LocationHeaderProps) {
  const status = useActionToast(actions?.setActive, SAVED_MESSAGE);
  const active = location.active ?? true;

  return (
    <div className={styles.cardHeader}>
      <span className={styles.icon}>
        <Icon icon={Building} />
      </span>
      <div className={styles.cardText}>
        <h2 className={styles.name}>{location.name}</h2>
        <p className={styles.subtitle}>{location.subtitle}</p>
      </div>
      <div className={styles.headerActions}>
        <Badge tone={active ? "success" : "neutral"} icon={active ? Check : undefined}>
          {active ? ACTIVE_LABEL : INACTIVE_LABEL}
        </Badge>
        {location.id && actions?.setActive && (
          <Button type="button" variant="secondary" size="small" disabled={status.pending} onClick={() => status.run(location.id ?? "", !active)}>
            {active ? DEACTIVATE_LABEL : ACTIVATE_LABEL}
          </Button>
        )}
      </div>
    </div>
  );
}
