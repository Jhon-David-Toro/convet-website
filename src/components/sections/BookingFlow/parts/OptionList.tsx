import { OptionCard } from "@/components/patterns/OptionCard";

import type { OptionListProps } from "../BookingFlow.types";
import styles from "../BookingFlow.module.scss";

/**
 * Group of option cards of which one can be chosen (pets, services, vets).
 *
 * @param props Props of the component, see {@link OptionListProps}.
 * @param props.name Name of the radio group.
 * @param props.label Accessible name of the group.
 * @param props.options Options to show.
 * @param props.value Id of the chosen option.
 * @param props.onChange Called with the id of the option the customer picked.
 * @returns The rendered element.
 */
export function OptionList({ name, label, options, value, onChange }: OptionListProps) {
  return (
    <div role="radiogroup" aria-label={label} className={styles.options}>
      {options.map(({ id, icon, title, subtitle, meta, disabled }) => (
        <OptionCard key={id} name={name} icon={icon} title={title} subtitle={subtitle} meta={meta} value={id} checked={value === id} disabled={disabled} onChange={() => onChange(id)} />
      ))}
    </div>
  );
}
