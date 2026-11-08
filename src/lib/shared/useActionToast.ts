import { useTransition } from "react";

import { useToast } from "@/components/ui/Toast";

import type { ActionToastState, ServerAction } from "./useActionToast.types";

/**
 * Runs a Server Action from a button and tells the user how it went with a toast: the success message, or the safe error the
 * action returned. While it runs, `pending` is true so the button can be disabled.
 *
 * @param action Server Action that returns an `ActionResult`; without it `run` does nothing.
 * @param successMessage Message of the toast when the action succeeds.
 * @returns Whether the action is running and the function that runs it.
 */
export function useActionToast<Args extends unknown[], Data>(action: ServerAction<Args, Data> | undefined, successMessage: string): ActionToastState<Args, Data> {
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();

  /**
   * Runs the action and shows the toast.
   *
   * @param args Arguments of the action.
   * @returns The result, or `undefined` when there is no action.
   */
  function run(...args: Args) {
    if (!action) return Promise.resolve(undefined);
    return new Promise<Awaited<ReturnType<typeof action>>>((resolve) => {
      startTransition(async () => {
        const result = await action(...args);
        toast(result.ok ? { message: successMessage, tone: "success" } : { message: result.message, tone: "error" });
        resolve(result);
      });
    });
  }

  return { pending, run };
}
