import { useEffect, useRef, useState } from "react";

import type { LoadingDelay, TimerRef } from "./useLoadingDelay.types";

/**
 * Cleanup that stops a pending timer when the component goes away.
 *
 * @param timer Ref that holds the id of the timer.
 * @returns A function that clears the timer.
 */
function stopTimerOnCleanup(timer: TimerRef): () => void {
  return () => window.clearTimeout(timer.current);
}

/**
 * A "loading" flag that turns on when `start` is called and off again after a delay, to show a placeholder while something is looked up.
 *
 * @param ms How long the flag stays on.
 * @returns Whether it is loading and the function that starts it.
 */
export function useLoadingDelay(ms: number): LoadingDelay {
  const [loading, setLoading] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => stopTimerOnCleanup(timer), []);

  /** Turns the flag on and schedules it to turn off. */
  function start() {
    window.clearTimeout(timer.current);
    setLoading(true);
    timer.current = window.setTimeout(() => setLoading(false), ms);
  }

  return { loading, start };
}
