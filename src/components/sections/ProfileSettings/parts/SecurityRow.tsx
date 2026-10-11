import type { SecurityRowProps } from "../ProfileSettings.types";
import styles from "../ProfileSettings.module.scss";

/**
 * Row of the security card: a label with a note and the action that goes with it.
 *
 * @param props Props of the component, see {@link SecurityRowProps}.
 * @param props.label What the row is about.
 * @param props.note Supporting line under the label.
 * @param props.children Action of the row.
 * @returns The rendered element.
 */
export function SecurityRow({ label, note, children }: SecurityRowProps) {
  return (
    <div className={styles.securityRow}>
      <div>
        <p className={styles.securityLabel}>{label}</p>
        <p className={styles.securityNote}>{note}</p>
      </div>
      {children}
    </div>
  );
}
