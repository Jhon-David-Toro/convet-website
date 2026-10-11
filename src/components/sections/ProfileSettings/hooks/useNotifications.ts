import { useState } from "react";

import type { NotificationSetting } from "@/lib/customer/customer.types";

import type { NotificationsState } from "../ProfileSettings.types";

/**
 * Notification switches of the customer; switches that are not available yet cannot be changed.
 *
 * @param initial Settings the page starts with.
 * @returns The settings and a function that flips one of them.
 */
export function useNotifications(initial: NotificationSetting[]): NotificationsState {
  const [settings, setSettings] = useState(initial);

  return {
    settings,
    toggle: (id) => setSettings((current) => current.map((setting) => (setting.id === id && !setting.disabled ? { ...setting, enabled: !setting.enabled } : setting))),
  };
}
