import { PasswordStrength } from "@/components/ui/PasswordStrength";
import { TextInput } from "@/components/ui/TextInput";

import { PASSWORD_HELPER } from "../SignUpForm.constants";
import type { SignUpFieldsProps } from "../SignUpForm.types";

/**
 * Password field with its strength meter under it.
 *
 * @param props Props of the component, see {@link SignUpFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function SignUpPassword({ values, errors, setValue }: SignUpFieldsProps) {
  return (
    <>
      <TextInput
        label="Password"
        type="password"
        autoComplete="new-password"
        helper={PASSWORD_HELPER}
        value={values.password}
        error={errors.password}
        onChange={(event) => setValue("password", event.target.value)}
      />
      <PasswordStrength password={values.password} />
    </>
  );
}
