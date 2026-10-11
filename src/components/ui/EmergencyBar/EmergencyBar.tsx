import { cx } from "@/lib/shared/cx";

import { DEFAULT_EMERGENCY_LABEL, DEFAULT_MOTTO, DEFAULT_PHONE, DEFAULT_PHONE_HREF } from "./EmergencyBar.constants";
import type { EmergencyBarProps } from "./EmergencyBar.types";
import { EmergencyCall } from "./parts/EmergencyCall";
import { EmergencyMotto } from "./parts/EmergencyMotto";
import styles from "./EmergencyBar.module.scss";

/**
 * Navigation/Emergency Bar: motto on the left (from tablet up) and the red emergency pill, which is a call link.
 *
 * @param props Props of the component, see {@link EmergencyBarProps}.
 * @param props.motto Motto on the left (hidden on mobile): regular text plus highlighted text.
 * @param props.emergencyLabel Label of the emergency pill.
 * @param props.phone Phone number to show.
 * @param props.phoneHref Link that dials the phone number (`tel:`).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function EmergencyBar({
  motto = DEFAULT_MOTTO,
  emergencyLabel = DEFAULT_EMERGENCY_LABEL,
  phone = DEFAULT_PHONE,
  phoneHref = DEFAULT_PHONE_HREF,
  className,
  ...rest
}: EmergencyBarProps) {
  return (
    <div {...rest} className={cx(styles.bar, className)}>
      <div className={styles.inner}>
        <EmergencyMotto {...motto} />
        <EmergencyCall label={emergencyLabel} phone={phone} href={phoneHref} />
      </div>
    </div>
  );
}
