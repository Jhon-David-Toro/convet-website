import { cx } from "@/lib/shared/cx";

import styles from "./Skeleton.module.scss";
import { SkeletonCard } from "./parts/SkeletonCard";
import { SkeletonListRow } from "./parts/SkeletonListRow";
import { CARD_TYPE } from "./Skeleton.constants";
import type { SkeletonProps } from "./Skeleton.types";

/**
 * Loading placeholder. It is decorative: the loading container must announce
 * the state (for example with aria-busy).
 *
 * @param props Props of the component, see {@link SkeletonProps}.
 * @param props.type Variant of the element (button type or cell type).
 * @param props.className Extra class name for the root element.
 * @param props.rest Remaining properties, forwarded to the root element.
 * @returns The rendered element.
 */
export function Skeleton({ type, className, ...rest }: SkeletonProps) {
  const isCard = type === CARD_TYPE;

  return (
    <div {...rest} aria-hidden="true" className={cx(styles.skeleton, isCard ? styles.card : styles.listRow, className)}>
      {isCard ? <SkeletonCard /> : <SkeletonListRow />}
    </div>
  );
}
