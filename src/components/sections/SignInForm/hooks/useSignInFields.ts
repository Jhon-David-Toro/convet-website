import { useState } from "react";

import { EMPTY_SIGN_IN } from "../SignInForm.constants";
import type { SignInErrors, SignInFieldsState, SignInValues } from "../SignInForm.types";

/**
 * Values and error messages of the sign-in fields.
 *
 * @returns The state, the setter of one value and the setter of the errors.
 */
export function useSignInFields(): SignInFieldsState {
  const [values, setValues] = useState<SignInValues>(EMPTY_SIGN_IN);
  const [errors, setErrors] = useState<SignInErrors>({});

  /**
   * Changes one value and clears the error of that field.
   *
   * @param field Field to change.
   * @param value New value of the field.
   */
  function setValue<Field extends keyof SignInValues>(field: Field, value: SignInValues[Field]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  return { values, errors, setErrors, setValue };
}
