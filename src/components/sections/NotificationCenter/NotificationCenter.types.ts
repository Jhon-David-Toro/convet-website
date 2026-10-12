import type { ReactNode } from "react";

import type { NotificationArea, NotificationItem } from "@/lib/notifications/notifications.types";

export type NotificationCenterValue = {
  area: NotificationArea;
  items: NotificationItem[];
  unread: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
};

export type NotificationsProviderProps = {
  area: NotificationArea;
  children: ReactNode;
};

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
