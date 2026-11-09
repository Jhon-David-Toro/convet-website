import { onlyErrors, requireText, validateEmail, validateNewPassword, validatePhone } from "@/lib/auth/validation.utils";

import { SIGN_UP_ERRORS } from "./SignUpForm.constants";
import type { SignUpErrors, SignUpValues } from "./SignUpForm.types";

/**
 * Validates the sign-up form before it is sent.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the form can be sent.
 */
export function validateSignUp(values: SignUpValues): SignUpErrors {
  return onlyErrors({
    firstName: requireText(values.firstName, SIGN_UP_ERRORS.firstName),
    lastName: requireText(values.lastName, SIGN_UP_ERRORS.lastName),
    email: validateEmail(values.email),
    phone: validatePhone(values.phone),
    password: validateNewPassword(values.password),
    acceptTerms: values.acceptTerms ? undefined : SIGN_UP_ERRORS.acceptTerms,
    whatsappReminders: undefined,
  });
}
