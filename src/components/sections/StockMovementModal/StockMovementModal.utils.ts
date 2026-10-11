import type { SelectOption } from "@/components/ui/Select";
import type { ProductLot } from "@/lib/admin/admin.types";

import { ADJUSTMENT_TYPE, REASON_REQUIRED, REMOVE_DIRECTION } from "./StockMovementModal.constants";
import type { MovementType, MovementValues } from "./StockMovementModal.types";

/**
 * Values the form starts with: the first lot, one unit, and the type chosen by the button that opened the dialog.
 *
 * @param lots Lots of the product.
 * @param type Type of movement selected at the start.
 * @returns The initial values.
 */
export function initialMovement(lots: ProductLot[], type: MovementType = ADJUSTMENT_TYPE): MovementValues {
  return { type, lot: lots[0]?.code ?? "", direction: REMOVE_DIRECTION, quantity: "1", reason: "" };
}

/**
 * Text of a lot in the list: code, expiry and how many are on hand.
 *
 * @param lot Lot of the product.
 * @returns For example "RB-24187 · exp Nov 30, 2026 · 6 on hand".
 */
export function lotOption(lot: ProductLot): string {
  return `${lot.code} · exp ${lot.expiry} · ${lot.onHand} on hand`;
}

/**
 * Balance of a lot after the movement.
 *
 * @param values Values of the form.
 * @param lots Lots of the product.
 * @returns The units that would be left on hand; the current balance when the quantity is not a number.
 */
export function newBalance(values: MovementValues, lots: ProductLot[]): number {
  const onHand = lots.find((lot) => lot.code === values.lot)?.onHand ?? 0;
  const quantity = Number(values.quantity);
  if (!Number.isInteger(quantity) || quantity <= 0) return onHand;
  return values.direction === REMOVE_DIRECTION ? onHand - quantity : onHand + quantity;
}

/**
 * Problem with the quantity, if there is one: it must be a positive whole number and cannot take out more than what is on hand.
 *
 * @param values Values of the form.
 * @param balance Balance after the movement.
 * @returns The message, or `undefined` when the quantity is fine.
 */
export function quantityProblem(values: MovementValues, balance: number): string | undefined {
  const quantity = Number(values.quantity);
  if (!Number.isInteger(quantity) || quantity <= 0) return "Enter a whole number greater than 0.";
  return balance < 0 ? "That is more than what is on hand." : undefined;
}

/**
 * Problem with the reason: adjustments need one.
 *
 * @param values Values of the form.
 * @returns The message, or `undefined` when the reason is fine.
 */
export function reasonProblem(values: MovementValues): string | undefined {
  return values.type === ADJUSTMENT_TYPE && values.reason.trim() === "" ? REASON_REQUIRED : undefined;
}

/**
 * Options of the lot list: the code of each lot and its text.
 *
 * @param lots Lots of the product.
 * @returns The options for the select.
 */
export function lotOptions(lots: ProductLot[]): SelectOption[] {
  return lots.map((lot) => ({ value: lot.code, label: lotOption(lot) }));
}
