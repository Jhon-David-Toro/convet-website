import Link from "next/link";

import { LEGAL_LINK_SEPARATOR } from "../Footer.constants";
import type { FooterLegalLinksProps } from "../Footer.types";
import styles from "../Footer.module.scss";

/**
 * Legal links separated by a middle dot.
 *
 * @param props Props of the component, see {@link FooterLegalLinksProps}.
 * @param props.links Links to render.
 * @returns The rendered element.
 */
export function FooterLegalLinks({ links }: FooterLegalLinksProps) {
  return (
    <p className={styles.copyright}>
      {links.map((link, index) => (
        <span key={link.label}>
          {index > 0 && LEGAL_LINK_SEPARATOR}
          <Link href={link.href} className={styles.legalLink}>
            {link.label}
          </Link>
        </span>
      ))}
    </p>
  );
}
