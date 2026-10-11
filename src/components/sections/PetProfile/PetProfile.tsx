import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { vaccinesOf } from "@/lib/customer.utils";

import styles from "./PetProfile.module.scss";
import type { PetProfileProps } from "./PetProfile.types";
import { petBreadcrumbs, tabCounts } from "./PetProfile.utils";
import { NextStepCard } from "./parts/NextStepCard";
import { PetHeader } from "./parts/PetHeader";
import { PetSummary } from "./parts/PetSummary";
import { PetTabPanel } from "./parts/PetTabPanel";
import { PetTabs } from "./parts/PetTabs";

/**
 * Pet profile: breadcrumbs, the header (a summary card below desktop), the tabs and the panel of the selected tab.
 *
 * @param props Props of the component, see {@link PetProfileProps}.
 * @param props.pet Pet to show.
 * @param props.tab Selected tab.
 * @returns The rendered element.
 */
export function PetProfile({ pet, tab }: PetProfileProps) {
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
      <PetTabs pet={pet} tab={tab} counts={tabCounts(vaccinesOf(pet.id))} />
      <PetTabPanel pet={pet} tab={tab} />
    </>
  );
}
