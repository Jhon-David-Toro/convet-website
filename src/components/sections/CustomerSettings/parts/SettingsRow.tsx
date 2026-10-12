import { Icon } from "@/components/ui/Icon";

import type { SettingsRowProps } from "../CustomerSettings.types";
import styles from "../CustomerSettings.module.scss";

/**
 * Row of a settings card: an icon, a title with an optional badge, a note and the action on the right.
 *
 * @param props Props of the component, see {@link SettingsRowProps}.
 * @param props.icon Icon at the start of the row.
 * @param props.title Title of the row.
 * @param props.note Text under the title.
 * @param props.badge Badge next to the title.
 * @param props.action Button or link at the end of the row.
 * @returns The rendered element.
 */
export function SettingsRow({ icon, title, note, badge, action }: SettingsRowProps) {
  return (
    <li className={styles.row}>
      <Icon icon={icon} tone="secondary" />
      <div className={styles.rowText}>
        <p className={styles.rowTitle}>
          {title}
          {badge && <span className={styles.rowBadge}>{badge}</span>}
        </p>
        <p className={styles.rowNote}>{note}</p>
      </div>
      {action}
    </li>
  );
}
