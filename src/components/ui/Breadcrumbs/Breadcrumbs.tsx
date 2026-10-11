import { cx } from "@/lib/shared/cx";

import type { BreadcrumbsProps } from "./Breadcrumbs.types";
import { BreadcrumbEntry } from "./parts/BreadcrumbEntry";
import styles from "./Breadcrumbs.module.scss";

/**
 * Navigation/Breadcrumbs: path to the current page; the last item is the current page.
 *
 * @param props Props of the component, see {@link BreadcrumbsProps}.
 * @param props.items The last item is the current page (no link).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Breadcrumbs({ items, className, ...rest }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" {...rest} className={cx(styles.nav, className)}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <BreadcrumbEntry key={`${item.label}-${index}`} item={item} current={index === items.length - 1} />
        ))}
      </ol>
    </nav>
  );
}
