import { requireText } from "@/lib/auth/validation.utils";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import { CATEGORY_ERROR, MINIMUM_ERROR, NAME_ERROR, SKU_ERROR, SKU_PATTERN, UNIT_ERROR } from "./ProductModal.constants";
import type { ProductValues } from "./ProductModal.types";

/**
 * Validates the product form: a name, a category, a unit, a SKU written with capitals, numbers and dashes, and a minimum stock that is a whole number.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the form can be saved.
 */
export function validateProduct(values: ProductValues): FormErrors<ProductValues> {
  const messages = {
    name: requireText(values.name, NAME_ERROR),
    category: requireText(values.category, CATEGORY_ERROR),
    unit: requireText(values.unit, UNIT_ERROR),
    sku: SKU_PATTERN.test(values.sku.trim()) ? undefined : SKU_ERROR,
    minimum: /^\d+$/.test(values.minimum.trim()) ? undefined : MINIMUM_ERROR,
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @returns For example "Fix 2 fields to create the product".
 */
export function errorTitle(count: number): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to create the product`;
}
