import { useCallback, useMemo, useRef, useState } from "react";

import type { ToastItem, ToastOptions } from "../Toast.types";
import { appendToast, removeToast, toastDuration } from "../Toast.utils";
import { useToastTimers } from "./useToastTimers";

/**
 * The toasts on screen, how to add and dismiss them, and the timers that dismiss them.
 *
 * @returns Object with `items`, `api`, `dismiss`, `schedule`, `pause`.
 */
export function useToastQueue() {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const remove = useCallback((id: number) => setItems((current) => removeToast(current, id)), []);
  const { schedule, pause } = useToastTimers(remove);

  const dismiss = useCallback(
    (id: number) => {
      pause(id);
      remove(id);
    },
    [pause, remove],
  );

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = nextId.current++;
      setItems((current) => appendToast(current, { ...options, id }));
      schedule(id, toastDuration(options));
      return id;
    },
    [schedule],
  );

  const api = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return { items, api, dismiss, schedule, pause };
}
