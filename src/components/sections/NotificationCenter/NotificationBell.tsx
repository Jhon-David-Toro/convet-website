"use client";

import Link from "next/link";

import { ArrowRight, Bell, Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { PAGE_HREFS } from "@/lib/notifications/notifications.constants";
import { badgeLabel, filterNotifications } from "@/lib/notifications/notifications.utils";

import { BELL_LABEL, PANEL_LIMIT, VIEW_ALL_LABEL } from "./NotificationCenter.constants";
import { useNotificationPanel } from "./hooks/useNotificationPanel";
import { NotificationList } from "./parts/NotificationList";
import { PanelEmpty } from "./parts/PanelEmpty";
import { PanelHeader } from "./parts/PanelHeader";
import { PanelTabs } from "./parts/PanelTabs";
import { useNotificationCenter } from "./NotificationsContext";
import styles from "./NotificationCenter.module.scss";

/**
 * Notifications bell of the top bar: the count of unread ones and, when pressed, a panel under it (a full-screen sheet on mobile) with the latest five,
 * tabs for all and unread, a button that marks everything read and a link to the whole history.
 *
 * @returns The rendered element.
 */
export function NotificationBell() {
  const { area, items, unread, markAllRead } = useNotificationCenter();
  const { rootRef, open, toggle, close, filter, setFilter } = useNotificationPanel();
  const shown = filterNotifications(items, filter).slice(0, PANEL_LIMIT);

  return (
    <div ref={rootRef} className={styles.root}>
      <IconButton icon={Bell} variant="ghost" label={unread > 0 ? `${BELL_LABEL}, ${unread} unread` : BELL_LABEL} aria-haspopup="dialog" aria-expanded={open} onClick={toggle} />
      {unread > 0 && (
        <span className={styles.count} aria-hidden="true">
          {badgeLabel(unread)}
        </span>
      )}
      {open && (
        <section role="dialog" aria-label={BELL_LABEL} className={styles.panel}>
          <PanelHeader unread={unread} onMarkAllRead={markAllRead} onClose={close} />
          <PanelTabs filter={filter} unread={unread} onChange={setFilter} />
          <div className={styles.scroll}>{shown.length > 0 ? <NotificationList items={shown} compact /> : <PanelEmpty filter={filter} />}</div>
          <Link href={PAGE_HREFS[area]} className={styles.viewAll} onClick={close}>
            {VIEW_ALL_LABEL}
            <Icon icon={ArrowRight} size="small" />
          </Link>
        </section>
      )}
    </div>
  );
}
