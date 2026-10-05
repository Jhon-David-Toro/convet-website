import Link from "next/link";

import styles from "../Breadcrumbs.module.scss";
import type { BreadcrumbEntryProps } from "../Breadcrumbs.types";

/**
 * The label of an item: plain text for the current page or an item without link, otherwise a link.
 *
 * @param props Props of the component, see {@link BreadcrumbEntryProps}.
 * @param props.item Item to render.
 * @param props.current Whether the item is the current page (the last one).
 * @returns The rendered element.
 */
export function BreadcrumbLabel({ item, current }: BreadcrumbEntryProps) {
  if (current || !item.href) {
    return (
      <span className={styles.current} aria-current={current ? "page" : undefined}>
        {item.label}
      </span>
    );
  }

  return (
    <Link href={item.href} className={styles.link}>
      {item.label}
    </Link>
  );
}
