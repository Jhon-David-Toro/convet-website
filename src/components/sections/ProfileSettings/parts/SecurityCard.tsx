import { Button } from "@/components/ui/Button";
import { Trash } from "@/components/ui/Icon";

import {
  CHANGE_LABEL,
  DELETE_LABEL,
  FORGOT_HREF,
  PASSWORD_LABEL,
  PASSWORD_NOTE,
  SECURITY_TITLE,
  SESSIONS_LABEL,
  SESSIONS_NOTE,
  SIGN_OUT_OTHERS_LABEL,
} from "../ProfileSettings.constants";
import { SecurityRow } from "./SecurityRow";
import styles from "../ProfileSettings.module.scss";

/**
 * Security card: change the password, sign out of other sessions and delete the account.
 *
 * @returns The rendered element.
 */
export function SecurityCard() {
  return (
    <section className={styles.card} aria-labelledby="profile-security">
      <h2 id="profile-security" className={styles.cardTitle}>
        {SECURITY_TITLE}
      </h2>
      <SecurityRow label={PASSWORD_LABEL} note={PASSWORD_NOTE}>
        <Button variant="secondary" size="small" href={FORGOT_HREF}>
          {CHANGE_LABEL}
        </Button>
      </SecurityRow>
      <SecurityRow label={SESSIONS_LABEL} note={SESSIONS_NOTE}>
        <Button variant="tertiary" size="small">
          {SIGN_OUT_OTHERS_LABEL}
        </Button>
      </SecurityRow>
      <Button variant="tertiary" size="small" leadingIcon={Trash} className={styles.delete}>
        {DELETE_LABEL}
      </Button>
    </section>
  );
}
