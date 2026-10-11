import { Button } from "@/components/ui/Button";
import { Calendar, WhatsApp } from "@/components/ui/Icon";
import { BOOKING_HREF, WHATSAPP_HREF } from "@/lib/site/site.constants";

import styles from "../HeroSection.module.scss";
import { HERO_BOOK_LABEL, HERO_WHATSAPP_LABEL } from "../HeroSection.constants";

/**
 * Primary calls to action of the hero: book a visit and chat on WhatsApp.
 *
 * @returns The rendered element.
 */
export function HeroActions() {
  return (
    <div className={styles.actions}>
      <Button variant="accent" href={BOOKING_HREF} leadingIcon={Calendar} className={styles.book}>
        {HERO_BOOK_LABEL}
      </Button>
      <Button variant="secondary" href={WHATSAPP_HREF} leadingIcon={WhatsApp} leadingIconTone="whatsapp">
        {HERO_WHATSAPP_LABEL}
      </Button>
    </div>
  );
}
