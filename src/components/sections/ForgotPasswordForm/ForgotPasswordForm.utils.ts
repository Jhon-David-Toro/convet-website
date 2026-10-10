import { requireText, validateEmail } from "@/lib/validation.utils";

import { EMAIL_REQUIRED_ERROR } from "./ForgotPasswordForm.constants";

/**
 * Error message of the email typed in the reset form.
 *
 * @param email Address typed by the visitor.
 * @returns The message, or `undefined` when the address can be used.
 */
export function validateResetEmail(email: string): string | undefined {
  return requireText(email, EMAIL_REQUIRED_ERROR) ?? validateEmail(email);
}

/**
 * Text of the confirmation: it does not say whether the account exists.
 *
 * @param email Address the link was requested for.
 * @returns The confirmation text.
 */
export function sentMessage(email: string): string {
  return `If an account exists for ${email}, you'll get a link in the next few minutes. It expires in 30 minutes.`;
}
