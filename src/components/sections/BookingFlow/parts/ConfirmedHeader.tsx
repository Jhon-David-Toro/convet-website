import { Check, Icon } from "@/components/ui/Icon";

import { OWNER_CONTACT, SUCCESS_ICON_SIZE } from "../BookingFlow.constants";
import styles from "../BookingFlow.module.scss";
import type { ConfirmedHeaderProps } from "../BookingFlow.types";
import { confirmedTitle } from "../BookingFlow.utils";

/**
 * Green check, title and sentence of the confirmation page.
 *
 * @param props Props of the component, see {@link ConfirmedHeaderProps}.
 * @param props.date Day of the visit as `YYYY-MM-DD`.
 * @returns The rendered element.
 */
export function ConfirmedHeader({ date }: ConfirmedHeaderProps) {
  return (
    <>
      <span className={styles.success}>
        <Icon icon={Check} size={SUCCESS_ICON_SIZE} tone="success" />
      </span>
      <h1 className={styles.confirmedTitle}>{confirmedTitle(date)}</h1>
      <p className={styles.confirmedText}>{`We sent the details to WhatsApp ${OWNER_CONTACT.phone} and ${OWNER_CONTACT.email}, and we will remind you the day before.`}</p>
    </>
  );
}
