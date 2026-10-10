import { useRef } from "react";

import type { CodeFocus } from "../CodeInput.types";

/**
 * Refs of the boxes of a code and a function that moves focus between them without leaving the code.
 *
 * @param length Number of boxes.
 * @returns The refs and the focus function.
 */
export function useCodeFocus(length: number): CodeFocus {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return {
    inputRefs,
    focusBox: (index) => inputRefs.current[Math.min(Math.max(index, 0), length - 1)]?.focus(),
  };
}
