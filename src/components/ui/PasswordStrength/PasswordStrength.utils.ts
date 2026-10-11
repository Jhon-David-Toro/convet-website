import { PASSWORD_MIN_LENGTH } from "@/lib/auth/auth.constants";

import { DIGIT_PATTERN, LOWERCASE_PATTERN, SYMBOL_PATTERN, UPPERCASE_PATTERN } from "./PasswordStrength.constants";

/**
 * Scores a password from 0 (empty) to 4: one point for the minimum length, mixed case, a digit and a symbol.
 * A password shorter than the minimum never scores above 1.
 *
 * @param password Password typed by the visitor.
 * @returns The score, from 0 to 4.
 */
export function scorePassword(password: string): number {
  if (!password) return 0;
  const long = password.length >= PASSWORD_MIN_LENGTH;
  const mixedCase = LOWERCASE_PATTERN.test(password) && UPPERCASE_PATTERN.test(password);
  const points = [long, mixedCase, DIGIT_PATTERN.test(password), SYMBOL_PATTERN.test(password)].filter(Boolean).length;
  return long ? Math.max(points, 1) : 1;
}
