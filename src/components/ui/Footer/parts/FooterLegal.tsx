import type { FooterLegalProps } from "../Footer.types";
import { FooterLegalLinks } from "./FooterLegalLinks";
import styles from "../Footer.module.scss";

/**
 * Copyright line and, when given, the legal links.
 *
 * @param props Props of the component, see {@link FooterLegalProps}.
 * @param props.copyright Copyright line.
 * @param props.legalLinks Legal links (privacy, terms) shown next to the copyright.
 * @returns The rendered element.
 */
export function FooterLegal({ copyright, legalLinks = [] }: FooterLegalProps) {
  return (
    <div className={styles.legal}>
      <p className={styles.copyright}>{copyright}</p>
      {legalLinks.length > 0 && <FooterLegalLinks links={legalLinks} />}
    </div>
  );
}
