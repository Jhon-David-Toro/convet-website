import { Checkbox } from "@/components/ui/Checkbox";

import type { SignUpFieldsProps } from "../SignUpForm.types";
import { TermsLabel } from "./TermsLabel";
import styles from "../SignUpForm.module.scss";

/**
 * Required terms checkbox with its error message under it.
 *
 * @param props Props of the component, see {@link SignUpFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function TermsCheckbox({ values, errors, setValue }: SignUpFieldsProps) {
  return (
    <div>
      <Checkbox label={<TermsLabel />} checked={values.acceptTerms} onChange={(event) => setValue("acceptTerms", event.target.checked)} />
      {errors.acceptTerms && (
        <p role="alert" className={styles.error}>
          {errors.acceptTerms}
        </p>
      )}
    </div>
  );
}
