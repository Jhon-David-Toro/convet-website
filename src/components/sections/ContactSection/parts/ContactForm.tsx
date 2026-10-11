import { Button } from "@/components/ui/Button";

import { FORM_TITLE, SUBMIT_LABEL } from "../ContactSection.constants";
import type { ContactFormShellProps } from "../ContactSection.types";
import { ContactConsent } from "./ContactConsent";
import { ContactIdentityFields } from "./ContactIdentityFields";
import { ContactMessageFields } from "./ContactMessageFields";
import styles from "../ContactSection.module.scss";

/**
 * Contact form: identity, topic and message fields, the consent checkbox and the submit button.
 *
 * @param props Props of the component, see {@link ContactFormShellProps}.
 * @param props.handleSubmit Validates the form and submits it when it is valid.
 * @param props.fields Values, errors and change handlers of the fields.
 * @returns The rendered element.
 */
export function ContactForm({ handleSubmit, ...fields }: ContactFormShellProps) {
  return (
    <form noValidate onSubmit={handleSubmit} className={styles.form} aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" className={styles.formTitle}>
        {FORM_TITLE}
      </h2>
      <ContactIdentityFields {...fields} />
      <ContactMessageFields {...fields} />
      <ContactConsent {...fields} />
      <div className={styles.submit}>
        <Button type="submit" variant="primary">
          {SUBMIT_LABEL}
        </Button>
      </div>
    </form>
  );
}
