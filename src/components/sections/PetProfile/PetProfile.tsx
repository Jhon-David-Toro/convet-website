import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { vaccinesOf } from "@/lib/customer/customer.utils";

import type { PetProfileProps } from "./PetProfile.types";
import { petBreadcrumbs, tabCounts } from "./PetProfile.utils";
import { NextStepCard } from "./parts/NextStepCard";
import { PetHeader } from "./parts/PetHeader";
import { PetSummary } from "./parts/PetSummary";
import { PetTabPanel } from "./parts/PetTabPanel";
import { PetActions } from "./parts/PetActions";
import { PetTabs } from "./parts/PetTabs";
import styles from "./PetProfile.module.scss";

/**
 * Pet profile: breadcrumbs, the header (a summary card below desktop), the edit and archive buttons, the tabs and the panel of the selected tab.
 *
 * @param props Props of the component, see {@link PetProfileProps}.
 * @param props.pet Pet to show.
 * @param props.tab Selected tab.
 * @param props.history Events of the History tab.
 * @param props.onSave Saves the edit form of the pet.
 * @param props.onArchive Archives the pet.
 * @returns The rendered element.
 */
export function PetProfile({ pet, tab, history, onSave, onArchive }: PetProfileProps) {
  return (
    <>
      <Breadcrumbs items={petBreadcrumbs(pet, tab)} className={styles.breadcrumbs} />
      <div className={styles.top}>
        <PetHeader pet={pet} />
        <PetSummary pet={pet} />
        <div className={styles.tabletStep}>
          <NextStepCard pet={pet} />
        </div>
      </div>
      <PetActions pet={pet} onSave={onSave} onArchive={onArchive} />
      <PetTabs pet={pet} tab={tab} counts={tabCounts(vaccinesOf(pet.id))} />
      <PetTabPanel pet={pet} tab={tab} history={history} />
    </>
  );
}
