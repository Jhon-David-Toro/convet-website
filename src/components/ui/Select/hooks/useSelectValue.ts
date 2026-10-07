import { useState } from "react";

import type { UseSelectValueParams } from "../Select.types";

/**
 * The (un)controlled value of a select and the index of the selected option.
 *
 * @param params Options, see {@link UseSelectValueParams}.
 * @param params.options Options of the list.
 * @param params.value Controlled value. Omit it to use the select uncontrolled with `defaultValue`.
 * @param params.defaultValue Initial value when uncontrolled.
 * @param params.onValueChange Called with the new value.
 * @returns Object with `current`, `selectedIndex`, `selected`, `commit`.
 */
export function useSelectValue({ options, value, defaultValue = "", onValueChange }: UseSelectValueParams) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const current = value ?? internalValue;
  const selectedIndex = options.findIndex((option) => option.value === current);

  return {
    current,
    selectedIndex,
    selected: options[selectedIndex],
    /**
     * Stores a new value and notifies the consumer.
     *
     * @param next Value of the chosen option.
     */
    commit: (next: string) => {
      setInternalValue(next);
      onValueChange?.(next);
    },
  };
}
