import { cx } from "@/lib/shared/cx";

import styles from "./Footer.module.scss";
import type { FooterProps } from "./Footer.types";
import { FooterBrand } from "./parts/FooterBrand";
import { FooterColumn } from "./parts/FooterColumn";
import { FooterLegal } from "./parts/FooterLegal";

/**
 * Navigation/Footer: navy footer with brand, link columns and legal line.
 *
 * @param props Props of the component, see {@link FooterProps}.
 * @param props.about Short description of the clinic.
 * @param props.motto Brand motto: regular text plus a highlighted phrase.
 * @param props.columns Number of columns, or the link columns to render.
 * @param props.copyright Copyright line.
 * @param props.legalLinks Legal links (privacy, terms) shown next to the copyright.
 * @param props.homeHref Link of the logo; defaults to `/`.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Footer({ about, motto, columns, copyright, legalLinks, homeHref, className, ...rest }: FooterProps) {
  return (
    <footer {...rest} className={cx(styles.footer, className)}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <FooterBrand homeHref={homeHref} about={about} motto={motto} />
          {columns.map((column) => (
            <FooterColumn key={column.heading} column={column} />
          ))}
        </div>
        <FooterLegal copyright={copyright} legalLinks={legalLinks} />
      </div>
    </footer>
  );
}
