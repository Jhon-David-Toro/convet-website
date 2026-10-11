import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { FORGOT_PASSWORD_HREF } from "@/lib/auth/auth.constants";

import { FORGOT_LABEL, REMEMBER_LABEL } from "../SignInForm.constants";
import type { SignInOptionsProps } from "../SignInForm.types";
import styles from "../SignInForm.module.scss";

/**
 * Row with the "keep me signed in" checkbox and the link to reset the password.
 *
 * @param props Props of the component, see {@link SignInOptionsProps}.
 * @param props.values Current values.
 * @param props.setValue Changes one value and clears its error.
 * @returns The rendered element.
 */
export function SignInOptions({ values, setValue }: SignInOptionsProps) {
  return (
    <div className={styles.options}>
      <Checkbox label={REMEMBER_LABEL} checked={values.remember} onChange={(event) => setValue("remember", event.target.checked)} />
      <Button variant="tertiary" size="small" href={FORGOT_PASSWORD_HREF}>
        {FORGOT_LABEL}
      </Button>
    </div>
  );
}
