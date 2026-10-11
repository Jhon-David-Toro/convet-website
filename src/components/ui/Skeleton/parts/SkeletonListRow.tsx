import { Bone } from "./Bone";
import styles from "../Skeleton.module.scss";

/**
 * Placeholder of a list row: avatar, two lines and a badge.
 *
 * @returns The rendered element.
 */
export function SkeletonListRow() {
  return (
    <>
      <Bone shape={styles.rowAvatar} />
      <span className={styles.lines}>
        <Bone shape={styles.rowTitle} />
        <Bone shape={styles.rowSubtitle} />
      </span>
      <Bone shape={styles.rowBadge} />
    </>
  );
}
