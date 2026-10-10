import { BRAND_COPY, BRAND_TITLE } from "../AuthLayout.constants";
import styles from "../AuthLayout.module.scss";

/**
 * Brand message at the bottom of the auth panel: the motto and a sentence about what the account is for.
 *
 * @returns The rendered element.
 */
export function AuthBrandMessage() {
  return (
    <div className={styles.message}>
      <p className={styles.messageTitle}>{BRAND_TITLE}</p>
      <p className={styles.messageCopy}>{BRAND_COPY}</p>
    </div>
  );
}
