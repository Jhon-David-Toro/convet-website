import { cx } from "@/lib/shared/cx";

import type { AuthFormProps } from "../AuthLayout.types";
import styles from "../AuthLayout.module.scss";

/**
 * Form of an auth page: a column with 24px between its blocks. Native validation is off because the fields report their own errors.
 *
 * @param props Props of the component, see {@link AuthFormProps}.
 * @param props.className Extra class name for the root element.
 * @param props.children Content of the element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function AuthForm({ className, children, ...rest }: AuthFormProps) {
  return (
    <form noValidate {...rest} className={cx(styles.form, className)}>
      {children}
    </form>
  );
}
