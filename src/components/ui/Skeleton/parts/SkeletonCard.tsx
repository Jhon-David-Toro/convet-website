import { Bone } from "./Bone";
import styles from "../Skeleton.module.scss";

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
