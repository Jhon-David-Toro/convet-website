import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check, Lock, Mail } from "@/components/ui/Icon";
import { SETTINGS_EMAIL } from "@/lib/customer/customer.settings.constants";

import { CHANGE_EMAIL_LABEL, CHANGE_PASSWORD_LABEL, FORGOT_HREF, PASSWORD_NOTE, SECURITY_TITLE, VERIFIED_LABEL } from "../CustomerSettings.constants";
import { SettingsRow } from "./SettingsRow";
import styles from "../CustomerSettings.module.scss";

/**
 * Sign-in and security card: the verified email with its change button, and the password with its change button.
 *
 * @returns The rendered element.
 */
export function SecurityCard() {
  return (
    <section className={styles.card} aria-labelledby="settings-security">
      <h2 id="settings-security" className={styles.cardTitle}>
        {SECURITY_TITLE}
      </h2>
      <ul className={styles.rows}>
        <SettingsRow
          icon={Mail}
          title="Email"
          note={`${SETTINGS_EMAIL} · used to sign in`}
          badge={
            <Badge tone="success" icon={Check}>
              {VERIFIED_LABEL}
            </Badge>
          }
          action={
            <Button type="button" variant="secondary" size="small">
              {CHANGE_EMAIL_LABEL}
            </Button>
          }
        />
        <SettingsRow
          icon={Lock}
          title="Password"
          note={PASSWORD_NOTE}
          action={
            <Button href={FORGOT_HREF} variant="secondary" size="small">
              {CHANGE_PASSWORD_LABEL}
            </Button>
          }
        />
      </ul>
    </section>
  );
}
