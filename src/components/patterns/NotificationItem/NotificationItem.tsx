import Link from "next/link";

import { Check, ChevronRight, Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import { MARK_READ_LABEL, UNREAD_LABEL } from "./NotificationItem.constants";
import type { NotificationItemProps } from "./NotificationItem.types";
import styles from "./NotificationItem.module.scss";

/**
 * Notification/Item: one notification of the list. Unread ones are tinted, have a bold title and an orange dot; the whole row opens its destination
 * (and marks it read), and a check button marks it read without opening it.
 *
 * @param props Props of the component, see {@link NotificationItemProps}.
 * @param props.icon Icon of the kind of notification.
 * @param props.tone Color of the icon circle.
 * @param props.title What happened.
 * @param props.text Details of what happened.
 * @param props.when When it happened.
 * @param props.linkLabel Where the row leads, e.g. "Opens appointment"; without it the row is only informative.
 * @param props.href Destination of the row.
 * @param props.unread Whether it has not been read.
 * @param props.onOpen Called when the row is opened.
 * @param props.onMarkRead Called when the check button is pressed.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function NotificationItem({ icon, tone = "info", title, text, when, linkLabel, href, unread = false, onOpen, onMarkRead, className, ...rest }: NotificationItemProps) {
  const heading = href ? (
    <Link href={href} className={styles.stretched} onClick={onOpen}>
      {title}
    </Link>
  ) : (
    title
  );

  return (
    <li {...rest} className={cx(styles.item, unread && styles.unread, styles[tone], className)}>
      <span className={styles.circle}>
        <Icon icon={icon} size="medium" />
      </span>
      <div className={styles.body}>
        <p className={styles.title}>{heading}</p>
        <p className={styles.text}>{text}</p>
        <p className={styles.meta}>
          <span className={styles.when}>{when}</span>
          {linkLabel && (
            <span className={styles.link}>
              {linkLabel}
              <Icon icon={ChevronRight} size="small" />
            </span>
          )}
        </p>
      </div>
      {unread && (
        <>
          <span className={styles.dot} role="img" aria-label={UNREAD_LABEL} />
          {onMarkRead && (
            <button type="button" className={styles.mark} aria-label={MARK_READ_LABEL} onClick={onMarkRead}>
              <Icon icon={Check} size="small" />
            </button>
          )}
        </>
      )}
    </li>
  );
}
