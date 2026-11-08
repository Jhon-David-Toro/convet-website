import type { ServiceRow } from "@/lib/admin/admin.types";

import type { BranchServiceDto } from "./branches.contract";

/** Length of every appointment slot in the backend, in minutes. */
export const SLOT_MINUTES = 20;

const CURRENCY = "AWG";

/**
 * Price of a service as the admin types and reads it, e.g. "AWG 45.00".
 *
 * @param amount Price in the backend, or `undefined` when it has none.
 * @returns The label, or an empty string without price.
 */
export function priceLabel(amount: number | undefined): string {
  return amount === undefined ? "" : `${CURRENCY} ${amount.toFixed(2)}`;
}

/**
 * Reads the amount out of the price field: "AWG 45", "45.5" and "45,50" are all accepted.
 *
 * @param text Text of the price field.
 * @returns The amount rounded to cents, or `undefined` when it is empty or not a positive number.
 */
export function amountFrom(text: string): number | undefined {
  const cleaned = text.replace(/[^\d.,]/g, "").replace(",", ".");
  const amount = Number(cleaned);
  return cleaned && Number.isFinite(amount) && amount > 0 ? Math.round(amount * 100) / 100 : undefined;
}

/**
 * Turns a service of a branch into a row of the admin services table. Species and buffer are not in the backend yet.
 *
 * @param service Service of the branch with its current price.
 * @param vets Number of bookable vets of the branch.
 * @returns The row.
 */
export function toServiceRow(service: BranchServiceDto, vets: number): ServiceRow {
  return {
    id: service.idBranchService,
    branchId: service.branchId,
    name: service.service.name,
    duration: SLOT_MINUTES,
    online: service.isActive,
    vets,
    buffer: 0,
    species: [],
    price: priceLabel(service.prices[0]?.amount),
  };
}
