import { useId, useRef, useState, type KeyboardEvent } from "react";

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
  /**
   * Closes the dropdown menu.
   */
  const close = () => setOpen(false);

  useOutsidePointerDown(rootRef, open, close);

  return {
    open,
    rootRef,
    menuId: useId(),
    close,
    /**
     * Opens the menu when it is closed and closes it when it is open.
     */
    toggle: () => setOpen((current) => !current),
    /**
     * Closes the menu with Escape.
     *
     * @param event Keyboard event of the header.
     */
    handleKeyDown: (event: KeyboardEvent) => {
      if (event.key === KEYS.escape) close();
    },
  };
}
