import type { Metadata } from "next";

import { ProfileSettings } from "@/components/sections/ProfileSettings";
import { CUSTOMER_PROFILE, NOTIFICATION_SETTINGS } from "@/lib/customer/customer.constants";

export const metadata: Metadata = {
  title: "Profile · CONVET",
};

/**
 * Profile and settings page of the customer area.
 *
 * @returns The rendered element.
 */
export default function ProfilePage() {
  return <ProfileSettings profile={CUSTOMER_PROFILE} notifications={NOTIFICATION_SETTINGS} />;
}
