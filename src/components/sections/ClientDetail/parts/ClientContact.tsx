import { Icon } from "@/components/ui/Icon";

import type { ClientContactProps } from "../ClientDetail.types";
import { contactLines } from "../ClientDetail.utils";
import styles from "../ClientDetail.module.scss";

/**
 * Phone, email and since when the person is a client.
 *
 * @param props Props of the component, see {@link ClientContactProps}.
 * @param props.client Client of the page.
 * @returns The rendered element.
 */
export function ClientContact({ client }: ClientContactProps) {
  return (
    <ul className={styles.contact}>
      {contactLines(client).map(({ icon, text }) => (
        <li key={text}>
          <Icon icon={icon} size="small" tone="tertiary" />
          {text}
        </li>
      ))}
    </ul>
  );
}
