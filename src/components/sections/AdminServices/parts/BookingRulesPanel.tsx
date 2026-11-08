"use client";

import { PANEL_ID } from "../AdminServices.constants";
import type { BookingRulesPanelProps } from "../AdminServices.types";
import { useServiceDraft } from "../hooks/useServiceDraft";
import { DurationFields } from "./DurationFields";
import { OnlineAndPrice } from "./OnlineAndPrice";
import { RulesActions } from "./RulesActions";
import { SpeciesChips } from "./SpeciesChips";
import styles from "../AdminServices.module.scss";

/**
 * Booking rules of a service: duration, buffer after, whether it is bookable online, the species and the price shown on the website.
 *
 * @param props Props of the component, see {@link BookingRulesPanelProps}.
 * @param props.service Service whose rules are edited.
 * @param props.saveRules Saves the changes in the backend; without it publishing only keeps them on screen.
 * @returns The rendered element.
 */
export function BookingRulesPanel({ service, saveRules }: BookingRulesPanelProps) {
  const { draft, setField, toggleSpecies, discard, publish, pending, priceError } = useServiceDraft(service, saveRules);

  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.panelBody}>
      <DurationFields draft={draft} setField={setField} />
      <OnlineAndPrice draft={draft} setField={setField} priceError={priceError} />
      <SpeciesChips selected={draft.species} toggleSpecies={toggleSpecies} />
      <RulesActions discard={discard} publish={publish} pending={pending} />
    </div>
  );
}
