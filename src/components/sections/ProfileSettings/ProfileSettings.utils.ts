import { onlyErrors, requireText, validateEmail } from "@/lib/auth/validation.utils";
import type { CustomerProfile } from "@/lib/customer/customer.types";

import { ERROR_MESSAGES } from "./ProfileSettings.constants";
import type { ProfileErrors } from "./ProfileSettings.types";

/**
 * Validates the profile form before it is saved.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the form can be saved.
 */
export function validateProfile(values: CustomerProfile): ProfileErrors {
  return onlyErrors({
    firstName: requireText(values.firstName, ERROR_MESSAGES.firstName),
    lastName: requireText(values.lastName, ERROR_MESSAGES.lastName),
    email: validateEmail(values.email),
    phone: undefined,
  });
}
