import type { Metadata } from "next";

import { CustomerSettings } from "@/components/sections/CustomerSettings";

export const metadata: Metadata = {
  title: "Settings · CONVET",
};

/**
 * Settings page of the customer area: profile, sign-in, notifications, sessions and privacy.
 *
 * @returns The rendered element.
 */
export default function SettingsPage() {
  return <CustomerSettings />;
}
