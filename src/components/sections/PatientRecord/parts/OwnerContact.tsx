import { CheckCircle, Icon } from "@/components/ui/Icon";

import { ONLINE_ACCOUNT_LABEL } from "../PatientRecord.constants";
import type { OwnerContactProps } from "../PatientRecord.types";
import { ownerContacts } from "../PatientRecord.utils";
import styles from "../PatientRecord.module.scss";

/**
 * Phone and email of the owner, and whether they have an online account.
 *
 * @param props Props of the component, see {@link OwnerContactProps}.
 * @param props.owner Owner to show.
 * @returns The rendered element.
 */
export function OwnerContact({ owner }: OwnerContactProps) {
  return (
    <ul className={styles.contact}>
      {ownerContacts(owner).map(({ icon, text }) => (
        <li key={text}>
          <Icon icon={icon} size="small" tone="tertiary" />
          <span className={styles.mono}>{text}</span>
        </li>
      ))}
      <li className={styles.linked}>
        <Icon icon={CheckCircle} size="small" />
        {ONLINE_ACCOUNT_LABEL}
      </li>
    </ul>
  );
}
