import { KEYS } from "@/lib/shared/keys.constants";

/**
 * Calls `onEscape` whenever the Escape key is pressed.
 *
 * @param onEscape Called when Escape is pressed.
 * @returns The cleanup that stops listening.
 */
export function listenEscape(onEscape: () => void): () => void {
  /**
   * Reports presses of the Escape key.
   *
   * @param event Keyboard event of the press.
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === KEYS.escape) onEscape();
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}
