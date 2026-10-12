import { NotificationItem } from "@/components/patterns/NotificationItem";
import { GROUP_LABELS, NOTIFICATION_KINDS, PANEL_GROUP_LABELS } from "@/lib/notifications/notifications.constants";
import { groupByDay } from "@/lib/notifications/notifications.utils";

import type { NotificationListProps } from "../NotificationCenter.types";
import { useNotificationCenter } from "../NotificationsContext";
import styles from "../NotificationCenter.module.scss";

/**
 * Notifications grouped under the day they arrived: "Today", "Yesterday", "Earlier" in the panel, and the full date in the page.
 * Opening one marks it read; the check button marks it read without opening it.
 *
 * @param props Props of the component, see {@link NotificationListProps}.
 * @param props.items Notifications to show, newest first.
 * @param props.compact Uses the short day names of the panel.
 * @returns The rendered element.
 */
export function NotificationList({ items, compact = false }: NotificationListProps) {
  const { markRead } = useNotificationCenter();
  const labels = compact ? PANEL_GROUP_LABELS : GROUP_LABELS;
  const groups = groupByDay(items);

  return (
    <>
      {groups.map(({ group, items: entries }, index) => (
        <section key={group} aria-label={labels[group]} className={styles.group}>
          {(!compact || index === 0 || labels[group] !== labels[groups[index - 1].group]) && <h3 className={styles.groupTitle}>{labels[group]}</h3>}
          <ul className={styles.list}>
            {entries.map((entry) => {
              const { icon, tone } = NOTIFICATION_KINDS[entry.kind];
              return (
                <NotificationItem
                  key={entry.id}
                  icon={icon}
                  tone={tone}
                  title={entry.title}
                  text={entry.text}
                  when={entry.when}
                  linkLabel={entry.linkLabel}
                  href={entry.href}
                  unread={entry.unread}
                  onOpen={() => markRead(entry.id)}
                  onMarkRead={() => markRead(entry.id)}
                />
              );
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
