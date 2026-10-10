import { Button } from "@/components/ui/Button";
import { Phone, WhatsApp } from "@/components/ui/Icon";
import { EMERGENCY_PHONE_HREF, WHATSAPP_HREF, WHATSAPP_PHONE } from "@/lib/site.constants";

import { QUICK_TEXT, QUICK_TITLE, WHATSAPP_LABEL } from "../ContactSection.constants";
import styles from "../ContactSection.module.scss";

/**
 * Card on the ivory background that offers the fastest channels: WhatsApp and the clinic phone.
 *
 * @returns The rendered element.
 */
export function QuickContact() {
  return (
    <section className={styles.quick} aria-labelledby="contact-quick-title">
      <h2 id="contact-quick-title" className={styles.quickTitle}>
        {QUICK_TITLE}
      </h2>
      <p className={styles.quickText}>{QUICK_TEXT}</p>
      <div className={styles.quickActions}>
        <Button variant="primary" href={WHATSAPP_HREF} leadingIcon={WhatsApp}>
          {WHATSAPP_LABEL}
        </Button>
        <Button variant="secondary" href={EMERGENCY_PHONE_HREF} leadingIcon={Phone}>
          {WHATSAPP_PHONE}
        </Button>
      </div>
    </section>
  );
}
