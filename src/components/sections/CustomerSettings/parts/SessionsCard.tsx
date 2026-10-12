import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Grid, LogOut, Phone } from "@/components/ui/Icon";

import { CURRENT_LABEL, SESSIONS_TITLE, SIGN_OUT_LABEL, SIGN_OUT_OTHERS_LABEL } from "../CustomerSettings.constants";
import type { SessionsCardProps } from "../CustomerSettings.types";
import { SettingsRow } from "./SettingsRow";
import styles from "../CustomerSettings.module.scss";

/**
 * Active sessions card: the devices signed in, the current one marked, a button to sign out of one and another to sign out of all the others.
 *
 * @param props Props of the component, see {@link SessionsCardProps}.
 * @param props.sessions Sessions that are signed in.
 * @param props.signOutSession Signs out of one session.
 * @param props.signOutOthers Signs out of every session but the current one.
 * @returns The rendered element.
 */
export function SessionsCard({ sessions, signOutSession, signOutOthers }: SessionsCardProps) {
  const hasOthers = sessions.some((session) => !session.current);

  return (
    <section className={styles.card} aria-labelledby="settings-sessions">
      <h2 id="settings-sessions" className={styles.cardTitle}>
        {SESSIONS_TITLE}
      </h2>
      <ul className={styles.rows}>
        {sessions.map((session) => (
          <SettingsRow
            key={session.id}
            icon={session.current ? Grid : Phone}
            title={session.device}
            note={session.detail}
            badge={session.current ? <Badge tone="info">{CURRENT_LABEL}</Badge> : undefined}
            action={
              session.current ? undefined : (
                <Button type="button" variant="tertiary" size="small" onClick={() => signOutSession(session.id)}>
                  {SIGN_OUT_LABEL}
                </Button>
              )
            }
          />
        ))}
      </ul>
      {hasOthers && (
        <Button type="button" variant="secondary" size="small" leadingIcon={LogOut} className={styles.signOutOthers} onClick={signOutOthers}>
          {SIGN_OUT_OTHERS_LABEL}
        </Button>
      )}
    </section>
  );
}
