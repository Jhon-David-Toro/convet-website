import { Checkbox } from "@/components/ui/Checkbox";
import { Textarea } from "@/components/ui/Textarea";
import { BOOKING_NOTES_MAX } from "@/lib/booking/booking.constants";

import { NOTES_HELPER, NOTES_LABEL, OWNER_LINE, OWNER_TITLE, WHATSAPP_DESCRIPTION, WHATSAPP_LABEL } from "../BookingFlow.constants";
import styles from "../BookingFlow.module.scss";
import type { ReviewNotesProps } from "../BookingFlow.types";

/**
 * Notes for the vet, who the confirmation goes to and the WhatsApp option.
 *
 * @param props Props of the component, see {@link ReviewNotesProps}.
 * @param props.selection What is selected so far.
 * @param props.setField Changes one value of the selection.
 * @returns The rendered element.
 */
export function ReviewNotes({ selection, setField }: ReviewNotesProps) {
  return (
    <>
      <Textarea label={NOTES_LABEL} optional helper={NOTES_HELPER} maxLength={BOOKING_NOTES_MAX} rows={3} value={selection.notes} onChange={(event) => setField("notes", event.target.value)} />
      <div className={styles.owner}>
        <p className={styles.ownerTitle}>{OWNER_TITLE}</p>
        <p className={styles.ownerLine}>{OWNER_LINE}</p>
      </div>
      <Checkbox label={WHATSAPP_LABEL} description={WHATSAPP_DESCRIPTION} checked={selection.whatsapp} onChange={(event) => setField("whatsapp", event.target.checked)} />
    </>
  );
}
