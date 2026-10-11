import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "./Alert.module.scss";
import { ALERT_ICONS } from "./Alert.constants";
import type { AlertProps } from "./Alert.types";
import { getAlertRole } from "./Alert.utils";
import { AlertContent } from "./parts/AlertContent";
import { AlertDismiss } from "./parts/AlertDismiss";

/**
 * Feedback/Alert: tinted message with an optional action and dismiss button.
 *
 * @param props Props of the component, see {@link AlertProps}.
 * @param props.tone Color tone.
 * @param props.title Title text.
 * @param props.action Highlighted action below the message: a link (`href`) or a button (`onClick`).
 * @param props.onDismiss When given, shows the dismiss button and calls this on click.
 * @param props.dismissLabel Accessible name of the dismiss button.
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Alert({ tone = "info", title, action, onDismiss, dismissLabel = "Dismiss", className, children, ...rest }: AlertProps) {
  return (
    <div {...rest} role={getAlertRole(tone)} className={cx(styles.alert, styles[tone], className)}>
      <Icon icon={ALERT_ICONS[tone]} className={styles.icon} />
      <AlertContent title={title} action={action}>
        {children}
      </AlertContent>
      {onDismiss && <AlertDismiss label={dismissLabel} onDismiss={onDismiss} />}
    </div>
  );
}
