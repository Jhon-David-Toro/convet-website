import { Bell, Icon } from "@/components/ui/Icon";
import { FILTER_UNREAD } from "@/lib/notifications/notifications.utils";

import { EMPTY_TEXT, EMPTY_TITLE, NO_UNREAD_TEXT, NO_UNREAD_TITLE } from "../NotificationCenter.constants";
import type { PanelEmptyProps } from "../NotificationCenter.types";
import styles from "../NotificationCenter.module.scss";

/**
 * What the panel shows when there is nothing to list: "You’re all caught up", or that nothing is unread on the unread tab.
 *
 * @param props Props of the component, see {@link PanelEmptyProps}.
 * @param props.filter Selected tab: `all` or `unread`.
 * @returns The rendered element.
 */
export function PanelEmpty({ filter }: PanelEmptyProps) {
  const unreadTab = filter === FILTER_UNREAD;

  return (
    <div className={styles.empty}>
      <span className={styles.emptyIcon}>
        <Icon icon={Bell} size="large" />
      </span>
      <p className={styles.emptyTitle}>{unreadTab ? NO_UNREAD_TITLE : EMPTY_TITLE}</p>
      <p className={styles.emptyText}>{unreadTab ? NO_UNREAD_TEXT : EMPTY_TEXT}</p>
    </div>
  );
}
