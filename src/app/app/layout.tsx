import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ToastProvider } from "@/components/ui/Toast";
import { requireRole } from "@/lib/auth/auth.access";
import { NO_INDEX } from "@/lib/site/seo.constants";

export const metadata: Metadata = {
    robots: NO_INDEX,
};

type AppLayoutProps = {
    children: ReactNode;
};

/**
 * Layout shared by every page under `/app`.
 * It protects the customer area and keeps the toast provider mounted during navigation.
 *
 * @param props Layout properties.
 * @param props.children Pages of the customer area.
 * @returns The rendered element.
 */
export default async function AppLayout({
    children,
}: AppLayoutProps) {
    await requireRole(["CUSTOMER"]);

    return <ToastProvider>{children}</ToastProvider>;
}