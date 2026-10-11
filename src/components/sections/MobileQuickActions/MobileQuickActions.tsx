import { Button } from "@/components/ui/Button";
import { Calendar, Phone, WhatsApp } from "@/components/ui/Icon";
import { MobileActionBar } from "@/components/ui/MobileActionBar";
import { BOOKING_HREF, EMERGENCY_PHONE_HREF, WHATSAPP_HREF } from "@/lib/site/site.constants";

import styles from "./MobileQuickActions.module.scss";

/**
 * Fixed bar of the mobile site with the three actions people need fast: book, chat and emergency.
 *
 * @returns The rendered element.
 */
export function MobileQuickActions() {
  return (
    <MobileActionBar fixed>
      <Button variant="accent" href={BOOKING_HREF} leadingIcon={Calendar} className={styles.book}>
        Book
      </Button>
      <Button variant="secondary" href={WHATSAPP_HREF} leadingIcon={WhatsApp} leadingIconTone="whatsapp">
        Chat
      </Button>
      <Button variant="destructive" href={EMERGENCY_PHONE_HREF} leadingIcon={Phone}>
        SOS 24/7
      </Button>
    </MobileActionBar>
  );
}
