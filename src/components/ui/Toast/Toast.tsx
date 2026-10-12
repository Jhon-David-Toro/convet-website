import { Icon, X } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import { TOAST_DISMISS_LABEL, TOAST_ICONS } from "./Toast.constants";
import type { ToastProps } from "./Toast.types";
import styles from "./Toast.module.scss";

/**
 * Feedback/Toast: short message on navy with an optional action (e.g. "Undo").
 *
 * @param props Props of the component, see {@link ToastProps}.
 * @param props.tone Color tone.
 * @param props.actionLabel Label of the action button.
 * @param props.onAction Called when the action is activated.
 * @param props.onDismiss Called when the close button is activated; the button is not shown without it.
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Toast({ tone = "info", actionLabel, onAction, onDismiss, className, children, ...rest }: ToastProps) {
  return (
    <div {...rest} className={cx(styles.toast, styles[tone], className)}>
      <Icon icon={TOAST_ICONS[tone]} className={styles.icon} />
      <p className={styles.message}>{children}</p>
      {actionLabel && (
        <button type="button" className={styles.action} onClick={onAction}>
          {actionLabel}
        </button>
      )}
      {onDismiss && (
        <button type="button" className={styles.dismiss} aria-label={TOAST_DISMISS_LABEL} onClick={onDismiss}>
          <Icon icon={X} size="small" />
        </button>
      )}
    </div>
  );
}
