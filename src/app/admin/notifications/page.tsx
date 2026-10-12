import type { Metadata } from "next";

import { NotificationsPage } from "@/components/sections/NotificationsPage";

export const metadata: Metadata = {
  title: "Notifications · CONVET admin",
};

/**
 * Notifications page of the admin area.
 *
 * @returns The rendered element.
 */
export default function NotificationsAdminPage() {
  return <NotificationsPage />;
}
