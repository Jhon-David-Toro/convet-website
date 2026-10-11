"use client";

import { Toggle } from "@/components/ui/Toggle";

import { NOTIFICATIONS_TITLE } from "../ProfileSettings.constants";
import type { NotificationsCardProps } from "../ProfileSettings.types";
import { useNotifications } from "../hooks/useNotifications";
import styles from "../ProfileSettings.module.scss";

/**
 * Card with a switch for every kind of notification; the ones that are not available yet are disabled.
 *
 * @param props Props of the component, see {@link NotificationsCardProps}.
 * @param props.settings Notification settings the card starts with.
 * @returns The rendered element.
 */
export function NotificationsCard({ settings: initial }: NotificationsCardProps) {
  const { settings, toggle } = useNotifications(initial);

  return (
    <section className={styles.card} aria-labelledby="profile-notifications">
      <h2 id="profile-notifications" className={styles.cardTitle}>
        {NOTIFICATIONS_TITLE}
      </h2>
      <div className={styles.toggles}>
        {settings.map(({ id, label, description, enabled, disabled }) => (
          <Toggle key={id} label={label} description={description} checked={enabled} disabled={disabled} onChange={() => toggle(id)} />
        ))}
      </div>
    </section>
  );
}
