import { cx } from "@/lib/shared/cx";

import styles from "./PageHeader.module.scss";
import type { PageHeaderProps } from "./PageHeader.types";

/**
 * Page/Header: the title of a staff or admin page (the `h1`), a sentence under it and the main actions on the right.
 *
 * @param props Props of the component, see {@link PageHeaderProps}.
 * @param props.title Title of the page.
 * @param props.subtitle Sentence under the title.
 * @param props.actions Buttons on the right of the title.
 * @param props.compactHidden Hides the header below desktop, when the top bar already names the page.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function PageHeader({ title, subtitle, actions, compactHidden = false, className, ...rest }: PageHeaderProps) {
  return (
    <header {...rest} className={cx(styles.header, compactHidden && styles.compactHidden, className)}>
      <div className={styles.heading}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  );
}
