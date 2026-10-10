import { Checkbox } from "@/components/ui/Checkbox";

import { CONSENT_LABEL } from "../ContactSection.constants";
import styles from "../ContactSection.module.scss";
import type { ContactFormProps } from "../ContactSection.types";

/**
 * Consent checkbox with its error message under it.
 *
 * @param props Props of the component, see {@link ContactFormProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function ContactConsent({ values, errors, setValue }: ContactFormProps) {
  return (
    <div>
      <Checkbox label={CONSENT_LABEL} checked={values.consent} onChange={(event) => setValue("consent", event.target.checked)} />
      {errors.consent && (
        <p role="alert" className={styles.consentError}>
          {errors.consent}
        </p>
      )}
    </div>
  );
}
