import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowDownCircle, File, Shield, Trash } from "@/components/ui/Icon";
import { PRIVACY_HREF, TERMS_HREF } from "@/lib/auth/auth.constants";

import { COPY_NOTE, DELETE_LABEL, DELETE_NOTE, PRIVACY_TITLE, PROPOSAL_LABEL, READ_LABEL, REQUEST_LABEL } from "../CustomerSettings.constants";
import { SettingsRow } from "./SettingsRow";
import styles from "../CustomerSettings.module.scss";

/**
 * Privacy and data card: the privacy policy and the terms, a request for a copy of the data (a proposal) and the button that deletes the account.
 *
 * @returns The rendered element.
 */
export function PrivacyCard() {
  return (
    <section className={styles.card} aria-labelledby="settings-privacy">
      <h2 id="settings-privacy" className={styles.cardTitle}>
        {PRIVACY_TITLE}
      </h2>
      <ul className={styles.rows}>
        <SettingsRow
          icon={Shield}
          title="Privacy policy"
          note="How we use and protect your information"
          action={
            <Button href={PRIVACY_HREF} variant="tertiary" size="small">
              {READ_LABEL}
            </Button>
          }
        />
        <SettingsRow
          icon={File}
          title="Terms & conditions"
          note="Rules for the site and online booking"
          action={
            <Button href={TERMS_HREF} variant="tertiary" size="small">
              {READ_LABEL}
            </Button>
          }
        />
        <SettingsRow
          icon={ArrowDownCircle}
          title="Request a copy of my data"
          note={COPY_NOTE}
          badge={<Badge tone="warning">{PROPOSAL_LABEL}</Badge>}
          action={
            <Button type="button" variant="secondary" size="small">
              {REQUEST_LABEL}
            </Button>
          }
        />
        <SettingsRow
          icon={Trash}
          title="Delete account"
          note={DELETE_NOTE}
          action={
            <Button type="button" variant="destructive" size="small">
              {DELETE_LABEL}
            </Button>
          }
        />
      </ul>
    </section>
  );
}
