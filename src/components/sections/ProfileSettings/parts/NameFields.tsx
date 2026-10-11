import { TextInput } from "@/components/ui/TextInput";

import type { ProfileFieldsProps } from "../ProfileSettings.types";
import styles from "../ProfileSettings.module.scss";

/**
 * First and last name side by side.
 *
 * @param props Props of the component, see {@link ProfileFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function NameFields({ values, errors, setValue }: ProfileFieldsProps) {
  return (
    <div className={styles.row}>
      <TextInput label="First name" autoComplete="given-name" value={values.firstName} error={errors.firstName} onChange={(event) => setValue("firstName", event.target.value)} />
      <TextInput label="Last name" autoComplete="family-name" value={values.lastName} error={errors.lastName} onChange={(event) => setValue("lastName", event.target.value)} />
    </div>
  );
}
