import { useState } from "react";

import { RECEIPT_LINES } from "@/lib/admin.constants";
import type { ReceiptLine } from "@/lib/admin.types";

import type { ReceiptLinesState } from "../ReceiveStock.types";
import { appendLine, dropLine, patchLine } from "../ReceiveStock.utils";

/**
 * Lines of the receipt, with the functions that change one, add a new one and remove one.
 *
 * @returns The lines and the functions that change them.
 */
export function useReceiptLines(): ReceiptLinesState {
  const [lines, setLines] = useState<ReceiptLine[]>(RECEIPT_LINES);

  return {
    lines,
    setLine: (id, patch) => setLines(patchLine(id, patch)),
    addLine: () => setLines(appendLine()),
    removeLine: (id) => setLines(dropLine(id)),
  };
}
