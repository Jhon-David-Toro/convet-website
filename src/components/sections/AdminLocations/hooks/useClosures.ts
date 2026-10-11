import { useState } from "react";

import type { ClosureEntry } from "@/lib/admin.types";

import { NEW_CLOSURE } from "../AdminLocations.constants";
import type { ClosuresState } from "../AdminLocations.types";

/**
 * Upcoming closures of the clinic, with the functions that remove one and add a new one.
 *
 * @param initial Closures the page starts with.
 * @returns The closures and the functions that change them.
 */
export function useClosures(initial: ClosureEntry[]): ClosuresState {
  const [closures, setClosures] = useState(initial);

  return {
    closures,
    remove: (id) => setClosures((current) => current.filter((closure) => closure.id !== id)),
    add: () => setClosures((current) => [...current, { id: `closure-${current.length + 1}-${NEW_CLOSURE.date}`, ...NEW_CLOSURE }]),
  };
}
