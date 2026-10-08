import { useCallback, useEffect, useRef } from "react";

import type { ToastTimers } from "../Toast.types";
import { cancelAllTimers } from "../Toast.utils";

/**
 * Countdowns that dismiss toasts. Each toast has at most one timer, which can be paused and restarted.
 *
 * @param onExpire Called with the id of a toast whose time ran out.
 * @returns Object with `schedule`, `pause`.
 */
export function useToastTimers(onExpire: (id: number) => void): ToastTimers {
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const pause = useCallback((id: number) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);

  const schedule = useCallback(
    (id: number, duration: number) => {
      pause(id);
      timers.current.set(id, setTimeout(() => onExpire(id), duration));
    },
    [pause, onExpire],
  );

  useEffect(() => cancelAllTimers(timers.current), []);

  return { schedule, pause };
}
