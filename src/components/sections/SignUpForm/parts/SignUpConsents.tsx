import { Checkbox } from "@/components/ui/Checkbox";

import { REMINDERS_LABEL } from "../SignUpForm.constants";
import type { SignUpFieldsProps } from "../SignUpForm.types";
import { TermsCheckbox } from "./TermsCheckbox";

/**
 * Terms acceptance (required) and the optional WhatsApp reminders opt-in.
 *
 * @param props Props of the component, see {@link SignUpFieldsProps}.
 * @param props.values Current values.
 * @param props.errors Current error messages.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function SignUpConsents({ values, errors, setValue }: SignUpFieldsProps) {
  return (
    <>
      <TermsCheckbox values={values} errors={errors} setValue={setValue} />
      <Checkbox label={REMINDERS_LABEL} checked={values.whatsappReminders} onChange={(event) => setValue("whatsappReminders", event.target.checked)} />
    </>
  );
}
