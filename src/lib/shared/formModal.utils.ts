/**
 * Calls `onDone` after a delay.
 *
 * @param onDone Called when the delay is over.
 * @param delay Milliseconds to wait.
 * @returns The cleanup that cancels the wait.
 */
export function scheduleDone(onDone: () => void, delay: number): () => void {
  const timer = setTimeout(onDone, delay);
  return () => clearTimeout(timer);
}
