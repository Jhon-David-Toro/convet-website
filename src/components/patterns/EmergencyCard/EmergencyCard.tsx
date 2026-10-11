import { Button } from "@/components/ui/Button";
import { Icon, Phone } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import { EMERGENCY_CARD_ICON_SIZE } from "./EmergencyCard.constants";
import type { EmergencyCardProps } from "./EmergencyCard.types";
import styles from "./EmergencyCard.module.scss";

/**
 * Card/Emergency: red card with the 24/7 emergency phone number and the call button.
 *
 * @param props Props of the component, see {@link EmergencyCardProps}.
 * @param props.label Small heading, e.g. "24/7 Emergency · Call now".
 * @param props.number Large phone number, e.g. "593-0404".
 * @param props.note Short note shown under the label.
 * @param props.href Call link, e.g. "tel:+2975930404".
 * @param props.callLabel Accessible label of the call link.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function EmergencyCard({ label, number, note, href, callLabel, className, ...rest }: EmergencyCardProps) {
  return (
    <section {...rest} className={cx(styles.card, className)}>
      <span className={styles.circle} aria-hidden="true">
        <Icon icon={Phone} size={EMERGENCY_CARD_ICON_SIZE} tone="inherit" />
      </span>
      <div className={styles.text}>
        <p className={styles.label}>{label}</p>
        <p className={styles.number}>{number}</p>
        <p className={styles.note}>{note}</p>
      </div>
      <Button variant="secondary" href={href} leadingIcon={Phone} className={styles.call}>
        {callLabel}
      </Button>
    </section>
  );
}
