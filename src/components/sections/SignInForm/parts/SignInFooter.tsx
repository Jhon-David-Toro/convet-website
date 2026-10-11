import { Button } from "@/components/ui/Button";
import { Icon, Shield } from "@/components/ui/Icon";
import { SIGN_UP_HREF } from "@/lib/auth/auth.constants";

import { CREATE_ACCOUNT_LABEL, DIVIDER_LABEL, NOTE_ICON_SIZE, STAFF_NOTE } from "../SignInForm.constants";
import styles from "../SignInForm.module.scss";

/**
 * Under the form: a divider, the button that creates an account and the note for clinic staff.
 *
 * @returns The rendered element.
 */
export function SignInFooter() {
  return (
    <>
      <div className={styles.divider} role="separator">
        <span className={styles.dividerLabel}>{DIVIDER_LABEL}</span>
      </div>
      <Button variant="secondary" href={SIGN_UP_HREF}>
        {CREATE_ACCOUNT_LABEL}
      </Button>
      <p className={styles.note}>
        <Icon icon={Shield} size={NOTE_ICON_SIZE} tone="tertiary" />
        {STAFF_NOTE}
      </p>
    </>
  );
}
