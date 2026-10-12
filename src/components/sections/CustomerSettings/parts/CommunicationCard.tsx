"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Info } from "@/components/ui/Icon";
import { Radio } from "@/components/ui/Radio";
import { SETTINGS_EMAIL, SETTINGS_PROFILE } from "@/lib/customer/customer.settings.constants";

import { COMMUNICATION_NOTE, COMMUNICATION_PROPOSAL, COMMUNICATION_TITLE } from "../CustomerSettings.constants";
import type { CommunicationChoice } from "../CustomerSettings.types";
import styles from "../CustomerSettings.module.scss";

/**
 * Communication preferences card: email, which is on, and email plus WhatsApp, which is only a proposal and cannot be chosen yet.
 *
 * @returns The rendered element.
 */
export function CommunicationCard() {
  const [choice, setChoice] = useState<CommunicationChoice>("email");

  return (
    <section className={styles.card} aria-labelledby="settings-communication">
      <h2 id="settings-communication" className={styles.cardTitle}>
        {COMMUNICATION_TITLE}
      </h2>
      <p className={styles.note}>{COMMUNICATION_NOTE}</p>
      <div role="radiogroup" aria-labelledby="settings-communication" className={styles.choices}>
        <Radio name="communication" label="Email" description={SETTINGS_EMAIL} checked={choice === "email"} onChange={() => setChoice("email")} />
        <div className={styles.choiceRow}>
          <Radio name="communication" label="Email + WhatsApp" description={SETTINGS_PROFILE.phone} disabled checked={choice === "email-whatsapp"} onChange={() => setChoice("email-whatsapp")} />
          <Badge tone="warning" icon={Info}>
            {COMMUNICATION_PROPOSAL}
          </Badge>
        </div>
      </div>
    </section>
  );
}
