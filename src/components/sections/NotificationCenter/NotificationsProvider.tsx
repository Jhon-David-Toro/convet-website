"use client";

import { useState } from "react";

import { markAllRead, markRead, notificationsFor, unreadCount } from "@/lib/notifications/notifications.utils";

import type { NotificationsProviderProps } from "./NotificationCenter.types";
import { NotificationsContext } from "./NotificationsContext";

/**
 * Keeps the notifications of an area, shared by the bell and the notifications page, so reading one in either place reads it in both.
 *
 * @param props Props of the component, see {@link NotificationsProviderProps}.
 * @param props.area Area of the app: customer, staff or admin.
 * @param props.children Content of the area.
 * @returns The rendered element.
 */
export function NotificationsProvider({ area, children }: NotificationsProviderProps) {
  const [items, setItems] = useState(() => notificationsFor(area));

  return (
    <NotificationsContext
      value={{
        area,
        items,
        unread: unreadCount(items),
        markRead: (id) => setItems((current) => markRead(current, id)),
        markAllRead: () => setItems(markAllRead),
      }}
    >
      {children}
    </NotificationsContext>
  );
}
