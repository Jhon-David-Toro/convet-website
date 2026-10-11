import { Toggle } from "@/components/ui/Toggle";

import { RULE_TOGGLES } from "../AdminSettings.constants";
import styles from "../AdminSettings.module.scss";
import type { RulesFormProps } from "../AdminSettings.types";

/**
 * The two switches of the booking rules: confirm online bookings automatically, and let clients choose a vet.
 *
 * @param props Props of the component, see {@link RulesFormProps}.
 * @param props.rules Current rules.
 * @param props.setRule Changes one rule.
 * @returns The rendered element.
 */
export function RuleToggles({ rules, setRule }: RulesFormProps) {
  return (
    <div className={styles.toggles}>
      {RULE_TOGGLES.map(({ key, label, description }) => (
        <Toggle key={key} label={label} description={description} checked={rules[key]} onChange={(event) => setRule(key, event.target.checked)} />
      ))}
    </div>
  );
}
