import { useState } from "react";

import type { ToggleListState } from "../AdminSettings.types";

/**
 * On or off value of a list of switches.
 *
 * @param initial Value of each switch at the start, by key.
 * @returns The values and the function that flips one.
 */
export function useToggleList(initial: Record<string, boolean>): ToggleListState {
  const [values, setValues] = useState(initial);

  return { values, toggle: (key) => setValues((current) => ({ ...current, [key]: !current[key] })) };
}
