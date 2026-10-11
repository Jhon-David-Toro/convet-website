"use client";

import { PANEL_ID } from "../AdminSettings.constants";
import styles from "../AdminSettings.module.scss";
import { useBookingRules } from "../hooks/useBookingRules";
import { RuleActions } from "./RuleActions";
import { RuleSelects } from "./RuleSelects";
import { RuleToggles } from "./RuleToggles";

/**
 * Form of the booking rules: the six lists, the two switches and the buttons that save or discard the changes.
 *
 * @returns The rendered element.
 */
export function BookingRulesForm() {
  const { rules, setRule, discard, save } = useBookingRules();

  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.card}>
      <RuleSelects rules={rules} setRule={setRule} />
      <RuleToggles rules={rules} setRule={setRule} />
      <RuleActions discard={discard} save={save} />
    </div>
  );
}
