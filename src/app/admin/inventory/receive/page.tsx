import type { Metadata } from "next";

import { ReceiveStock } from "@/components/sections/ReceiveStock";

export const metadata: Metadata = {
  title: "Receive stock · CONVET admin",
};

/**
 * Receive stock page of the admin area.
 *
 * @returns The rendered element.
 */
export default function ReceiveStockPage() {
  return <ReceiveStock />;
}
