import type { SettingsNotification, SettingsProfile, SettingsSession } from "./customer.types";

export const SETTINGS_PROFILE: SettingsProfile = { firstName: "Anna", lastName: "Lee", phone: "+297 560 1234", address: "" };

export const SETTINGS_EMAIL = "anna@example.com";

export const SETTINGS_NOTIFICATIONS: SettingsNotification[] = [
  {
    id: "appointments",
    title: "Appointment updates",
    description: "Always on — needed to manage your visits",
    enabled: true,
    locked: true,
    channels: { inApp: true, email: true, whatsapp: false },
  },
  {
    id: "reminders",
    title: "Appointment reminders",
    description: "24 hours before each visit",
    enabled: true,
    locked: false,
    channels: { inApp: true, email: true, whatsapp: false },
  },
  {
    id: "vaccines",
    title: "Vaccine due reminders",
    description: "14 days before, based on your pet’s record",
    enabled: true,
    locked: false,
    channels: { inApp: true, email: true, whatsapp: false },
  },
  {
    id: "records",
    title: "Health record updates",
    description: "When your vet shares a new summary",
    enabled: false,
    locked: false,
    channels: { inApp: true, email: false, whatsapp: false },
  },
];

export const SETTINGS_SESSIONS: SettingsSession[] = [
  { id: "chrome", device: "Chrome on Windows", detail: "This device · Oranjestad · active now", current: true },
  { id: "safari", device: "Safari on iPhone", detail: "Last active Oct 6, 2026 · 8:14 PM", current: false },
];
