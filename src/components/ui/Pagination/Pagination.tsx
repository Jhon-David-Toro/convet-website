import { cx } from "@/lib/cx";

import styles from "./Pagination.module.scss";
import type { PaginationProps } from "./Pagination.types";
import { getPageRange } from "./Pagination.utils";
import { PageList } from "./parts/PageList";
import { PaginationStep } from "./parts/PaginationStep";
import { PaginationSummary } from "./parts/PaginationSummary";

/**
 * Data/Pagination: summary on the left and previous / next buttons around the numbered pages.
 *
 * @param props Props of the component, see {@link PaginationProps}.
 * @param props.page Current page (1-based).
 * @param props.pageCount Total number of pages.
 * @param props.total With `total`, shows "Showing 1–10 of 248".
 * @param props.pageSize Items per page.
 * @param props.hrefForPage Builds the link of a page; makes pages links instead of buttons.
 * @param props.onPageChange Called with the chosen page; makes pages buttons instead of links.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Pagination({ page, pageCount, total, pageSize, hrefForPage, onPageChange, className, ...rest }: PaginationProps) {
  const navigation = { hrefForPage, onPageChange } as Pick<PaginationProps, "hrefForPage" | "onPageChange">;
  const { first, last } = getPageRange({ page, pageSize, total });

  return (
    <nav aria-label="Pagination" {...rest} className={cx(styles.pagination, className)}>
      {total !== undefined && <PaginationSummary first={first} last={last} total={total} />}
      <div className={styles.pages}>
        <PaginationStep direction="previous" target={page - 1} disabled={page <= 1} {...navigation} />
        <PageList page={page} pageCount={pageCount} {...navigation} />
        <PaginationStep direction="next" target={page + 1} disabled={page >= pageCount} {...navigation} />
      </div>
    </nav>
  );
}
