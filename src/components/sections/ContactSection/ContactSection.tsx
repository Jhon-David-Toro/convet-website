"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";

import { CONTACT_DESCRIPTION, CONTACT_EYEBROW, CONTACT_TITLE } from "./ContactSection.constants";
import type { ContactSectionProps } from "./ContactSection.types";
import { useContactForm } from "./hooks/useContactForm";
import { ContactForm } from "./parts/ContactForm";
import { ContactSent } from "./parts/ContactSent";
import { ContactSide } from "./parts/ContactSide";
import styles from "./ContactSection.module.scss";

/**
 * Contact page content: header, the message form (or its confirmation) and the side column with chat, map and hours.
 *
 * @param props Props of the component, see {@link ContactSectionProps}.
 * @param props.onSubmit Called with the values of a valid form.
 * @returns The rendered element.
 */
export function ContactSection({ onSubmit }: ContactSectionProps) {
  const form = useContactForm({ onSubmit });

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader eyebrow={CONTACT_EYEBROW} title={CONTACT_TITLE} description={CONTACT_DESCRIPTION} titleAs="h1" />
        <div className={styles.columns}>
          {form.sent ? <ContactSent reset={form.reset} /> : <ContactForm {...form} />}
          <ContactSide />
        </div>
      </div>
    </section>
  );
}
