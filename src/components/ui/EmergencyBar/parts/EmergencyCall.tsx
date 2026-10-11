import { Icon, Phone } from "@/components/ui/Icon";

import type { EmergencyCallProps } from "../EmergencyBar.types";
import styles from "../EmergencyBar.module.scss";

/**
 * Red pill that calls the emergency phone number.
 *
 * @param props Props of the component, see {@link EmergencyCallProps}.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.phone Phone number to show.
 * @param props.href Link destination.
 * @returns The rendered element.
 */
export function EmergencyCall({ label, phone, href }: EmergencyCallProps) {
  return (
    <a href={href} className={styles.emergency}>
      <Icon icon={Phone} size="small" tone="inherit" />
      <span className={styles.label}>{label}</span>{" "}
      <span className={styles.phone}>{phone}</span>
    </a>
  );
}
