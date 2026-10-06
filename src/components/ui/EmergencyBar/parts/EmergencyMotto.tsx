import { Icon, Paw } from "@/components/ui/Icon";

import styles from "../EmergencyBar.module.scss";
import type { EmergencyMottoProps } from "../EmergencyBar.types";

/**
 * Brand motto with a paw icon and a highlighted phrase.
 *
 * @param props Props of the component, see {@link EmergencyMottoProps}.
 * @param props.text Text to show.
 * @param props.highlight Phrase drawn with the highlight style.
 * @returns The rendered element.
 */
export function EmergencyMotto({ text, highlight }: EmergencyMottoProps) {
  return (
    <p className={styles.motto}>
      <Icon icon={Paw} size="small" className={styles.paw} />
      <span>{text}</span>
      <span className={styles.highlight}>{highlight}</span>
    </p>
  );
}
