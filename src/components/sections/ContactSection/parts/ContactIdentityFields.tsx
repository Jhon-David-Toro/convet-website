import { TextInput } from "@/components/ui/TextInput";

import type { ContactFormProps } from "../ContactSection.types";
import styles from "../ContactSection.module.scss";

/**
 * Name and phone side by side, then the email address (validated when it loses focus).
 *
 * @param props Props of the component, see {@link ContactFormProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @param props.handleEmailBlur Validates the email when the field loses focus.
 * @returns The rendered element.
 */
export function ContactIdentityFields({ values, errors, setValue, handleEmailBlur }: ContactFormProps) {
  return (
    <>
      <div className={styles.row}>
        <TextInput label="Your name" autoComplete="name" value={values.name} error={errors.name} onChange={(event) => setValue("name", event.target.value)} />
        <TextInput label="Phone" optional type="tel" autoComplete="tel" placeholder="+297" value={values.phone} onChange={(event) => setValue("phone", event.target.value)} />
      </div>
      <TextInput
        label="Email"
        type="email"
        autoComplete="email"
        value={values.email}
        error={errors.email}
        onChange={(event) => setValue("email", event.target.value)}
        onBlur={handleEmailBlur}
      />
    </>
  );
}
