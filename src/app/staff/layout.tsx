import type { Metadata } from "next";

import { StaffShell } from "@/components/sections/StaffShell";
import { ToastProvider } from "@/components/ui/Toast";
import { NO_INDEX } from "@/lib/seo.constants";

import type { StaffLayoutProps } from "./layout.types";

export const metadata: Metadata = {
  robots: NO_INDEX,
  title: "Staff · CONVET",
};

/**
 * Layout of the staff area: every page under `/staff` shares the sidebar and the top bar, and the toasts survive navigation.
 *
 * @param props Props of the layout, see {@link StaffLayoutProps}.
 * @param props.children Page of the staff area.
 * @returns The rendered element.
 */
export default function StaffLayout({ children }: StaffLayoutProps) {
  return (
    <ToastProvider>
      <StaffShell>{children}</StaffShell>
    </ToastProvider>
  );
}
