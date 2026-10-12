import type { Metadata } from "next";

import { NotificationsPage } from "@/components/sections/NotificationsPage";

export const metadata: Metadata = {
  title: "Notifications · CONVET",
};

/**
 * Notifications page of the customer area.
 *
 * @returns The rendered element.
 */
export default function NotificationsCustomerPage() {
  return <NotificationsPage />;
}
