import type { Metadata } from "next";

import { CustomerShell } from "@/components/sections/CustomerShell";

import type { CustomerLayoutProps } from "./layout.types";

export const metadata: Metadata = {
  title: "My account · CONVET",
};

/**
 * Layout of the signed-in customer area: every page under `/app` shares the sidebar, the top bar and the tab bar.
 *
 * @param props Props of the layout, see {@link CustomerLayoutProps}.
 * @param props.children Page of the customer area.
 * @returns The rendered element.
 */
export default function CustomerLayout({ children }: CustomerLayoutProps) {
  return <CustomerShell>{children}</CustomerShell>;
}
