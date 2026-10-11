import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/shared/cx";

import { SERVICE_CARD_ICON_SIZE } from "./ServiceCard.constants";
import type { ServiceCardProps } from "./ServiceCard.types";
import { ServiceActions } from "./parts/ServiceActions";
import { ServiceMeta } from "./parts/ServiceMeta";
import styles from "./ServiceCard.module.scss";

/**
 * Card/Service: icon, title, description, duration / species and the details and booking actions.
 *
 * @param props Props of the component, see {@link ServiceCardProps}.
 * @param props.icon Icon component to draw.
 * @param props.title Title text.
 * @param props.description Description text under the title.
 * @param props.duration Duration, e.g. "15 min".
 * @param props.species Species, e.g. "Dogs · Cats".
 * @param props.detailsHref Link to the details page.
 * @param props.bookHref Link to the booking page.
 * @param props.detailsLabel Label of the details link.
 * @param props.bookLabel Label of the booking button.
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function ServiceCard({ icon, title, description, duration, species, detailsHref, bookHref, detailsLabel, bookLabel, className, ...rest }: ServiceCardProps) {
  return (
    <article {...rest} className={cx(styles.card, className)}>
      <span className={styles.iconWrap}>
        <Icon icon={icon} size={SERVICE_CARD_ICON_SIZE} tone="brand" />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ServiceMeta duration={duration} species={species} />
      <ServiceActions detailsHref={detailsHref} bookHref={bookHref} detailsLabel={detailsLabel} bookLabel={bookLabel} />
    </article>
  );
}
