"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { TextInput } from "@/components/ui/TextInput";

import { BUSINESS_FIELDS, BUSINESS_SAVED_MESSAGE, PANEL_ID, SAVE_LABEL } from "../AdminSettings.constants";
import styles from "../AdminSettings.module.scss";

/**
 * Business info shown on the website and in messages: name, email, phone and address.
 *
 * @returns The rendered element.
 */
export function BusinessPanel() {
  const { toast } = useToast();

  return (
    <div id={PANEL_ID} role="tabpanel" className={styles.card}>
      <div className={styles.grid}>
        {BUSINESS_FIELDS.map(({ key, label, value }) => (
          <TextInput key={key} label={label} defaultValue={value} />
        ))}
      </div>
      <div className={styles.actions}>
        <Button type="button" onClick={() => toast({ message: BUSINESS_SAVED_MESSAGE, tone: "success" })}>
          {SAVE_LABEL}
        </Button>
      </div>
    </div>
  );
}
