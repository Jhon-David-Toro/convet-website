import { Badge } from "@/components/ui/Badge";
import { cx } from "@/lib/shared/cx";

import { UP_TO_DATE_STATUS, VACCINE_STATUS_VIEWS } from "./VaccineRow.constants";
import type { VaccineRowProps } from "./VaccineRow.types";
import styles from "./VaccineRow.module.scss";

/**
 * List/Vaccine Row: a vaccine with its dates and status. Use it inside a `<ul>`.
 *
 * @param props Props of the component, see {@link VaccineRowProps}.
 * @param props.status Status that decides the colors, label and actions.
 * @param props.vaccine Name of the vaccine.
 * @param props.dates Dates, e.g. "Given Oct 20, 2025 · Next Oct 20, 2026".
 * @param props.lot Lot and expiry (optional), e.g. "Lot RB-24187 · exp Nov 30, 2026".
 * @param props.statusLabel Overrides the default label of the status.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function VaccineRow({ status, vaccine, dates, lot, statusLabel, className, ...rest }: VaccineRowProps) {
  const config = VACCINE_STATUS_VIEWS[status];

  return (
    <li {...rest} className={cx(styles.row, className)}>
      <div className={styles.content}>
        <p className={styles.vaccine}>{vaccine}</p>
        <p className={styles.dates}>{dates}</p>
        {lot && <p className={styles.lot}>{lot}</p>}
      </div>
      <Badge tone={config.tone} icon={config.icon} iconTone={status === UP_TO_DATE_STATUS ? "primary" : undefined}>
        {statusLabel ?? config.label}
      </Badge>
    </li>
  );
}
