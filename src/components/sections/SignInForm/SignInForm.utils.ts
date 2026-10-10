import { onlyErrors, requireText, validateEmail } from "@/lib/validation.utils";

import { EMAIL_REQUIRED_ERROR, PASSWORD_REQUIRED_ERROR } from "./SignInForm.constants";
import type { SignInErrors, SignInValues } from "./SignInForm.types";

/**
 * Validates the sign-in form before it is sent.
 *
 * @param values Values of the form.
 * @returns The message of every invalid field; empty when the form can be sent.
 */
export function validateSignIn(values: SignInValues): SignInErrors {
  return onlyErrors({
    email: requireText(values.email, EMAIL_REQUIRED_ERROR) ?? validateEmail(values.email),
    password: requireText(values.password, PASSWORD_REQUIRED_ERROR),
  });
}
