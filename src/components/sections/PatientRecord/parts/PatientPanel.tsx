import { EmptyState } from "@/components/ui/EmptyState";
import { Clipboard } from "@/components/ui/Icon";
import { STAFF_LAST_VISIT } from "@/lib/staff/staff.constants";

import { EMPTY_MESSAGES, PANEL_ID } from "../PatientRecord.constants";
import type { PatientPanelProps } from "../PatientRecord.types";
import { entriesFor, recordEntriesFor } from "../PatientRecord.utils";
import { TimelineList } from "./TimelineList";
import { VisitCard } from "./VisitCard";
import styles from "../PatientRecord.module.scss";

/**
 * Content of the selected tab: the last visit card on "Visits", then the history entries of the tab or an empty state.
 *
 * @param props Props of the component, see {@link PatientPanelProps}.
 * @param props.tab Selected tab.
 * @param props.record Record of the patient from the backend; without it the sample record is shown.
 * @returns The rendered element.
 */
export function PatientPanel({ tab, record }: PatientPanelProps) {
  const entries = record ? recordEntriesFor(tab, record) : entriesFor(tab);
  const lastVisit = record ? record.lastVisit : STAFF_LAST_VISIT;
  const showVisit = tab === "visits" && lastVisit;
  const isEmpty = entries.length === 0 && !showVisit;

  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.panel}>
      {showVisit && <VisitCard visit={lastVisit} />}
      {isEmpty ? <EmptyState icon={Clipboard} title={EMPTY_MESSAGES[tab]} /> : <TimelineList entries={entries} />}
    </div>
  );
}
