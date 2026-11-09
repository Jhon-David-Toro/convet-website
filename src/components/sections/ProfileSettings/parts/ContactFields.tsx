import { TextInput } from "@/components/ui/TextInput";

import { EMAIL_HELPER, PHONE_LABEL } from "../ProfileSettings.constants";
import type { ProfileFieldsProps } from "../ProfileSettings.types";

/**
 * Email and WhatsApp number.
 *
 * @param props Props of the component, see {@link ProfileFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function ContactFields({ values, errors, setValue }: ProfileFieldsProps) {
  return (
    <>
      <TextInput label="Email" type="email" autoComplete="email" helper={EMAIL_HELPER} value={values.email} error={errors.email} onChange={(event) => setValue("email", event.target.value)} />
      <TextInput label={PHONE_LABEL} type="tel" autoComplete="tel" value={values.phone} error={errors.phone} onChange={(event) => setValue("phone", event.target.value)} />
    </>
  );
}
