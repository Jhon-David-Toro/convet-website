import type { LucideIcon } from "lucide-react";

export type NotificationArea = "customer" | "staff" | "admin";

export type NotificationKind =
  | "reminder"
  | "confirmed"
  | "request"
  | "vet-changed"
  | "vaccine"
  | "rescheduled"
  | "cancelled"
  | "record"
  | "file"
  | "reschedule-request"
  | "low-stock"
  | "out-of-stock"
  | "agenda"
  | "time-off"
  | "invitation"
  | "expired-lot"
  | "online-requests";

export type NotificationGroup = "today" | "yesterday" | "october" | "september";

export type NotificationTone = "info" | "success" | "warning" | "error";

export type NotificationItem = {
  id: string;
  area: NotificationArea;
  category: string;
  kind: NotificationKind;
  title: string;
  text: string;
  when: string;
  group: NotificationGroup;
  linkLabel?: string;
  href?: string;
  unread: boolean;
};

export type NotificationKindView = {
  icon: LucideIcon;
  tone: NotificationTone;
};

export type NotificationCategory = {
  value: string;
  label: string;
};
