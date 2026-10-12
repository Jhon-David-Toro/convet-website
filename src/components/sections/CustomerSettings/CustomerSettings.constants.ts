import type { SettingsChannel } from "@/lib/customer/customer.types";

export const TITLE = "Settings";

export const SUBTITLE = "Your profile, sign-in, notifications and privacy.";

export const PHONE_PATTERN = /^\+\d[\d\s]{7,}$/;

export const MIN_ADDRESS_LENGTH = 8;

export const PHONE_ERROR = "Enter a full number with country code, e.g. +297 560 1234.";

export const ADDRESS_ERROR = "Address is too short — add street and district, or leave it empty.";

export const ATTENTION_TEXT = "Check the mobile number and address below. Nothing was saved yet.";

export const SAVED_BANNER = "Changes saved. Your profile is up to date.";

export const PROFILE_TITLE = "Profile & contact";

export const SAVED_STATUS = "All changes saved";

export const SAVE_LABEL = "Save changes";

export const DISCARD_LABEL = "Discard";

export const PHONE_LABEL = "Mobile (WhatsApp)";

export const PHONE_HELPER = "Used for appointment messages. Include the country code.";

export const ADDRESS_PLACEHOLDER = "Street, district";

export const SECURITY_TITLE = "Sign-in & security";

export const VERIFIED_LABEL = "Verified";

export const CHANGE_EMAIL_LABEL = "Change email";

export const CHANGE_PASSWORD_LABEL = "Change password";

export const PASSWORD_NOTE = "Last changed Mar 3, 2026";

export const FORGOT_HREF = "/forgot-password";

export const COMMUNICATION_TITLE = "Communication preferences";

export const COMMUNICATION_NOTE = "Where we send confirmations and reminders.";

export const COMMUNICATION_PROPOSAL = "Proposal — not available yet";

export const NOTIFICATIONS_TITLE = "Notifications";

export const NOTIFICATIONS_NOTE = "In-app notifications always appear under the bell. Choose what you want to hear about and on which extra channels.";

export const CHANNELS: { id: SettingsChannel; label: string }[] = [
  { id: "inApp", label: "In-app" },
  { id: "email", label: "Email" },
  { id: "whatsapp", label: "WhatsApp" },
];

export const FIXED_CHANNELS: SettingsChannel[] = ["inApp"];

export const DISABLED_CHANNELS: SettingsChannel[] = ["whatsapp"];

export const LEGEND = [
  { badge: "In-app", tone: "info", text: "Shown in the bell and on /notifications." },
  { badge: "Email · planned", tone: "warning", text: "Your choice is saved: sending needs the email service." },
  { badge: "WhatsApp · proposal", tone: "neutral", text: "Not available yet. Today we only open a WhatsApp chat link." },
] as const;

export const SESSIONS_TITLE = "Active sessions";

export const CURRENT_LABEL = "Current";

export const SIGN_OUT_LABEL = "Sign out";

export const SIGN_OUT_OTHERS_LABEL = "Sign out of all other devices";

export const PRIVACY_TITLE = "Privacy & data";

export const READ_LABEL = "Read";

export const PROPOSAL_LABEL = "Proposal";

export const REQUEST_LABEL = "Request";

export const DELETE_LABEL = "Delete account";

export const DELETE_NOTE = "Clinical records are kept as required by law; we confirm by email first.";

export const COPY_NOTE = "We prepare it within [time to confirm] and notify you by email";
