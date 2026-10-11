"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { Toggle } from "@/components/ui/Toggle";

import { NOTIFICATION_TOGGLES, NOTIFICATIONS_SAVED_MESSAGE, PANEL_ID, SAVE_LABEL } from "../AdminSettings.constants";
import { useToggleList } from "../hooks/useToggleList";
import styles from "../AdminSettings.module.scss";

/**
 * Notification settings: which messages the clinic sends and which alerts the staff receive.
 *
 * @returns The rendered element.
 */
export function NotificationsPanel() {
  const { toast } = useToast();
  const { values, toggle } = useToggleList({ email: true, whatsapp: true, staff: true });

  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.card}>
      <div className={styles.toggles}>
        {NOTIFICATION_TOGGLES.map(({ key, label, description }) => (
          <Toggle key={key} label={label} description={description} checked={values[key]} onChange={() => toggle(key)} />
        ))}
      </div>
      <div className={styles.actions}>
        <Button type="button" onClick={() => toast({ message: NOTIFICATIONS_SAVED_MESSAGE, tone: "success" })}>
          {SAVE_LABEL}
        </Button>
      </div>
    </div>
  );
}
