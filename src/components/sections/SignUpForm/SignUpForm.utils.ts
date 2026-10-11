import { PASSWORD_MIN_LENGTH } from "@/lib/auth/auth.constants";
import { onlyErrors, requireText, validateEmail } from "@/lib/auth/validation.utils";

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
    phone: undefined,
    password: values.password.length >= PASSWORD_MIN_LENGTH ? undefined : SIGN_UP_ERRORS.password,
    acceptTerms: values.acceptTerms ? undefined : SIGN_UP_ERRORS.acceptTerms,
    whatsappReminders: undefined,
  });
}
