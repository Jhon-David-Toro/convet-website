import type { Metadata } from "next";

import { AdminSettings } from "@/components/sections/AdminSettings";

export const metadata: Metadata = {
  title: "Settings · CONVET admin",
};

/**
 * Settings page of the admin area.
 *
 * @returns The rendered element.
 */
export default function AdminSettingsPage() {
  return <AdminSettings />;
}
