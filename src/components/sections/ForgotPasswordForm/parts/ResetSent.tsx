import { Alert } from "@/components/ui/Alert";

import { RESEND_LABEL, SENT_TITLE } from "../ForgotPasswordForm.constants";
import type { ResetSentProps } from "../ForgotPasswordForm.types";
import { sentMessage } from "../ForgotPasswordForm.utils";

/**
 * Confirmation that the reset link was requested, with a button to send it again.
 *
 * @param props Props of the component, see {@link ResetSentProps}.
 * @param props.email Address the link was requested for.
 * @param props.onResend Sends the link again.
 * @returns The rendered element.
 */
export function ResetSent({ email, onResend }: ResetSentProps) {
  return (
    <Alert tone="success" title={SENT_TITLE} action={{ label: RESEND_LABEL, onClick: onResend }}>
      {sentMessage(email)}
    </Alert>
  );
}
