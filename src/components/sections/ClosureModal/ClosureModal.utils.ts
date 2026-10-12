import { parseDate } from "@/components/ui/MaskedInput";
import type { ClosureEntry } from "@/lib/admin/admin.types";
import type { FormErrors } from "@/lib/shared/useFormModal.types";

import { CLOSURE_FORMAT, DATE_ERROR, LONG_FORMAT, REASON_ERROR } from "./ClosureModal.constants";
import type { ClosureValues } from "./ClosureModal.types";

/**
 * Validates the closure: the day must be a real date and the reason clients will see cannot be empty.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the closure can be saved.
 */
export function validateClosure(values: ClosureValues): FormErrors<ClosureValues> {
  const messages = {
    date: parseDate(values.date) ? undefined : DATE_ERROR,
    reason: values.reason.trim() ? undefined : REASON_ERROR,
  };
  return Object.fromEntries(Object.entries(messages).filter(([, message]) => message));
}

/**
 * Builds the closure that is added to the list of the location.
 *
 * @param values Values of the form, already validated.
 * @returns The closure with its day written like "Dec 25, 2026".
 */
export function buildClosure(values: ClosureValues): ClosureEntry {
  const date = parseDate(values.date) ?? new Date();
  return { id: `closure-${date.getTime()}`, date: CLOSURE_FORMAT.format(date), note: values.reason.trim() };
}

/**
 * Sentence that says nothing is booked on the closing day.
 *
 * @param value Day typed in the form.
 * @returns For example "Nothing is booked on Fri, Dec 25, 2026."; empty while the day is not valid.
 */
export function unaffectedText(value: string): string {
  const date = parseDate(value);
  return date ? `Nothing is booked on ${LONG_FORMAT.format(date)}.` : "";
}

/**
 * Title of the error banner: how many fields have to be fixed.
 *
 * @param count Number of invalid fields.
 * @returns For example "Fix 2 fields to save the closure".
 */
export function errorTitle(count: number): string {
  return `Fix ${count} ${count === 1 ? "field" : "fields"} to save the closure`;
}
