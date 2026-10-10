import { cx } from "@/lib/cx";

import styles from "./PasswordStrength.module.scss";
import { STRENGTH_LEVELS, STRENGTH_SEGMENTS } from "./PasswordStrength.constants";
import type { PasswordStrengthProps } from "./PasswordStrength.types";
import { scorePassword } from "./PasswordStrength.utils";

/**
 * Strength meter of a password: four segments that fill up and a label. Shows nothing while the password is empty.
 *
 * @param props Props of the component, see {@link PasswordStrengthProps}.
 * @param props.password Password to measure.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element, or `null` for an empty password.
 */
export function PasswordStrength({ password, className, ...rest }: PasswordStrengthProps) {
  const score = scorePassword(password);
  if (score === 0) return null;
  const { label, tone } = STRENGTH_LEVELS[score - 1];

  return (
    <div {...rest} className={cx(styles.strength, className)}>
      <div className={styles.segments} aria-hidden="true">
        {Array.from({ length: STRENGTH_SEGMENTS }, (_, index) => (
          <span key={index} className={cx(styles.segment, index < score && styles[tone])} />
        ))}
      </div>
      <span className={cx(styles.label, styles[tone])} role="status">
        {label}
      </span>
    </div>
  );
}
