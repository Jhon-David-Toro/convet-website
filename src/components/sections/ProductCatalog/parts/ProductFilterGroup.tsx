import { Checkbox } from "@/components/ui/Checkbox";

import type { ProductFilterGroupProps } from "../ProductCatalog.types";
import styles from "../ProductCatalog.module.scss";

/**
 * One group of the filters column: an overline heading and a checkbox per option.
 *
 * @param props Props of the component, see {@link ProductFilterGroupProps}.
 * @param props.title Heading of the group.
 * @param props.group Name of the group in the filters.
 * @param props.options Options of the group.
 * @param props.selected Selected values of the group.
 * @param props.onToggle Adds or removes a value of a filter group.
 * @returns The rendered element.
 */
export function ProductFilterGroup({ title, group, options, selected, onToggle }: ProductFilterGroupProps) {
  return (
    <fieldset className={styles.group}>
      <legend className={styles.groupTitle}>{title}</legend>
      {options.map(({ value, label }) => (
        <Checkbox key={value} label={label} checked={selected.includes(value)} onChange={() => onToggle(group, value)} />
      ))}
    </fieldset>
  );
}
