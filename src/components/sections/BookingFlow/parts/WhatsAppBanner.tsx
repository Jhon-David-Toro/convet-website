import Link from "next/link";

import { ChevronRight, Icon, WhatsApp } from "@/components/ui/Icon";

import { WHATSAPP_BANNER } from "../BookingFlow.constants";
import type { WhatsAppBannerProps } from "../BookingFlow.types";
import { confirmationChatHref } from "../BookingFlow.utils";
import styles from "../BookingFlow.module.scss";

/**
 * Green banner that opens the clinic chat with the appointment pre-filled.
 *
 * @param props Props of the component, see {@link WhatsAppBannerProps}.
 * @param props.selection What was booked.
 * @param props.pets Customer's registered pets.
 * @returns The rendered element.
 */
export function WhatsAppBanner({
  selection,
  pets,
}: WhatsAppBannerProps) {
  return (
    <Link
      href={confirmationChatHref(selection, pets)}
      className={styles.banner}
    >
      <span className={styles.bannerIcon}>
        <Icon icon={WhatsApp} tone="inverse" />
      </span>

      <span className={styles.bannerText}>
        <strong>{WHATSAPP_BANNER.title}</strong>
        {WHATSAPP_BANNER.text}
      </span>

      <Icon icon={ChevronRight} />
    </Link>
  );
}