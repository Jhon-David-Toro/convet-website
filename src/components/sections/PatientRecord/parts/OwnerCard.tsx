import { Button } from "@/components/ui/Button";
import { WhatsApp } from "@/components/ui/Icon";

import { OWNER_LABEL, WHATSAPP_LABEL } from "../PatientRecord.constants";
import styles from "../PatientRecord.module.scss";
import type { OwnerCardProps } from "../PatientRecord.types";
import { OwnerContact } from "./OwnerContact";
import { OwnerHead } from "./OwnerHead";

/**
 * Owner of the patient: name, how long they have been a client, phone, email, whether they have an online account, and the WhatsApp button.
 *
 * @param props Props of the component, see {@link OwnerCardProps}.
 * @param props.owner Owner to show.
 * @returns The rendered element.
 */
export function OwnerCard({ owner }: OwnerCardProps) {
  return (
    <section className={styles.card} aria-label={OWNER_LABEL}>
      <p className={styles.overline}>{OWNER_LABEL}</p>
      <OwnerHead owner={owner} />
      <OwnerContact owner={owner} />
      <Button href={owner.whatsapp} variant="secondary" leadingIcon={WhatsApp} className={styles.whatsapp}>
        {WHATSAPP_LABEL}
      </Button>
    </section>
  );
}
