import { useState } from "react";

import type { ClosureEntry } from "@/lib/admin/admin.types";

import type { ClosuresState } from "../AdminLocations.types";

/**
 * Upcoming closures of the clinic, with the functions that remove one and add one.
 *
 * @param initial Closures the page starts with.
 * @returns The closures and the functions that change them.
 */
export function useClosures(initial: ClosureEntry[]): ClosuresState {
  const [closures, setClosures] = useState(initial);

  return {
    closures,
    remove: (id) => setClosures((current) => current.filter((closure) => closure.id !== id)),
    add: (closure) => setClosures((current) => [...current, closure]),
  };
}
