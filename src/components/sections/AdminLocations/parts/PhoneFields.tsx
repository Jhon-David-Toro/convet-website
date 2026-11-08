"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { useActionToast } from "@/lib/shared/useActionToast";

import { PHONE_LABEL, SAVE_PHONE_LABEL, SAVED_MESSAGE, WHATSAPP_LABEL } from "../AdminLocations.constants";
import type { PhoneFieldsProps } from "../AdminLocations.types";
import styles from "../AdminLocations.module.scss";

/**
 * The phone and WhatsApp numbers the clinic shows to clients. The phone of a branch is saved in the backend; WhatsApp uses the same
 * number until the backend stores its own.
 *
 * @param props Props of the component, see {@link PhoneFieldsProps}.
 * @param props.location Location whose numbers are edited.
 * @param props.actions Server Actions that change the branch.
 * @returns The rendered element.
 */
export function PhoneFields({ location, actions }: PhoneFieldsProps) {
  const [phone, setPhone] = useState(location.phone);
  const [whatsapp, setWhatsapp] = useState(location.whatsapp);
  const save = useActionToast(actions?.savePhone, SAVED_MESSAGE);
  const canSave = Boolean(location.id && actions?.savePhone) && phone.trim() !== location.phone;

  return (
    <>
      <div className={styles.phones}>
        <TextInput label={PHONE_LABEL} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
        <TextInput label={WHATSAPP_LABEL} type="tel" value={whatsapp} onChange={(event) => setWhatsapp(event.target.value)} />
      </div>
      {canSave && (
        <div className={styles.phoneActions}>
          <Button type="button" size="small" disabled={save.pending} onClick={() => save.run(location.id ?? "", phone.trim())}>
            {SAVE_PHONE_LABEL}
          </Button>
        </div>
      )}
    </>
  );
}
