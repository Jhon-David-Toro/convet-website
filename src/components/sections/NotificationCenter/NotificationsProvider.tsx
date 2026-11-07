"use client";

import { useNotificationState } from "./hooks/useNotificationState";
import type { NotificationsProviderProps } from "./NotificationCenter.types";
import { NotificationsContext } from "./NotificationsContext";

/**
 * Keeps the notifications of an area, shared by the bell and the notifications page, so reading one in either place reads it in both.
 *
 * @param props Props of the component, see {@link NotificationsProviderProps}.
 * @param props.area Area of the app: customer, staff or admin.
 * @param props.source Notifications from the backend; without it the sample data of the area is shown.
 * @param props.children Content of the area.
 * @returns The rendered element.
 */
export function NotificationsProvider({ area, source, children }: NotificationsProviderProps) {
  const state = useNotificationState(area, source);

  return <NotificationsContext value={{ area, live: source !== undefined, ...state }}>{children}</NotificationsContext>;
}
