import { useState } from "react";

import { SETTINGS_NOTIFICATIONS, SETTINGS_PROFILE, SETTINGS_SESSIONS } from "@/lib/customer/customer.settings.constants";
import type { SettingsProfile } from "@/lib/customer/customer.types";

import type { CustomerSettingsState, SettingsErrors, SettingsStatus } from "../CustomerSettings.types";
import { validateSettings } from "../CustomerSettings.utils";

/**
 * State of the settings page: the profile form with its errors and status, the notification choices and the active sessions.
 *
 * @returns The values, errors and status of the form, the notification choices, the sessions and the functions that change them.
 */
export function useCustomerSettings(): CustomerSettingsState {
  const [values, setValues] = useState<SettingsProfile>(SETTINGS_PROFILE);
  const [errors, setErrors] = useState<SettingsErrors>({});
  const [status, setStatus] = useState<SettingsStatus>("idle");
  const [notifications, setNotifications] = useState(SETTINGS_NOTIFICATIONS);
  const [sessions, setSessions] = useState(SETTINGS_SESSIONS);

  return {
    values,
    errors,
    status,
    setValue: (field, value) => {
      setValues((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      setStatus("idle");
    },
    save: () => {
      const found = validateSettings(values);
      setErrors(found);
      setStatus(Object.keys(found).length > 0 ? "error" : "saved");
    },
    discard: () => {
      setValues(SETTINGS_PROFILE);
      setErrors({});
      setStatus("idle");
    },
    notifications,
    toggleNotification: (id) => setNotifications((current) => current.map((item) => (item.id === id && !item.locked ? { ...item, enabled: !item.enabled } : item))),
    toggleChannel: (id, channel) =>
      setNotifications((current) => current.map((item) => (item.id === id ? { ...item, channels: { ...item.channels, [channel]: !item.channels[channel] } } : item))),
    sessions,
    signOutSession: (id) => setSessions((current) => current.filter((session) => session.id !== id)),
    signOutOthers: () => setSessions((current) => current.filter((session) => session.current)),
  };
}
