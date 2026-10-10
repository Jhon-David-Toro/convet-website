import { Alert } from "@/components/ui/Alert";

import { SENT_ACTION_LABEL, SENT_TEXT, SENT_TITLE } from "../ContactSection.constants";
import styles from "../ContactSection.module.scss";
import type { ContactSentProps } from "../ContactSection.types";

/**
 * Confirmation shown instead of the form after a valid submit, with a way back to an empty form.
 *
 * @param props Props of the component, see {@link ContactSentProps}.
 * @param props.reset Goes back to an empty form.
 * @returns The rendered element.
 */
export function ContactSent({ reset }: ContactSentProps) {
  return (
    <div className={styles.form}>
      <Alert tone="success" title={SENT_TITLE} action={{ label: SENT_ACTION_LABEL, onClick: reset }}>
        {SENT_TEXT}
      </Alert>
    </div>
  );
}
