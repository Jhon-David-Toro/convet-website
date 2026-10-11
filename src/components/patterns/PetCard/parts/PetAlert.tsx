import { AlertTriangle, Icon } from "@/components/ui/Icon";

import type { PetAlertProps } from "../PetCard.types";
import styles from "../PetCard.module.scss";

/**
 * Visible medical alert of the full card.
 *
 * @param props Props of the component, see {@link PetAlertProps}.
 * @param props.text Text to show.
 * @returns The rendered element.
 */
export function PetAlert({ text }: PetAlertProps) {
  return (
    <p className={styles.alert}>
      <Icon icon={AlertTriangle} size="small" />
      <span>{text}</span>
    </p>
  );
}
