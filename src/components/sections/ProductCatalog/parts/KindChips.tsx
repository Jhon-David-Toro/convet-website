import { Chip } from "@/components/ui/Chip";
import { PRODUCT_KIND_OPTIONS } from "@/lib/catalog/products.constants";

import { ALL_KINDS_LABEL, KIND_CHIPS_LABEL } from "../ProductCatalog.constants";
import styles from "../ProductCatalog.module.scss";
import type { KindChipsProps } from "../ProductCatalog.types";
import { totalCount } from "../ProductCatalog.utils";

/**
 * Chips that pick a single product kind, or all of them, with the number of products of each.
 *
 * @param props Props of the component, see {@link KindChipsProps}.
 * @param props.kinds Selected kinds.
 * @param props.kindCounts Number of products of every kind.
 * @param props.onSelectKind Selects a single kind, or every kind with `undefined`.
 * @returns The rendered element.
 */
export function KindChips({ kinds, kindCounts, onSelectKind }: KindChipsProps) {
  return (
    <div role="group" aria-label={KIND_CHIPS_LABEL} className={styles.chips}>
      <Chip selected={kinds.length === 0} count={totalCount(kindCounts)} onClick={() => onSelectKind()}>
        {ALL_KINDS_LABEL}
      </Chip>
      {PRODUCT_KIND_OPTIONS.map(({ value, label }) => (
        <Chip key={value} selected={kinds.length === 1 && kinds[0] === value} count={kindCounts[value]} onClick={() => onSelectKind(value)}>
          {label}
        </Chip>
      ))}
    </div>
  );
}
