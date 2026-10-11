"use client";

import { useRouter } from "next/navigation";

import { Tab } from "@/components/ui/Tab";
import { PET_TABS } from "@/lib/customer/customer.paths.constants";
import { petHref } from "@/lib/customer/customer.utils";

import { PANEL_ID, TAB_LABELS, TABS_LABEL } from "../PetProfile.constants";
import type { PetTabsProps } from "../PetProfile.types";
import styles from "../PetProfile.module.scss";

/**
 * Tabs of the pet profile; choosing one opens its page.
 *
 * @param props Props of the component, see {@link PetTabsProps}.
 * @param props.pet Pet of the profile.
 * @param props.tab Selected tab.
 * @param props.counts Count shown next to the tabs that have one.
 * @returns The rendered element.
 */
export function PetTabs({ pet, tab, counts }: PetTabsProps) {
  const router = useRouter();

  return (
    <div role="tablist" aria-label={TABS_LABEL} className={styles.tabs}>
      {PET_TABS.map((value) => (
        <Tab key={value} selected={tab === value} count={counts[value]} aria-controls={PANEL_ID} onClick={() => router.push(petHref(pet, value))}>
          {TAB_LABELS[value]}
        </Tab>
      ))}
    </div>
  );
}
