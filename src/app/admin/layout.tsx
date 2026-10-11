import type { Metadata } from "next";

import { StaffShell } from "@/components/sections/StaffShell";
import { ToastProvider } from "@/components/ui/Toast";
import { NO_INDEX } from "@/lib/seo.constants";

import type { AdminLayoutProps } from "./layout.types";

export const metadata: Metadata = {
  robots: NO_INDEX,
  title: "Admin · CONVET",
};

/**
 * Layout of the admin area: every page under `/admin` shares the sidebar and the top bar, and the toasts survive navigation.
 *
 * @param props Props of the layout, see {@link AdminLayoutProps}.
 * @param props.children Page of the admin area.
 * @returns The rendered element.
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <ToastProvider>
      <StaffShell variant="admin">{children}</StaffShell>
    </ToastProvider>
  );
}
