import { PASSWORD_MIN_LENGTH } from "@/lib/auth/auth.constants";

import {
  DIGIT_PATTERN,
  SYMBOL_PATTERN,
  UPPERCASE_PATTERN,
} from "./PasswordStrength.constants";

/**
 * Scores a password from 0 (empty) to 4 based on its length,
 * uppercase letter, and character variety.
 *
 * @param password Password typed by the visitor.
 * @returns The score, from 0 to 4.
 */
export function scorePassword(password: string): number {
  if (!password) return 0;

  const long = password.length >= PASSWORD_MIN_LENGTH;
  const uppercase = UPPERCASE_PATTERN.test(password);
  const hasNumber = DIGIT_PATTERN.test(password);
  const hasSymbol = SYMBOL_PATTERN.test(password);
  const hasNumberOrSymbol = hasNumber || hasSymbol;
  const hasBoth = hasNumber && hasSymbol;

  const points = [
    long,
    uppercase,
    hasNumberOrSymbol,
    hasBoth,
  ].filter(Boolean).length;

  // A non-empty short password always starts at Weak.
  return long ? Math.max(points, 1) : 1;
}