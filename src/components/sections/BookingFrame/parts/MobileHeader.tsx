import { ArrowLeft, X } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";

import { BACK_LABEL, CLOSE_LABEL } from "../BookingFrame.constants";
import type { MobileHeaderProps } from "../BookingFrame.types";
import styles from "../BookingFrame.module.scss";

/**
 * Header of the booking on mobile: back arrow, page title and a close button.
 *
 * @param props Props of the component, see {@link MobileHeaderProps}.
 * @param props.mobileTitle Title in the middle.
 * @param props.exitHref Where the close button leads.
 * @param props.onBack Goes back one step; without it the arrow leads to the exit page.
 * @returns The rendered element.
 */
export function MobileHeader({ mobileTitle, exitHref, onBack }: MobileHeaderProps) {
  return (
    <div className={styles.mobileHeader}>
      {onBack ? <IconButton variant="ghost" icon={ArrowLeft} label={BACK_LABEL} onClick={onBack} /> : <IconButton variant="ghost" icon={ArrowLeft} label={BACK_LABEL} href={exitHref} />}
      <p className={styles.mobileTitle}>{mobileTitle}</p>
      <IconButton variant="ghost" icon={X} label={CLOSE_LABEL} href={exitHref} />
    </div>
  );
}
