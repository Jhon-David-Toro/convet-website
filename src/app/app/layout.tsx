import type { Metadata } from "next";

import { ToastProvider } from "@/components/ui/Toast";
import { NO_INDEX } from "@/lib/seo.constants";

import type { CustomerLayoutProps } from "./(portal)/layout.types";

export const metadata: Metadata = {
  robots: NO_INDEX,
};

/**
 * Layout shared by every page under `/app`: it holds the toasts, so a message shown before navigating survives the navigation.
 *
 * @param props Props of the layout, see {@link CustomerLayoutProps}.
 * @param props.children Page of the customer area.
 * @returns The rendered element.
 */
export default function AppLayout({ children }: CustomerLayoutProps) {
  return <ToastProvider>{children}</ToastProvider>;
}
