import { CodeInput } from "@/components/ui/CodeInput";

import { CODE_LABEL, INVALID_CODE } from "../VerifyEmailForm.constants";
import styles from "../VerifyEmailForm.module.scss";
import type { VerifyEmailFieldsProps } from "../VerifyEmailForm.types";

/**
 * The six-digit code and, when it was rejected, the message under it.
 *
 * @param props Props of the component, see {@link VerifyEmailFieldsProps}.
 * @param props.code Digits typed so far.
 * @param props.setCode Stores the typed code.
 * @param props.invalid Whether the code was rejected.
 * @param props.verifying Whether the code is being checked.
 * @returns The rendered element.
 */
export function VerifyEmailFields({ code, setCode, invalid, verifying }: VerifyEmailFieldsProps) {
  return (
    <>
      <CodeInput label={CODE_LABEL} value={code} onValueChange={setCode} invalid={invalid} disabled={verifying} />
      {invalid && (
        <p role="alert" className={styles.error}>
          {INVALID_CODE}
        </p>
      )}
    </>
  );
}
