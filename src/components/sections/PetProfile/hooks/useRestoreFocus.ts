import { useEffect, useRef, type RefObject } from "react";

/**
 * Gives the focus back to the button that opened a dialog once the dialog closes, so keyboard users keep their place.
 *
 * @param open Whether the dialog is open.
 * @param trigger Button that opens the dialog.
 */
export function useRestoreFocus(open: boolean, trigger: RefObject<HTMLButtonElement | null>) {
  const wasOpen = useRef(false);

  useEffect(() => {
    if (wasOpen.current && !open) trigger.current?.focus();
    wasOpen.current = open;
  }, [open, trigger]);
}
