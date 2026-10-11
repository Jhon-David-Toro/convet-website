import { AlertTriangle, Icon, Info } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "../Field.module.scss";
import type { FieldHintProps } from "../Field.types";

/**
 * Helper or error message under the control, with its icon.
 *
 * @param props Props of the component, see {@link FieldHintProps}.
 * @param props.id Control id: the label points to it and the message hangs from `${id}-message`.
 * @param props.message Message to show.
 * @param props.isError Whether the message is an error (red, with a warning icon).
 * @returns The rendered element.
 */
export function FieldHint({ id, message, isError }: FieldHintProps) {
  return (
    <p id={`${id}-message`} className={cx(styles.message, isError && styles.error)}>
      <Icon icon={isError ? AlertTriangle : Info} size="small" className={styles.messageIcon} />
      <span>{message}</span>
    </p>
  );
}
