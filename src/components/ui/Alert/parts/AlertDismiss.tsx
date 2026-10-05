import { Icon, X } from "@/components/ui/Icon";

import styles from "../Alert.module.scss";
import { ALERT_DISMISS_ICON_SIZE } from "../Alert.constants";
import type { AlertDismissProps } from "../Alert.types";

/**
 * Button that closes the alert.
 *
 * @param props Props of the component, see {@link AlertDismissProps}.
 * @param props.label Visible text. For icons it becomes the accessible name.
 * @param props.onDismiss Called when the user dismisses the element; when given, the dismiss button is shown.
 * @returns The rendered element.
 */
export function AlertDismiss({ label, onDismiss }: AlertDismissProps) {
  return (
    <button type="button" className={styles.dismiss} aria-label={label} onClick={onDismiss}>
      <Icon icon={X} size={ALERT_DISMISS_ICON_SIZE} />
    </button>
  );
}
