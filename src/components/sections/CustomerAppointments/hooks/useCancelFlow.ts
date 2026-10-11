import { useRouter, useSearchParams } from "next/navigation";

import { useToast } from "@/components/ui/Toast";

import { APPOINTMENTS_HREF, CANCEL_PARAM, CANCELLED_MESSAGE, UNDO_LABEL } from "../CustomerAppointments.constants";
import type { CancelFlowState, UseCancelFlowParams } from "../CustomerAppointments.types";

/**
 * Cancel dialog of an appointment: which appointment is being cancelled (it comes from the `?cancel=` query), closing the dialog,
 * and confirming, which moves the appointment to the cancelled tab and shows a toast with an "Undo" button.
 *
 * @param params Parameters of the hook, see {@link UseCancelFlowParams}.
 * @param params.groups Appointments by tab.
 * @param params.cancel Moves an appointment to the cancelled tab.
 * @param params.restore Brings a cancelled appointment back.
 * @returns The appointment being cancelled and the functions that close or confirm.
 */
export function useCancelFlow({ groups, cancel, restore }: UseCancelFlowParams): CancelFlowState {
  const router = useRouter();
  const { toast } = useToast();
  const id = useSearchParams().get(CANCEL_PARAM);
  const target = groups.upcoming.find((appointment) => appointment.id === id);

  /** Closes the dialog by removing the appointment from the address. */
  function close() {
    router.replace(APPOINTMENTS_HREF);
  }

  /** Cancels the appointment, closes the dialog and offers to undo it. */
  function confirm() {
    if (!target) return;
    cancel(target.id);
    close();
    toast({ message: CANCELLED_MESSAGE, tone: "success", action: { label: UNDO_LABEL, onClick: () => restore(target.id) } });
  }

  return { target, close, confirm };
}
