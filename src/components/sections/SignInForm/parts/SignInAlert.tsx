import { Alert } from "@/components/ui/Alert";
import { FORGOT_PASSWORD_HREF } from "@/lib/auth/auth.constants";

import { ALERT_ACTION_LABEL, ALERT_TEXT, ALERT_TITLE, UNAVAILABLE_TEXT, UNAVAILABLE_TITLE } from "../SignInForm.constants";
import type { SignInAlertProps } from "../SignInForm.types";

/**
 * Error above the form: wrong credentials (with the link to reset the password), or a service that did not answer, so the user does
 * not think their password is wrong when it was never checked.
 *
 * @param props Props of the component, see {@link SignInAlertProps}.
 * @param props.status State of the form.
 * @returns The rendered element, or nothing when there is no error.
 */
export function SignInAlert({ status }: SignInAlertProps) {
  if (status === "unavailable") {
    return (
      <Alert tone="error" title={UNAVAILABLE_TITLE}>
        {UNAVAILABLE_TEXT}
      </Alert>
    );
  }
  if (status !== "error") return null;
  return (
    <Alert tone="error" title={ALERT_TITLE} action={{ label: ALERT_ACTION_LABEL, href: FORGOT_PASSWORD_HREF }}>
      {ALERT_TEXT}
    </Alert>
  );
}
