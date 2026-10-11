import { Button } from "@/components/ui/Button";
import { SIGN_IN_HREF } from "@/lib/auth/auth.constants";

import { HAVE_ACCOUNT_LABEL, SIGN_IN_LABEL } from "../SignUpForm.constants";
import styles from "../SignUpForm.module.scss";

/**
 * Line under the form that sends people who already have an account to sign in.
 *
 * @returns The rendered element.
 */
export function SignUpFooter() {
  return (
    <p className={styles.haveAccount}>
      {HAVE_ACCOUNT_LABEL}
      <Button variant="tertiary" size="small" href={SIGN_IN_HREF}>
        {SIGN_IN_LABEL}
      </Button>
    </p>
  );
}
