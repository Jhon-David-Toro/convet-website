import { TextInput } from "@/components/ui/TextInput";

import { ADDRESS_PLACEHOLDER, EMAIL_HELPER, PHONE_LABEL } from "../ProfileSettings.constants";
import type { ProfileFieldsProps } from "../ProfileSettings.types";

/**
 * Email (verified), WhatsApp number and optional address.
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
      <TextInput label={PHONE_LABEL} type="tel" autoComplete="tel" value={values.phone} onChange={(event) => setValue("phone", event.target.value)} />
      <TextInput label="Address" optional autoComplete="street-address" placeholder={ADDRESS_PLACEHOLDER} value={values.address} onChange={(event) => setValue("address", event.target.value)} />
    </>
  );
}
