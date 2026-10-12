import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { Toggle } from "@/components/ui/Toggle";

import { CHANNELS, DISABLED_CHANNELS, FIXED_CHANNELS, LEGEND, NOTIFICATIONS_NOTE, NOTIFICATIONS_TITLE } from "../CustomerSettings.constants";
import type { NotificationsCardProps } from "../CustomerSettings.types";
import styles from "../CustomerSettings.module.scss";

/**
 * Notifications card: a switch for every kind of notification with the channels it uses (in-app is always on, WhatsApp is not available yet), and a legend of the channels.
 *
 * @param props Props of the component, see {@link NotificationsCardProps}.
 * @param props.notifications Notification choices.
 * @param props.toggleNotification Switches a kind of notification on or off.
 * @param props.toggleChannel Turns a channel of a kind of notification on or off.
 * @returns The rendered element.
 */
export function NotificationsCard({ notifications, toggleNotification, toggleChannel }: NotificationsCardProps) {
  return (
    <section className={styles.card} aria-labelledby="settings-notifications">
      <h2 id="settings-notifications" className={styles.cardTitle}>
        {NOTIFICATIONS_TITLE}
      </h2>
      <p className={styles.note}>{NOTIFICATIONS_NOTE}</p>
      <ul className={styles.rows}>
        {notifications.map((item) => (
          <li key={item.id} className={styles.notification}>
            <Toggle label={item.title} description={item.description} checked={item.enabled} disabled={item.locked} onChange={() => toggleNotification(item.id)} />
            <div className={styles.channels}>
              {CHANNELS.map((channel) => (
                <Checkbox
                  key={channel.id}
                  label={channel.label}
                  checked={item.channels[channel.id]}
                  disabled={!item.enabled || FIXED_CHANNELS.includes(channel.id) || DISABLED_CHANNELS.includes(channel.id)}
                  onChange={() => toggleChannel(item.id, channel.id)}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
      <ul className={styles.legend}>
        {LEGEND.map((entry) => (
          <li key={entry.badge}>
            <Badge tone={entry.tone}>{entry.badge}</Badge>
            <span>{entry.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
