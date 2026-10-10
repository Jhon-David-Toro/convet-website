import type { StrengthLevel } from "./PasswordStrength.types";

export const STRENGTH_SEGMENTS = 4;

export const STRENGTH_LEVELS: StrengthLevel[] = [
  { label: "Weak", tone: "error" },
  { label: "Fair", tone: "warning" },
  { label: "Strong", tone: "success" },
  { label: "Very strong", tone: "success" },
];

export const LOWERCASE_PATTERN = /[a-z]/;

export const UPPERCASE_PATTERN = /[A-Z]/;

export const DIGIT_PATTERN = /\d/;

export const SYMBOL_PATTERN = /[^A-Za-z0-9]/;
