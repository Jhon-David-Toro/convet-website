"use client";

import styles from "../AdminServices.module.scss";
import { PANEL_ID } from "../AdminServices.constants";
import type { BookingRulesPanelProps } from "../AdminServices.types";
import { useServiceDraft } from "../hooks/useServiceDraft";
import { DurationFields } from "./DurationFields";
import { OnlineAndPrice } from "./OnlineAndPrice";
import { RulesActions } from "./RulesActions";
import { SpeciesChips } from "./SpeciesChips";

/**
 * Booking rules of a service: duration, buffer after, whether it is bookable online, the species and the price shown on the website.
 *
 * @param props Props of the component, see {@link BookingRulesPanelProps}.
 * @param props.service Service whose rules are edited.
 * @returns The rendered element.
 */
export function BookingRulesPanel({ service }: BookingRulesPanelProps) {
  const { draft, setField, toggleSpecies, discard, publish } = useServiceDraft(service);

  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.panelBody}>
      <DurationFields draft={draft} setField={setField} />
      <OnlineAndPrice draft={draft} setField={setField} />
      <SpeciesChips selected={draft.species} toggleSpecies={toggleSpecies} />
      <RulesActions discard={discard} publish={publish} />
    </div>
  );
}
