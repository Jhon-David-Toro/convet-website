import { Button } from "@/components/ui/Button";
import { MapPin, WhatsApp } from "@/components/ui/Icon";
import { DIRECTIONS_HREF, WHATSAPP_HREF } from "@/lib/site/site.constants";

import { DIRECTIONS_LABEL, WHATSAPP_LABEL } from "../LocationSection.constants";
import styles from "../LocationSection.module.scss";

/**
 * Directions and WhatsApp buttons. WhatsApp is hidden on mobile, where the action bar has a chat button.
 *
 * @returns The rendered element.
 */
export function ContactActions() {
  return (
    <div className={styles.actions}>
      <Button variant="primary" href={DIRECTIONS_HREF} leadingIcon={MapPin}>
        {DIRECTIONS_LABEL}
      </Button>
      <Button variant="secondary" href={WHATSAPP_HREF} leadingIcon={WhatsApp} leadingIconTone="whatsapp" className={styles.whatsappButton}>
        {WHATSAPP_LABEL}
      </Button>
    </div>
  );
}
