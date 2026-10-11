import { useRouter } from "next/navigation";
import { useState } from "react";

import { useToast } from "@/components/ui/Toast";
import { useLoadingDelay } from "@/lib/shared/useLoadingDelay";

import { EXIT_HREF, LOADING_MS, MOVED_MESSAGE } from "../RescheduleFlow.constants";
import type { RescheduleState, RescheduleStep } from "../RescheduleFlow.types";

/**
 * State of the reschedule: the step, the new day and time (a new day clears the time and starts the loading placeholder),
 * and moving the visit, which goes back to the appointments with a toast.
 *
 * @returns The state and the functions that change it.
 */
export function useReschedule(): RescheduleState {
  const router = useRouter();
  const { toast } = useToast();
  const { loading, start } = useLoadingDelay(LOADING_MS);
  const [step, setStep] = useState<RescheduleStep>(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return {
    step,
    date,
    time,
    loading,
    canContinue: Boolean(date && time),
    chooseDate: (iso) => {
      setDate(iso);
      setTime("");
      start();
    },
    chooseTime: setTime,
    back: () => (step === 0 ? router.push(EXIT_HREF) : setStep(0)),
    next: () => setStep(1),
    move: () => {
      router.push(EXIT_HREF);
      toast({ message: MOVED_MESSAGE, tone: "success" });
    },
  };
}
