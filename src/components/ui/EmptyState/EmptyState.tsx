import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import styles from "./EmptyState.module.scss";
import { EMPTY_STATE_ICON_SIZE } from "./EmptyState.constants";
import type { EmptyStateProps } from "./EmptyState.types";

/**
 * Centered message with an illustration icon, a title, a message and an optional action, for lists without content.
 *
 * @param props Props of the component, see {@link EmptyStateProps}.
 * @param props.icon Icon component to draw.
 * @param props.title Title text.
 * @param props.message Message to show.
 * @param props.action Primary action (usually a `Button`).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function EmptyState({ icon, title, message, action, className, ...rest }: EmptyStateProps) {
  return (
    <div {...rest} className={cx(styles.empty, className)}>
      <span className={styles.illustration}>
        <Icon icon={icon} size={EMPTY_STATE_ICON_SIZE} tone="brand" />
      </span>
      <h3 className={styles.title}>{title}</h3>
      {message && <p className={styles.message}>{message}</p>}
      {action}
    </div>
  );
}
