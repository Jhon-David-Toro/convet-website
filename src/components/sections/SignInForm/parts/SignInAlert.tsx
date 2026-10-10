import { Alert } from "@/components/ui/Alert";
import { FORGOT_PASSWORD_HREF } from "@/lib/auth.constants";

import { ALERT_ACTION_LABEL, ALERT_TEXT, ALERT_TITLE } from "../SignInForm.constants";

/**
 * Error alert shown when the credentials were rejected, with a link to reset the password.
 *
 * @returns The rendered element.
 */
export function SignInAlert() {
  return (
    <Alert tone="error" title={ALERT_TITLE} action={{ label: ALERT_ACTION_LABEL, href: FORGOT_PASSWORD_HREF }}>
      {ALERT_TEXT}
    </Alert>
  );
}
