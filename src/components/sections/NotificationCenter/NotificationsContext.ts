"use client";

import { createContext, useContext } from "react";

import type { NotificationCenterValue } from "./NotificationCenter.types";

/** Context that exposes the notifications of the area and the functions that read them. */
export const NotificationsContext = createContext<NotificationCenterValue | null>(null);

/**
 * Notifications of the area the user is in. Must be used inside a `NotificationsProvider`.
 *
 * @returns The area, the notifications, how many are unread and the functions that mark them read.
 */
export function useNotificationCenter(): NotificationCenterValue {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error("useNotificationCenter must be used inside <NotificationsProvider>");
  return context;
}
