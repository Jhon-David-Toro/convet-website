import { useState } from "react";

import type { MovementType } from "@/components/sections/StockMovementModal";
import { useDisclosure } from "@/lib/useDisclosure";

import type { MovementDialogState } from "../ProductLots.types";

/**
 * Whether the stock movement dialog is open and which type it opens with: Adjust opens it as an adjustment, Dispense as a clinical use.
 *
 * @returns The state and the functions that open and close the dialog.
 */
export function useMovementDialog(): MovementDialogState {
  const { open, show, hide } = useDisclosure();
  const [type, setType] = useState<MovementType>("adjustment");

  return {
    open,
    type,
    adjust: () => {
      setType("adjustment");
      show();
    },
    dispense: () => {
      setType("clinical-use");
      show();
    },
    close: hide,
  };
}
