import { useState } from "react";

import type { Disclosure } from "./useDisclosure.types";

/**
 * Open/closed state of something that is shown and hidden, like a modal.
 *
 * @param initial Whether it starts open.
 * @returns Whether it is open and the functions that open and close it.
 */
export function useDisclosure(initial = false): Disclosure {
  const [open, setOpen] = useState(initial);

  return { open, show: () => setOpen(true), hide: () => setOpen(false) };
}
