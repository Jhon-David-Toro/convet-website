import { cx } from "@/lib/shared/cx";

import type { BoneProps } from "../Skeleton.types";
import styles from "../Skeleton.module.scss";

/**
 * A single placeholder bar.
 *
 * @param props Props of the component, see {@link BoneProps}.
 * @param props.shape Stylesheet class that sizes and positions the bar.
 * @returns The rendered element.
 */
export function Bone({ shape }: BoneProps) {
  return <span className={cx(styles.bone, shape)} />;
}
