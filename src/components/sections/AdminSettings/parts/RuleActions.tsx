import { Button } from "@/components/ui/Button";

import { DISCARD_LABEL, SAVE_RULES_LABEL } from "../AdminSettings.constants";
import styles from "../AdminSettings.module.scss";
import type { RuleActionsProps } from "../AdminSettings.types";

/**
 * Buttons under the booking rules: go back to the saved values, or save the changes.
 *
 * @param props Props of the component, see {@link RuleActionsProps}.
 * @param props.discard Goes back to the saved values.
 * @param props.save Saves the changes.
 * @returns The rendered element.
 */
export function RuleActions({ discard, save }: RuleActionsProps) {
  return (
    <div className={styles.actions}>
      <Button type="button" variant="tertiary" onClick={discard}>
        {DISCARD_LABEL}
      </Button>
      <Button type="button" onClick={save}>
        {SAVE_RULES_LABEL}
      </Button>
    </div>
  );
}
