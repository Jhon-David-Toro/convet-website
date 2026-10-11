import { Chip } from "@/components/ui/Chip";
import { cx } from "@/lib/shared/cx";

import type { FilterChipsProps } from "./FilterChips.types";
import styles from "./FilterChips.module.scss";

/**
 * Filter/Chips: a group of chips where one is selected; each can show how many records it holds.
 *
 * @param props Props of the component, see {@link FilterChipsProps}.
 * @param props.label Accessible name of the group.
 * @param props.options Chips of the group.
 * @param props.value Value of the selected chip.
 * @param props.onChange Called with the value of the chip the user picked.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function FilterChips({ label, options, value, onChange, className, ...rest }: FilterChipsProps) {
  return (
    <div {...rest} role="group" aria-label={label} className={cx(styles.chips, className)}>
      {options.map((option) => (
        <Chip key={option.value} selected={option.value === value} count={option.count} onClick={() => onChange(option.value)}>
          {option.label}
        </Chip>
      ))}
    </div>
  );
}
