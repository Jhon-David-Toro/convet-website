import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ui/Toast";
import { RECEIPT_DEFAULTS } from "@/lib/admin.constants";
import { ADMIN_NAV_HREFS } from "@/lib/admin.paths.constants";

import { SAVED_MESSAGE } from "../ReceiveStock.constants";
import type { ReceiptState } from "../ReceiveStock.types";
import { expiryError } from "../ReceiveStock.utils";
import { useReceiptLines } from "./useReceiptLines";

/**
 * State of the receipt being recorded: the delivery data, the lines, how many lines have a problem, and saving it
 * (which shows a message and goes back to the stock).
 *
 * @returns The receipt and the functions that change it.
 */
export function useReceipt(): ReceiptState {
  const router = useRouter();
  const { toast } = useToast();
  const [header, setHeaderState] = useState(RECEIPT_DEFAULTS);
  const lines = useReceiptLines();

  /** Tells the user the stock was updated and goes back to the stock page. */
  function save() {
    toast({ message: SAVED_MESSAGE, tone: "success" });
    router.push(ADMIN_NAV_HREFS.stock);
  }

  return {
    ...lines,
    header,
    errorCount: lines.lines.filter((line) => expiryError(line, header.receivedOn)).length,
    setHeader: (field, value) => setHeaderState((current) => ({ ...current, [field]: value })),
    save,
  };
}
