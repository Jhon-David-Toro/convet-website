import { useState } from "react";

import { useToast } from "@/components/ui/Toast";

import { RECORDED_MESSAGE, REMOVE_DIRECTION } from "../StockMovementModal.constants";
import type { MovementFormState, MovementValues, UseMovementFormParams } from "../StockMovementModal.types";
import { initialMovement, newBalance, quantityProblem, reasonProblem } from "../StockMovementModal.utils";

/**
 * State of the stock movement form: its values, the balance after the movement, the problems that stop it from being recorded,
 * and recording it. Types other than an adjustment can only remove stock.
 *
 * @param params Parameters of the hook, see {@link UseMovementFormParams}.
 * @param params.lots Lots of the product.
 * @param params.initialType Type of movement selected at the start.
 * @param params.onClose Called once the movement is recorded.
 * @returns The state of the form.
 */
export function useMovementForm({ lots, initialType, onClose }: UseMovementFormParams): MovementFormState {
  const { toast } = useToast();
  const [values, setValues] = useState(() => initialMovement(lots, initialType));
  const balance = newBalance(values, lots);
  const quantityError = quantityProblem(values, balance);
  const reasonError = reasonProblem(values);

  /**
   * Changes one value of the form; a type other than an adjustment goes back to removing stock.
   *
   * @param field Value to change.
   * @param value New value.
   */
  function setValue<Field extends keyof MovementValues>(field: Field, value: MovementValues[Field]) {
    setValues((current) => ({ ...current, [field]: value, ...(field === "type" ? { direction: REMOVE_DIRECTION } : {}) }));
  }

  /** Records the movement and closes the dialog. */
  function submit() {
    toast({ message: RECORDED_MESSAGE, tone: "success" });
    onClose();
  }

  return { values, balance, quantityError, reasonError, canSubmit: !quantityError && !reasonError, setValue, submit };
}
