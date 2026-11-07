import type { ReactNode } from "react";

import type { ActionResult } from "@/lib/api/api.types";
import type { NotificationArea, NotificationItem } from "@/lib/notifications/notifications.types";

/** Notifications that come from the backend, with the Server Actions that change them. */
export type NotificationsSource = {
  items: NotificationItem[];
  hasOlder: boolean;
  actions: {
    markRead: (id: string) => Promise<ActionResult>;
    markAllRead: () => Promise<ActionResult>;
    loadPage: (page: number) => Promise<ActionResult<{ items: NotificationItem[]; hasMore: boolean }>>;
  };
};

export type NotificationCenterValue = {
  area: NotificationArea;
  /** True when the notifications come from the backend (real dates), false for the design's sample data. */
  live: boolean;
  items: NotificationItem[];
  unread: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  hasOlder: boolean;
  loadOlder: () => void;
};

export type NotificationsProviderProps = {
  area: NotificationArea;
  /** Notifications from the backend; without it the provider shows the sample data of the area. */
  source?: NotificationsSource;
  children: ReactNode;
};

export type NotificationState = Omit<NotificationCenterValue, "area" | "live">;

export type NotificationListProps = {
  items: NotificationItem[];
  compact?: boolean;
};

export type PanelHeaderProps = {
  unread: number;
  onMarkAllRead: () => void;
  onClose: () => void;
};

export type PanelTabsProps = {
  filter: string;
  unread: number;
  onChange: (filter: string) => void;
};

export type PanelEmptyProps = {
  filter: string;
};
