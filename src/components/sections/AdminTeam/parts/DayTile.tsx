import { cx } from "@/lib/shared/cx";

import styles from "../AdminTeam.module.scss";
import type { DayTileProps } from "../AdminTeam.types";

/**
 * One day of the week with the shifts of the vet, or "Off" when they do not work.
 *
 * @param props Props of the component, see {@link DayTileProps}.
 * @param props.day Day and its shifts.
 * @returns The rendered element.
 */
export function DayTile({ day }: DayTileProps) {
  const shifts = day.shifts.length > 0 ? day.shifts : ["Off"];

  return (
    <li className={cx(styles.day, day.shifts.length === 0 && styles.off)}>
      <p className={styles.dayName}>{day.day}</p>
      {shifts.map((shift) => (
        <p key={shift} className={styles.shift}>
          {shift}
        </p>
      ))}
    </li>
  );
}
