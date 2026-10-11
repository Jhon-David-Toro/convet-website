import { useState } from "react";

import type { HistoryFilter } from "../PetProfile.types";

/**
 * Selected filter of the history timeline.
 *
 * @returns The filter and the function that changes it.
 */
export function useHistoryFilter() {
  return useState<HistoryFilter>("all");
}
