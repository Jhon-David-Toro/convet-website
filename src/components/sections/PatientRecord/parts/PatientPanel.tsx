import { EmptyState } from "@/components/ui/EmptyState";
import { Clipboard } from "@/components/ui/Icon";
import { STAFF_LAST_VISIT } from "@/lib/staff.constants";

import { EMPTY_MESSAGES, PANEL_ID } from "../PatientRecord.constants";
import styles from "../PatientRecord.module.scss";
import type { PatientPanelProps } from "../PatientRecord.types";
import { entriesFor } from "../PatientRecord.utils";
import { TimelineList } from "./TimelineList";
import { VisitCard } from "./VisitCard";

/**
 * Content of the selected tab: on visits the last signed visit and the history; on the others the matching entries or an empty state.
 *
 * @param props Props of the component, see {@link PatientPanelProps}.
 * @param props.tab Selected tab.
 * @returns The rendered element.
 */
export function PatientPanel({ tab }: PatientPanelProps) {
  const entries = entriesFor(tab);
  const isEmpty = entries.length === 0 && tab !== "visits";

  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.panel}>
      {tab === "visits" && <VisitCard visit={STAFF_LAST_VISIT} />}
      {isEmpty ? <EmptyState icon={Clipboard} title={EMPTY_MESSAGES[tab]} /> : <TimelineList entries={entries} />}
    </div>
  );
}
