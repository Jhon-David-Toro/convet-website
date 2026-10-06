import Image from "next/image";

import { cx } from "@/lib/cx";

import styles from "./Logo.module.scss";
import { FULL_VARIANT, INVERSE_TONE, LOGO_ALT, LOGO_MARK_SIZE, LOGO_MARK_SRC, MARK_VARIANT } from "./Logo.constants";
import type { LogoProps } from "./Logo.types";

/**
 * CONVET logo: circular seal with or without the wordmark, in default or inverse tone.
 *
 * @param props Props of the component, see {@link LogoProps}.
 * @param props.variant `full`: mark + name; `mark`: only the circular seal.
 * @param props.tone `inverse` for navy backgrounds (footer, bands).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Logo({ variant = "full", tone = "default", className, ...rest }: LogoProps) {
  const classes = cx(styles.logo, styles[variant], tone === INVERSE_TONE && styles.inverse, className);

  return (
    <span {...rest} className={classes}>
      {/* The seal is decorative in the full version (the name is already in the text) */}
      <Image src={LOGO_MARK_SRC} alt={variant === MARK_VARIANT ? LOGO_ALT : ""} width={LOGO_MARK_SIZE} height={LOGO_MARK_SIZE} className={styles.image} priority />
      {variant === FULL_VARIANT && (
        <span className={styles.wordmark}>
          <span className={styles.name}>CONVET</span>
          <span className={styles.tagline}>Contreras Veterinary Services N.V.</span>
        </span>
      )}
    </span>
  );
}
