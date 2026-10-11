import { useState } from "react";

import type { MovementType } from "@/components/sections/StockMovementModal";
import { useDisclosure } from "@/lib/shared/useDisclosure";

import type { MovementModalState } from "../AdminStock.types";

/**
 * Whether the stock movement dialog is open and which type it opens with: Adjust opens it as an adjustment, Dispense as a clinical use.
 *
 * @returns The state and the functions that open and close the dialog.
 */
export function useMovementModal(): MovementModalState {
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
