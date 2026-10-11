import { Button } from "@/components/ui/Button";

import { RESEND_COUNTDOWN_LABEL, RESEND_LABEL, RESEND_PREFIX } from "../VerifyEmailForm.constants";
import type { ResendRowProps } from "../VerifyEmailForm.types";
import { formatCountdown } from "../VerifyEmailForm.utils";
import styles from "../VerifyEmailForm.module.scss";

/**
 * "Didn't get it?" line with the button that asks for a new code once the countdown reaches zero.
 *
 * @param props Props of the component, see {@link ResendRowProps}.
 * @param props.seconds Seconds left before a new code can be requested.
 * @param props.handleResend Asks for a new code.
 * @returns The rendered element.
 */
export function ResendRow({ seconds, handleResend }: ResendRowProps) {
  const waiting = seconds > 0;

  return (
    <p className={styles.resend}>
      {RESEND_PREFIX}
      <Button type="button" variant="tertiary" size="small" disabled={waiting} onClick={handleResend}>
        {waiting ? `${RESEND_COUNTDOWN_LABEL} ${formatCountdown(seconds)}` : RESEND_LABEL}
      </Button>
    </p>
  );
}
