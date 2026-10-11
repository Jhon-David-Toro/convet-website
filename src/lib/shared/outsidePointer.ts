import type { RefObject } from "react";

/**
 * Calls `onOutside` whenever the pointer goes down outside `ref`.
 *
 * @param ref Ref of the element to watch.
 * @param onOutside Called when the pointer goes down outside the element.
 * @returns The cleanup that stops listening.
 */
export function listenOutsidePointerDown(ref: RefObject<HTMLElement | null>, onOutside: () => void): () => void {
  /**
   * Reports pointer presses that land outside the element.
   *
   * @param event Pointer event of the press.
   */
  const handlePointerDown = (event: PointerEvent) => {
    if (!ref.current?.contains(event.target as Node)) onOutside();
  };

  document.addEventListener("pointerdown", handlePointerDown);
  return () => document.removeEventListener("pointerdown", handlePointerDown);
}
