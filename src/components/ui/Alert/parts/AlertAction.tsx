import Link from "next/link";

import styles from "../Alert.module.scss";
import type { AlertActionProps } from "../Alert.types";

/**
 * Highlighted action under the message: a link when it has `href`, otherwise a button.
 *
 * @param props Props of the component, see {@link AlertActionProps}.
 * @param props.action Action shown with the message: a link (`href`) or a button (`onClick`).
 * @returns The rendered element.
 */
export function AlertAction({ action }: AlertActionProps) {
  if (action.href !== undefined) {
    return (
      <Link href={action.href} className={styles.action}>
        {action.label}
      </Link>
    );
  }

  return (
    <button type="button" className={styles.action} onClick={action.onClick}>
      {action.label}
    </button>
  );
}
