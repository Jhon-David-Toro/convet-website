import type { Metadata } from "next";

import { NotificationsPage } from "@/components/sections/NotificationsPage";

export const metadata: Metadata = {
  title: "Notifications · CONVET staff",
};

/**
 * Notifications page of the staff area.
 *
 * @returns The rendered element.
 */
export default function NotificationsStaffPage() {
  return <NotificationsPage />;
}
