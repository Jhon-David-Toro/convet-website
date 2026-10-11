"use client";

import { useState } from "react";

import { TextInput } from "@/components/ui/TextInput";

import styles from "../AdminLocations.module.scss";
import { PHONE_LABEL, WHATSAPP_LABEL } from "../AdminLocations.constants";
import type { PhoneFieldsProps } from "../AdminLocations.types";

/**
 * The phone and WhatsApp numbers the clinic shows to clients.
 *
 * @param props Props of the component, see {@link PhoneFieldsProps}.
 * @param props.location Location whose numbers are edited.
 * @returns The rendered element.
 */
export function PhoneFields({ location }: PhoneFieldsProps) {
  const [phone, setPhone] = useState(location.phone);
  const [whatsapp, setWhatsapp] = useState(location.whatsapp);

  return (
    <div className={styles.phones}>
      <TextInput label={PHONE_LABEL} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
      <TextInput label={WHATSAPP_LABEL} type="tel" value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} />
    </div>
  );
}
