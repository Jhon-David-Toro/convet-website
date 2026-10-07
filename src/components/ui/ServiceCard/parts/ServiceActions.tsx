import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";

import styles from "../ServiceCard.module.scss";
import type { ServiceActionsProps } from "../ServiceCard.types";

/**
 * "Details" link and "Book" button.
 *
 * @param props Props of the component, see {@link ServiceActionsProps}.
 * @param props.detailsHref Link to the details page.
 * @param props.bookHref Link to the booking page.
 * @param props.detailsLabel Label of the details link.
 * @param props.bookLabel Label of the booking button.
 * @returns The rendered element.
 */
export function ServiceActions({ detailsHref, bookHref, detailsLabel = "Details", bookLabel = "Book" }: ServiceActionsProps) {
  return (
    <div className={styles.footer}>
      <Button variant="tertiary" size="small" href={detailsHref} trailingIcon={ArrowRight}>
        {detailsLabel}
      </Button>
      <Button variant="accent" size="small" href={bookHref}>
        {bookLabel}
      </Button>
    </div>
  );
}
