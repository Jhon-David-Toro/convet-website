import { Avatar } from "@/components/ui/Avatar";

import type { ClientHeaderProps } from "../ClientDetail.types";
import { ClientActions } from "./ClientActions";
import { ClientBadges } from "./ClientBadges";
import { ClientContact } from "./ClientContact";
import styles from "../ClientDetail.module.scss";

/**
 * Card at the top of the client page: name, phone, email, since when they are a client, their account badges and the main actions.
 *
 * @param props Props of the component, see {@link ClientHeaderProps}.
 * @param props.client Client of the page.
 * @returns The rendered element.
 */
export function ClientHeader({ client }: ClientHeaderProps) {
  return (
    <section className={styles.header} aria-labelledby="client-name">
      <Avatar subject="person" size="large" className={styles.avatar} />
      <div className={styles.identity}>
        <h1 id="client-name" className={styles.name}>
          {client.name}
        </h1>
        <ClientContact client={client} />
        <ClientBadges />
      </div>
      <ClientActions />
    </section>
  );
}
