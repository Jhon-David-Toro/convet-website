import { requireText } from "@/lib/auth/validation.utils";
import type { FormErrors } from "@/lib/shared/useFormModal.types";
import type { InventoryLot, StaffInventoryRow } from "@/lib/staff/staff.types";

import { INSTRUCTIONS_ERROR, PATIENT_ERROR, QUANTITY_ERROR } from "./DispenseModal.constants";
import type { DispenseValues } from "./DispenseModal.types";

/**
 * Lots of a product that can be dispensed from, the one that expires first on top.
 *
 * @param product Product to dispense.
 * @returns The lots with something on hand.
 */
export function dispensableLots(product: StaffInventoryRow): InventoryLot[] {
  return product.lots.filter((lot) => lot.quantity > 0);
}

/**
 * Text of a lot in the list: code, expiry and how many are left.
 *
 * @param lot Lot of the product.
 * @returns For example "CP-7802 · exp Nov 30, 2026".
 */
export function lotLabel(lot: InventoryLot): string {
  return `${lot.code} · exp ${lot.expiry}`;
}

/**
 * Units left in a lot after dispensing a quantity.
 *
 * @param product Product to dispense.
 * @param values Values of the form.
 * @returns What is left; the whole lot when the quantity is not a number.
 */
export function leftAfter(product: StaffInventoryRow, values: DispenseValues): number {
  const lot = product.lots.find((candidate) => candidate.code === values.lot);
  const quantity = Number(values.quantity);
  return (lot?.quantity ?? 0) - (Number.isInteger(quantity) && quantity > 0 ? quantity : 0);
}

/**
 * Validates the form: a patient, a quantity that is a whole number and fits in the lot, and the dosage instructions.
 *
 * @param product Product to dispense.
 * @returns A validator for the values of the form.
 */
export function validateDispense(product: StaffInventoryRow): (values: DispenseValues) => FormErrors<DispenseValues> {
  return (values) => {
    const quantity = Number(values.quantity);
    const left = leftAfter(product, values);
    const messages = {
      patient: requireText(values.patient, PATIENT_ERROR),
      quantity: !Number.isInteger(quantity) || quantity < 1 ? QUANTITY_ERROR : left < 0 ? `Only ${left + quantity} ${product.unit} left in this lot.` : undefined,
      instructions: requireText(values.instructions, INSTRUCTIONS_ERROR),
    };
    return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
  };
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @returns For example "Fix 1 field to dispense".
 */
export function errorTitle(count: number): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to dispense`;
}
