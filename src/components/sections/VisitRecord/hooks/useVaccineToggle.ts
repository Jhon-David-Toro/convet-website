import { useState } from "react";

import type { VaccineToggle } from "../VisitRecord.types";

/**
 * Whether a vaccination is part of the visit, with the functions that remove it and add it back.
 *
 * @returns The flag and the two functions.
 */
export function useVaccineToggle(): VaccineToggle {
  const [vaccinating, setVaccinating] = useState(true);

  return { vaccinating, removeVaccine: () => setVaccinating(false), addVaccine: () => setVaccinating(true) };
}
