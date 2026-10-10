import { TextInput } from "@/components/ui/TextInput";

import { EMAIL_HELPER, PHONE_HELPER } from "../SignUpForm.constants";
import type { SignUpFieldsProps } from "../SignUpForm.types";

/**
 * Email (which receives the verification code) and the optional WhatsApp number.
 *
 * @param props Props of the component, see {@link SignUpFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function SignUpContactFields({ values, errors, setValue }: SignUpFieldsProps) {
  return (
    <>
      <TextInput
        label="Email"
        type="email"
        autoComplete="email"
        helper={EMAIL_HELPER}
        value={values.email}
        error={errors.email}
        onChange={(event) => setValue("email", event.target.value)}
      />
      <TextInput
        label="Mobile (WhatsApp)"
        optional
        type="tel"
        autoComplete="tel"
        placeholder="+297"
        helper={PHONE_HELPER}
        value={values.phone}
        onChange={(event) => setValue("phone", event.target.value)}
      />
    </>
  );
}
