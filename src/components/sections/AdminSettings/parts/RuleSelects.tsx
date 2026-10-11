import { Select } from "@/components/ui/Select";

import { RULE_FIELDS } from "../AdminSettings.constants";
import type { RulesFormProps } from "../AdminSettings.types";
import styles from "../AdminSettings.module.scss";

/**
 * The six lists of the booking rules: notice, horizon, reschedule window, upcoming appointments, slot interval and requests per slot.
 *
 * @param props Props of the component, see {@link RulesFormProps}.
 * @param props.rules Current rules.
 * @param props.setRule Changes one rule.
 * @returns The rendered element.
 */
export function RuleSelects({ rules, setRule }: RulesFormProps) {
  return (
    <div className={styles.grid}>
      {RULE_FIELDS.map(({ key, label, helper, options }) => (
        <Select key={key} label={label} helper={helper} options={[...options]} value={rules[key]} onValueChange={(value) => setRule(key, value)} />
      ))}
    </div>
  );
}
