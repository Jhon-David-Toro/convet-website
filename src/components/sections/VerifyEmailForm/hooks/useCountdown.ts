import { useEffect, useState } from "react";

import type { CountdownState } from "../VerifyEmailForm.types";
import { repeatEverySecond } from "../VerifyEmailForm.utils";

/**
 * Counts seconds down to zero.
 *
 * @param from Seconds to count down from.
 * @returns The seconds left and a function that starts the count again.
 */
export function useCountdown(from: number): CountdownState {
  const [seconds, setSeconds] = useState(from);
  const running = seconds > 0;

  useEffect(() => repeatEverySecond(() => setSeconds((current) => Math.max(current - 1, 0)), running), [running]);

  return { seconds, restart: () => setSeconds(from) };
}
