import type { Metadata } from "next";

import { AdminDashboard } from "@/components/sections/AdminDashboard";

export const metadata: Metadata = {
  title: "Dashboard · CONVET admin",
};

/**
 * Dashboard page of the admin area.
 *
 * @returns The rendered element.
 */
export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
