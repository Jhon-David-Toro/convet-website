import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitEvent } from "react";

import { REJECTED_ERROR, SIGNED_IN_HREF } from "../TwoStepForm.constants";
import type { TwoStepState, UseTwoStepParams } from "../TwoStepForm.types";
import { codeDigits, formatCode, validateCode } from "../TwoStepForm.utils";

/**
 * State of the staff 2-step verification: the code (shown in groups), the trust checkbox, the error and the request in flight.
 * A correct code opens the home page.
 *
 * @param params Parameters of the hook, see {@link UseTwoStepParams}.
 * @param params.onSubmit Checks the code; without it a complete code is accepted.
 * @returns The state and the handlers that change it.
 */
export function useTwoStep({ onSubmit }: UseTwoStepParams): TwoStepState {
  const router = useRouter();
  const [code, setCodeValue] = useState("");
  const [trustDevice, setTrustDevice] = useState(false);
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  /**
   * Stores the typed code, grouped by three, and clears the error.
   *
   * @param text Text typed so far.
   */
  function setCode(text: string) {
    setCodeValue(formatCode(text));
    setError(undefined);
  }

  /**
   * Validates the code, checks it and opens the home page when it is right.
   *
   * @param event Submit event of the form.
   */
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateCode(code);
    setError(found);
    if (found) return;
    setSubmitting(true);
    const accepted = onSubmit ? await onSubmit({ code: codeDigits(code), trustDevice }) : true;
    setSubmitting(false);
    if (accepted) router.push(SIGNED_IN_HREF);
    else setError(REJECTED_ERROR);
  }

  return { code, trustDevice, error, submitting, setCode, setTrustDevice, handleSubmit };
}
