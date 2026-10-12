import { requireText } from "@/lib/auth/validation.utils";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import { CATEGORY_ERROR, NAME_ERROR, VETS_ERROR } from "./ServiceModal.constants";
import type { ServiceValues } from "./ServiceModal.types";

/**
 * Validates the service form: a name, a category and at least one vet who offers it.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the form can be saved.
 */
export function validateService(values: ServiceValues): FormErrors<ServiceValues> {
  const messages = {
    name: requireText(values.name, NAME_ERROR),
    category: requireText(values.category, CATEGORY_ERROR),
    vets: values.vets.length > 0 ? undefined : VETS_ERROR,
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Vets after one of them is ticked or unticked.
 *
 * @param vets Vets that are ticked.
 * @param name Vet that was clicked.
 * @returns The vets without the one, or with it when it was not there.
 */
export function toggleVet(vets: string[], name: string): string[] {
  return vets.includes(name) ? vets.filter((vet) => vet !== name) : [...vets, name];
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @returns For example "Fix 2 fields to create the service".
 */
export function errorTitle(count: number): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to create the service`;
}
