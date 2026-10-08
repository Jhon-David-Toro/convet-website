import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/cx";

import styles from "./OptionCard.module.scss";
import { OPTION_CARD_ICON_SIZE } from "./OptionCard.constants";
import type { OptionCardProps } from "./OptionCard.types";
import { OptionText } from "./parts/OptionText";

/**
 * Booking/Option Card: option of a group (pet, service, vet). A native radio styled as a card.
 *
 * @param props Props of the component, see {@link OptionCardProps}.
 * @param props.icon Icon component to draw.
 * @param props.title Title text.
 * @param props.subtitle Secondary text under the title.
 * @param props.meta Trailing detail, e.g. "15 min".
 * @param props.className Extra class name for the root element.
 * @param props."data-state" Forces a visual state (hover, focus…) for documentation and screenshots.
 * @param props.inputProps Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function OptionCard({ icon, title, subtitle, meta, className, "data-state": dataState, ...inputProps }: OptionCardProps) {
  return (
    <label data-state={dataState} className={cx(styles.card, className)}>
      <input type="radio" {...inputProps} className={styles.input} />
      <span className={styles.visual}>
        <Icon icon={icon} size={OPTION_CARD_ICON_SIZE} tone="inherit" />
      </span>
      <OptionText title={title} subtitle={subtitle} />
      {meta && <span className={styles.meta}>{meta}</span>}
      <span className={styles.radio} aria-hidden="true" />
    </label>
  );
}
