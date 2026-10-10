import { TextInput } from "@/components/ui/TextInput";

import type { SignInFieldsProps } from "../SignInForm.types";

/**
 * Email and password fields of the sign-in form.
 *
 * @param props Props of the component, see {@link SignInFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function SignInFields({ values, errors, setValue }: SignInFieldsProps) {
  return (
    <>
      <TextInput label="Email" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={(event) => setValue("email", event.target.value)} />
      <TextInput
        label="Password"
        type="password"
        autoComplete="current-password"
        value={values.password}
        error={errors.password}
        onChange={(event) => setValue("password", event.target.value)}
      />
    </>
  );
}
