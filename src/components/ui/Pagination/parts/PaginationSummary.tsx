import styles from "../Pagination.module.scss";
import type { PaginationSummaryProps } from "../Pagination.types";

/**
 * "Showing 1–10 of 248".
 *
 * @param props Props of the component, see {@link PaginationSummaryProps}.
 * @param props.first Number of the first item of the page.
 * @param props.last Number of the last item of the page.
 * @param props.total Total number of items.
 * @returns The rendered element.
 */
export function PaginationSummary({ first, last, total }: PaginationSummaryProps) {
  return (
    <p className={styles.summary}>
      Showing {first}–{last} of {total}
    </p>
  );
}
