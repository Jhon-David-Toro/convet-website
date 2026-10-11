import { PANEL_ID } from "../PetProfile.constants";
import type { PetTabPanelProps } from "../PetProfile.types";
import { HistoryTab } from "./HistoryTab";
import { TabPlaceholder } from "./TabPlaceholder";
import { VaccinesTab } from "./VaccinesTab";
import styles from "../PetProfile.module.scss";

/**
 * Panel of the selected tab: vaccines and history have content, the rest show an empty state for now.
 *
 * @param props Props of the component, see {@link PetTabPanelProps}.
 * @param props.pet Pet of the profile.
 * @param props.tab Selected tab.
 * @returns The rendered element.
 */
export function PetTabPanel({ pet, tab }: PetTabPanelProps) {
  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.panel}>
      {tab === "vaccines" && <VaccinesTab pet={pet} />}
      {tab === "history" && <HistoryTab pet={pet} />}
      {tab !== "vaccines" && tab !== "history" && <TabPlaceholder />}
    </div>
  );
}
