import { useCallback, useId, useRef, useState, type KeyboardEvent } from "react";

import { KEYS } from "@/lib/shared/keys.constants";
import { useOutsidePointerDown } from "@/lib/shared/useOutsidePointerDown";

/**
 * Open state of the dropdown menu: closes on outside pointer and on Escape.
 *
 * @returns Object with `open`, `rootRef`, `menuId`, `close`, `toggle` and `handleKeyDown`.
 */
export function useHeaderMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((current) => !current), []);

  useOutsidePointerDown(rootRef, open, close);

  return {
    open,
    rootRef,
    menuId: useId(),
    close,
    toggle,
    handleKeyDown: (event: KeyboardEvent) => {
      if (event.key === KEYS.escape) close();
    },
  };
}
