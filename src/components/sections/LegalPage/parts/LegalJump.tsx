"use client";

import { Select } from "@/components/ui/Select";

import { JUMP_LABEL } from "../LegalPage.constants";
import type { LegalTocProps } from "../LegalPage.types";
import styles from "../LegalPage.module.scss";

/**
 * List that jumps to a section of the page; it replaces the table of contents below desktop.
 *
 * @param props Props of the component, see {@link LegalTocProps}.
 * @param props.items Entries of the table of contents.
 * @returns The rendered element.
 */
export function LegalJump({ items }: LegalTocProps) {
  return (
    <div className={styles.jump}>
      <Select
        label={JUMP_LABEL}
        options={items.map((item) => ({ value: item.id, label: `${Number(item.number)}. ${item.label}` }))}
        defaultValue={items[0].id}
        onValueChange={(id) => document.getElementById(id)?.scrollIntoView()}
      />
    </div>
  );
}
