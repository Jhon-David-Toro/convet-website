import { TextInput } from "@/components/ui/TextInput";

import styles from "../SignUpForm.module.scss";
import type { SignUpFieldsProps } from "../SignUpForm.types";

/**
 * First and last name side by side (stacked on mobile).
 *
 * @param props Props of the component, see {@link SignUpFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function SignUpNameFields({ values, errors, setValue }: SignUpFieldsProps) {
  return (
    <div className={styles.names}>
      <TextInput label="First name" autoComplete="given-name" value={values.firstName} error={errors.firstName} onChange={(event) => setValue("firstName", event.target.value)} />
      <TextInput label="Last name" autoComplete="family-name" value={values.lastName} error={errors.lastName} onChange={(event) => setValue("lastName", event.target.value)} />
    </div>
  );
}
