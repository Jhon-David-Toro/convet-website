import { useEffect, type RefObject } from "react";

import { listenOutsidePointerDown } from "./outsidePointer";

/**
 * Calls `onOutside` when the pointer goes down outside `ref`; only listens while `active` is true.
 *
 * @param ref Ref of the element to watch.
 * @param active Whether the listener is attached.
 * @param onOutside Called when the pointer goes down outside the element.
 */
export function useOutsidePointerDown(ref: RefObject<HTMLElement | null>, active: boolean, onOutside: () => void) {
  useEffect(() => (active ? listenOutsidePointerDown(ref, onOutside) : undefined), [ref, active, onOutside]);
}
