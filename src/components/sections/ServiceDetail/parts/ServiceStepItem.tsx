import type { ServiceStepItemProps } from "../ServiceDetail.types";
import styles from "../ServiceDetail.module.scss";

/**
 * One step of the visit: a numbered circle with the title and what happens.
 *
 * @param props Props of the component, see {@link ServiceStepItemProps}.
 * @param props.position Position of the step in the list, starting at 1.
 * @param props.step Step to show.
 * @returns The rendered element.
 */
export function ServiceStepItem({ position, step }: ServiceStepItemProps) {
  return (
    <li className={styles.step}>
      <span className={styles.number} aria-hidden="true">
        {position}
      </span>
      <div className={styles.stepText}>
        <p className={styles.stepTitle}>{step.title}</p>
        <p className={styles.stepDetail}>{step.detail}</p>
      </div>
    </li>
  );
}
