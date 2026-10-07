import styles from "../Skeleton.module.scss";
import { Bone } from "./Bone";

/**
 * Placeholder of a card: thumbnail, title, two lines and two chips.
 *
 * @returns The rendered element.
 */
export function SkeletonCard() {
  return (
    <>
      <Bone shape={styles.thumbnail} />
      <Bone shape={styles.title} />
      <Bone shape={styles.lineLong} />
      <Bone shape={styles.lineMedium} />
      <span className={styles.chips}>
        <Bone shape={styles.chip} />
        <Bone shape={styles.chip} />
      </span>
    </>
  );
}
