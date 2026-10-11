import { Alert } from "@/components/ui/Alert";
import { STAFF_ATTENTION } from "@/lib/staff/staff.constants";

import { ATTENTION_TITLE } from "../StaffToday.constants";
import styles from "../StaffToday.module.scss";

/**
 * Things that need the team's attention: new online bookings, low stock and expired lots, each with its action.
 *
 * @returns The rendered element.
 */
export function AttentionPanel() {
  return (
    <aside className={styles.attention} aria-labelledby="attention-title">
      <h2 id="attention-title" className={styles.attentionTitle}>
        {ATTENTION_TITLE}
      </h2>
      {STAFF_ATTENTION.map(({ id, tone, title, text, actionLabel, href }) => (
        <Alert key={id} tone={tone} title={title} action={{ label: actionLabel, href }}>
          {text}
        </Alert>
      ))}
    </aside>
  );
}
