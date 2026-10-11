"use client";

import { Alert } from "@/components/ui/Alert";
import { BOOKING_HREF } from "@/lib/site/site.constants";

import { DISMISS_LABEL, REMINDERS_TITLE } from "../CustomerOverview.constants";
import styles from "../CustomerOverview.module.scss";
import type { OverviewRemindersProps } from "../CustomerOverview.types";
import { useDismissed } from "../hooks/useDismissed";

/**
 * Reminders about vaccines and visits as alerts that can be dismissed, each with a link to book.
 *
 * @param props Props of the component, see {@link OverviewRemindersProps}.
 * @param props.reminders Reminders to show.
 * @returns The rendered element.
 */
export function OverviewReminders({ reminders }: OverviewRemindersProps) {
  const { visible, dismiss } = useDismissed(reminders);

  return (
    <section className={styles.block} aria-labelledby="overview-reminders">
      <h2 id="overview-reminders" className={styles.blockTitle}>
        {REMINDERS_TITLE}
      </h2>
      {visible.map(({ id, tone, title, text, actionLabel }) => (
        <Alert key={id} tone={tone} title={title} action={{ label: actionLabel, href: BOOKING_HREF }} onDismiss={() => dismiss(id)} dismissLabel={DISMISS_LABEL}>
          {text}
        </Alert>
      ))}
    </section>
  );
}
