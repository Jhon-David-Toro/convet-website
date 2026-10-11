import Link from "next/link";

import { cx } from "@/lib/shared/cx";

import type { PageItemProps } from "./Pagination.types";
import styles from "./Pagination.module.scss";

/**
 * Data/Page Item: 40px circle; the current page is blue.
 *
 * @param props Props of the component, see {@link PageItemProps}.
 * @param props.page Current page (1-based).
 * @param props.current Currently selected value.
 * @param props.href With `href` it is a link; without it, a button.
 * @param props.onClick Called when the element is clicked.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function PageItem({ page, current = false, href, onClick, className, ...rest }: PageItemProps) {
  const common = {
    ...rest,
    className: cx(styles.page, current && styles.current, className),
    "aria-label": `Page ${page}`,
    "aria-current": current ? ("page" as const) : undefined,
  };

  return href !== undefined ? (
    <Link href={href} {...common}>
      {page}
    </Link>
  ) : (
    <button type="button" onClick={onClick} {...common}>
      {page}
    </button>
  );
}
