import { useState } from "react";

import type { UseMaskedValueParams } from "../MaskedInput.types";

/**
 * The (un)controlled formatted value of a masked input.
 *
 * @param params Options, see {@link UseMaskedValueParams}.
 * @param params.value Already formatted value, e.g. "07 / 15 / 2023". Omit it to use the input uncontrolled.
 * @param params.defaultValue Initial value when uncontrolled.
 * @param params.onValueChange Called with the new value.
 * @returns Object with `current`, `commit`.
 */
export function useMaskedValue({ value, defaultValue = "", onValueChange }: UseMaskedValueParams) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  return {
    current: value ?? internalValue,
    /**
     * Stores a new value and notifies the consumer.
     *
     * @param next New formatted value.
     */
    commit: (next: string) => {
      setInternalValue(next);
      onValueChange?.(next);
    },
  };
}
